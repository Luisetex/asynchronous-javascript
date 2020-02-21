# Asynchronous coding in JavaScript

## What is JavaScript

JavaScript is a single-threaded, non-blocking, asynchronous, concurrent language.

What the heck does that mean?

Single-threaded: there's only one thread running in JavaScript, so there's no way to perform operations running in parallel.

But if it is single-threaded, why is it non-blocking, asynchronous and concurrent? If it was really single-threaded, it would also be blocking, synchronous and of course it would never be able to run programs in parallel.

Let's dive into the insides of JavaScript!

## JavaScript Runtime: why is it single-threaded

The JavaScript Runtime is an engine which reads the code, interprets it and executes it. Where can we find it?

* **V8**: Created by Google for Google Chrome (and used in Node.js)
* **SpiderMonkey**: Developed by Mozilla for Firefox
* **JavaScriptCore**: Developed by Apple for Safari

And so on, and so forth...

![JavaScript scheme](map.png)

The JavaScript runtime is composed of two main parts:

* **Heap**: unstructured memory where allocation happens
* **Call Stack**: whenever you call a function, that call will be sent to this piece of structured memory and it will be checked one tick at a time.

Since JavaScript is single-threaded, it has a single Call Stack, which means that it can only do one thing at a time. This stack is also limited so the engine is also protected against failures in recursive calls.

Try to run `stack_01.js` here to check how the stack works.

## Why is JS non-blocking

There are certain functions or calls that can be slow. *REALLY* slow. Image processing is slow, network requests can be slow, etc. Since JavaScript was originally developed to be run in a browser, it would be a huge problem if the language was blocking.

As we already know, JS is single-threaded, i.e. it can only do one thing at a time. Therefore, if a call takes a lot of time to be processed, this means that the rest of the code execution will be blocked.

You can take a look at `blocking_01.js` and run it to see the effects of a synchronous call.

What's the solution to this problems? Well, that's **Asynchronous Callbacks**!

As a first example, take a look at the code in `async_callbacks._01.js`, guess what will happen and run it.

## Concurrency and the Event Loop

The browser is not only the runtime. It provides us with what is called the Web APIs (or C++ APIs in the case of Node.js). These are the set of tools that enable us to run programs concurrently in JavaScript. The Web APIs handle those operations that can take a long time apart from the main JS engine. These functions also take a very important parameter into account, the **callback** functions. These functions are executed when the main processing finishes working.

When they are done, the Web API sends that callback into what is called the **Callback Queue**. This queue is separated from the Call Stack and the callbacks in there will be, eventually, executed. But, when does that happen?

Browsers implement another mechanism to handle these problems: the **Event Loop**. This works in the following way:

* Whenever a Web API completes its operations, it sends the callback into the Event Loop.
* The Event Loop checks periodically whether the Call Stack is empty or not.
* If it is empty, it sends the callback into the Call Stack.
* The Call Stack resolves its operations normally.

Now we can explain how the code in `async_callbacks._01.js` actually works.

1. Puts the first console.log into the Call Stack.
2. Puts the setTimeout into the Call Stack.
3. Puts the second console.log into the Call Stack.
4. The Call Stack starts to perform every function.
5. The first console.log is resolved and then put out of the stack.
6. setTimeout is a Web API, so it is put out of the stack and it's resolved separately.
7. The second console.log is resolved.
8. After five seconds pass, the Web API puts the callback function into the callback queue.
9. The Event Loop checks whether the Call Stack is empty or not. Since it is empty, puts the callback into the Call Stack.
10. The Call Stack completes the execution of the callback function.

Now, you can check this functionality working with the asynchronous implementation of the `readFile` function in `async_callback_02.js`. If you look closely, you will see that the string `'Be careful for Sauron!` is printed before the Ring Verse.


### Callback Hell and Error Handling

Now we know how JavaScript can work with non-blocking, asynchronous code being single-threaded. But callbacks have some drawback attached to them.

If we want to work with functions that need callback and the call to other callbacks inside, we need to nest callbacks inside callbacks. We can take a look at `callbackhell_01.js`. This is a small toy example of what callback hell looks like. The code is harder to understand and messy.

Moreover, we are losing control of what happens to our operations. Instead of performing error handling on our code, we depend on our functions to that for us; i.e. we cannot wrap our code in try-catch blocks, we have to handle our errors directly inside those functions and return them, as we can see with the ``readFile`` method in `async_callback_02.js`.

There's another point that can be highlighted here. If you take a look at `async_callbacks_03.js`, you can see two callbacks there. Even though one of the timeouts is called before, it will be executed later, since the callback will placed on the event queue before the other.

Is there any way to avoid all this? Why, I'm glad you asked!

## Promises

Since the standard ES06, Promises were added to JavaScript. Promises are objects that represent the state of eventual completion or failure of an asynchronous operation. Let's say that you go to a Pizzeria an order a nice Hawaiian style pizza, with pineapples and everything. The person who attends you will give you a ticket after you order it and you will have to come back some time later to retrieve your pizza after it's cooked. That ticket represents the promise that you will get your pizza (or not, what if the oven breaks down?).

### Structure of a Promise

Promises are built by creating an object Promise and passing a function called an executor. This function takes two functions as parameters which are called `resolve` and `reject`. `resolve` is called when the operation is fulfilled and `reject` is called when an error arises. Creating a Promise object we can convert an old callback into a new promise.

As you may imagine, they work similar to plain "old-style" asyncrhonous functions, you need callbacks. But instead of passing them as functions, you attach them to your promise.

We can take a look at `promises_02.js` to see how to promisify an old function callback and how to work attaching new functions.

Thanks to the use of the keyword `.then()`, we can avoid callback hell by placing them neatly one after the other. If we want to catch any kind of error during our promise operation, now we can add a `.catch()` function to our promises that will catch any error, no matter when it arises.

### Promises in modern libraries

Chances are that you will not need to promisify any function, since most of modern APIs already work with that. Instead of working with old callbacks, most of the asynchronous functions now will return a promise object to work with. In the file `promises_03.js` you can find both a promisified function from the fs library and the version of the library that already returns a promise instead of working with function callbacks as parameters.

## Async/Await

We now know how to work with promises. The main idea: if our API can return a promise object, we just work with that object by attaching function to them inside the `.then()` method when the operation is fulfilled and we handle the failures using the `.catch()` method whenever the operation fails. The code is not as ugly as the callback hell that we had in the previous style without promises but it isn't still similar to what we are used to write in other programming languages and you could be struggling a bit to understand it.

Well, there's a solution for that too! With ES2017, a new way of working with asynchronous code was introduced so it looks similar to our traditional synchronous code that we all know and love. This is called **async/await**.

This feature is nothing more than syntactic sugar placed on top of promises to make our life easier. Remember that we are still working with promises.

If we want to use async/await with a promise returning function, we can do so using the `async` keyword before we define the function we are going to work with. Then, the `await` keyword makes the JavaScript engine to wait until the promise is resolved, either successfully or failing.

We can now use the classic `try/catch` block to handle all the possible errors that could arise.