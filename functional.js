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


    
*/