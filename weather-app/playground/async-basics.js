/*
EXAMPLE 1:
This is a very basic example of async code. The functions execute in order; however, since the setTimeout waits for 2 seconds the final function will execute.

This is also a very simple example of using callbacks to make your code async. The main issue with callbacks is when they are nested. It becomes very hard to write clean dry code, challenging to reason about, and extreamly hard to test.

Call Stack: Simple data structure that keeps track of events in a program. All you can do it add events to the top, and remove them from the top. It's like a can of pringles. 
*/
console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000)

setTimeout(() => {
    console.log('In the second timeout');
}, 0)

console.log('Finishing up');
