/*

deep copy vs shallow copy 

In JavaScript, copying objects can be tricky because objects are reference types. 
When you copy an object, you're often copying the reference to that object, not the actual object itself. 
Understanding the difference between shallow copy and deep copy is crucial when working with objects, 
especially when they have nested structures.

const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: 10001
  }
};

// Create a shallow copy using Object.assign
const shallowCopy = Object.assign({}, original);

// Modify the copy
shallowCopy.name = 'Doe';
shallowCopy.address.city = 'San Francisco';

console.log(original.name); // Output: 'John' (Not affected)
console.log(original.address.city); // Output: 'San Francisco' (Affected)

other way 
const shallowCopyc = { ...original };

Array’s slice() method (for shallow copying arrays)
const array = [1, 2, 3];
const shallowArrayCopy = array.slice();


A deep copy duplicates every level of the object. This means that even nested objects or arrays are copied entirely, 
not just the reference. After making a deep copy, 
the copied object is completely independent of the original.

One way to create a deep copy is by using JSON.stringify() and JSON.parse(), but this approach has limitations 
(it won’t work with functions, undefined, Symbol, or circular references).

const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: 10001
  }
};

// Create a deep copy using JSON methods
const deepCopy = JSON.parse(JSON.stringify(original));

// Modify the copy
deepCopy.name = 'Doe';
deepCopy.address.city = 'San Francisco';

console.log(original.name); // Output: 'John' (Not affected)
console.log(original.address.city); // Output: 'New York' (Not affected)



For more complex objects that contain non-serializable types like functions or circular references, 
you would need to write your own deep copy function or use a library like Lodash.




*/

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj; // Return the value if obj is not an object
    }
    
    // Create an array or object to hold the values
    let copy = Array.isArray(obj) ? [] : {};
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Recursively copy for nested objects
        copy[key] = deepCopy(obj[key]);
      }
    }
    
    return copy;
  }

  const original = {
    name: 'John',
    age: 30,
    address: {
      city: 'New York',
      zip: 10001
    }
  };
deepCopy(original);  
console.log(deepCopy(original)); // Output: { name: 'John', age: 30, address: { city: 'New York', zip: 10001 } }
