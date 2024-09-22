/*
Functional programming (FP) is a programming paradigm where programs are built by composing pure functions, 
avoiding shared state, and mutable data.

Pure Functions
A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect.


// Pure function
function add(a, b) {
  return a + b;
}

// Impure function (has a side effect of logging)
function addWithLogging(a, b) {
  console.log(a + b); // Side effect
  return a + b;
}

Benefits of pure functions:

	•	Easier to test and debug.
	•	Predictable behavior.
	•	More reusable.

// Immutability
Immutability means that once data is created, it cannot be changed. Instead of modifying data, 
functional programming creates new data from the original.



let numbers  = [1,2,3,4] 

let newNumbers = [...numbers, 5]
console.log(newNumbers) // [1,2,3,4,5]
// spread operator is used to create a new array with the elements of the existing array.




// Higher-Order Functions
A higher-order function is a function that takes a function as an argument or returns a function.

In JavaScript, functions are first-class citizens, meaning you can pass them as arguments to other functions, 
return them from functions, and assign them to variables.

// A function that takes a function as an argument
function multiplyByTwo(num) {
  return num * 2;
}

function map(arr, func) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(func(arr[i]));
  }
  return result;
}

const numbers = [1, 2, 3];
const doubled = map(numbers, multiplyByTwo); // [2, 4, 6]




// First-Class Functions
First-class functions are functions that can be assigned to variables, passed as arguments, and returned from other functions.
const sayHello = function() {
  console.log('Hello!');
};

function greet(func) {
  func(); // Call the function passed as an argument
}

greet(sayHello); // Output: Hello!


//Function Composition
Function composition is the process of combining two or more functions to produce a new function. 
Instead of calling functions in a nested way, you create a pipeline where the output of one function becomes the input of another.


const double = function(x){
    return x * 2;
}

const triple = function(x){
    return x * 3;
}

const ans = function(x){
    return double(triple(x));
}

console.log(ans(5)); // 30

const square = (x) => x * x;



// Declarative vs. Imperative Programming
In functional programming, we prefer declarative code over imperative code.


Imperative programming: You tell the computer how to do something step-by-step.
Declarative programming: You describe what you want to happen, and the underlying system figures out how to achieve that.

// Imperative approach (telling the computer how to iterate)
let numbers = [1, 2, 3];
let doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Declarative approach (telling the computer what you want to do)
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);



composing functions again 
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const doubleThenSquare = compose(square, double);

console.log(doubleThenSquare(3)); // Output: 36


Composing More Than Two Functions

function compose(...functions) {
  return function(x) {
    return functions.reduceRight((value, func) => func(value), x);
  };
}


This compose() function:

Accepts any number of functions (...functions is a rest parameter).
Uses reduceRight() to apply the functions from right to left 
while reduce() would apply them from left to right
(this is important because function composition works in the order of execution).

const add = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const composed = compose(square, double, add);

console.log(composed(2)); // Output: 36




function compose(...functions) {
    return function(x) {
      return functions.reduce((value, func) => func(value), x);
    };
}

const add = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const composed = compose(square, double, add);
console.log(composed(2)); // Output: 36


Composition vs. Chaining

Composition is often compared to method chaining, but they are slightly different:

Composition is about combining independent functions into a pipeline.
Chaining is typically used when working with object methods where each method returns the object itself.








// reduce is very imp here
const result = [1, 2, 3]
  .map(x => x * 2)
  .filter(x => x > 0)
  .reduce((acc, x) => acc + x, 2);

console.log(result); // Output: 10


Recursion over Loops
Avoiding Side Effects
Functional programming emphasizes avoiding side effects. A side effect occurs when a function modifies 
a state or interacts with the outside world (e.g., modifying a global variable, printing to the console, or modifying input arguments). 
Side effects make code less predictable and harder to debug.
let count = 0;

function incrementCount() {
  count += 1; // This is a side effect, modifying an external variable
}

incrementCount();
console.log(count); // Output: 1


Closures in Functional Programming
Closures are another powerful concept in JavaScript that align with FP principles. 
A closure is a function that "remembers" the variables from its outer scope, even after that outer scope has finished execution.


Functional programming in JavaScript allows you to write cleaner, more modular, and predictable code. 
By focusing on pure functions, immutability, and avoiding side effects, you can create applications 
that are easier to maintain, debug, and extend. Embracing these concepts can dramatically improve the quality 
and performance of your JavaScript code.



Closures in JavaScript (In-Depth)
A closure is one of the most important concepts in JavaScript and a key feature of the language. 
It allows functions to "remember" the environment in which they were created, even after that environment no longer exists. 
Closures are formed when a function retains access to variables from its lexical scope, even when the function is executed 
outside of that scope.

This is an advanced feature that underpins many powerful patterns in JavaScript, such as data hiding, function factories, and callbacks.

Closures give you access to an outer function’s scope from an inner function, even after the outer function has finished executing.
is is possible because functions in JavaScript form a lexical scope chain, meaning that the inner function "remembers" 
the environment in which it was created.



1. Data Privacy and Encapsulation
Closures are often used to create private variables in JavaScript. Since closures allow access to 
variables from an outer scope that can't be accessed from outside, you can use them to hide and protect data.

function counter() {
  let count = 0; // Private variable

  return function() {
    count += 1;
    return count;
  };
}

const increment = counter();
console.log(increment()); // Output: 1
console.log(increment()); // Output: 2
console.log(increment()); // Output: 3

Here, the count variable is private because it’s defined in the counter function’s scope. 
No code outside of the counter function can directly access count, but the closure allows the inner function 
to update and access count on subsequent calls.


2. Function Factories
function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier; // The multiplier is "captured" by the closure
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15

3. Maintaining State in Asynchronous Operations
function delayedGreeting(name) {
  setTimeout(function() {
    console.log('Hello, ' + name); // "name" is captured by the closure
  }, 1000);
}

delayedGreeting('Alice'); // Output after 1 second: 'Hello, Alice'

4.Emulating Private Methods in JavaScript Objects
JavaScript doesn’t have native support for private methods, but closures allow us to create methods that access private data.
function Person(name) {
  let privateName = name; // Private variable

  return {
    getName: function() {
      return privateName;
    },
    setName: function(newName) {
      privateName = newName;
    }
  };
}

const person = Person('Alice');
console.log(person.getName()); // Output: 'Alice'
person.setName('Bob');
console.log(person.getName()); // Output: 'Bob'


5.Iterating with Closures
When using closures inside loops, you need to be aware of the variable capture mechanism. Closures capture references to variables, not their values at the time of definition. 
This can lead to tricky bugs when working with loops.

for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// Output (after 1 second): 4, 4, 4
Fix with an IIFE (Immediately Invoked Function Expression):
for (var i = 1; i <= 3; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  })(i);
}

// Output: 1, 2, 3 (after 1 second)


Memory Management in Closures
Closures can sometimes lead to memory leaks if you’re not careful. Since a closure keeps references to variables in its scope, those variables are not garbage-collected until the closure is no longer in use.

For example:

If a closure references a large data structure (like a DOM element) and isn’t cleaned up properly, it can cause memory to be held longer than necessary.
Always be mindful of the scope you are capturing in a closure and make sure that closures are properly disposed of when they’re no longer needed.







let outerVariable  = "heya"
function outerFunction() {
    console.log(outerVariable)
    outerVariable = 'I am from outer scope';
  
    function innerFunction() {
      console.log(outerVariable);
      outerVariable = 'I am from inner scope';

      function innerInnerFunction(){
          console.log(outerVariable)

        
      }

      return innerInnerFunction;
      
    }
  
    return innerFunction();
  }
  
  const closureFunction = outerFunction();
  closureFunction(); // Output: 'I am from outer scope'
  


// Define the feed function with a default food property
function feed(animal, food) {
    if (food) {
        animal.eat(food); // If food is provided, use it
    } else {
        animal.eat(feed.defaultFood); // If no food is provided, use the default food
    }
}

// Assigning default food property to the feed function
feed.defaultFood = "Bread";

// Example animal object
const dog = {
    eat: function(food) {
        console.log(`The dog eats ${food}`);
    }
};

// Call the feed function with and without the food argument
feed(dog, "Meat");  // Output: The dog eats Meat
feed(dog);          // Output: The dog eats Bread

// Change the default food
feed.defaultFood = "Fish";

// Call the feed function again with the updated default food
feed(dog);          // Output: The dog eats Fish

*/