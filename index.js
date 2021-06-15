const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callbackFunc) {
      const newCollection = collection instanceof Array ? collection.slice() : Object.values(collection)
      // you can't use typeof, that won't distinguish between an array and an object
      // set a new variable (newCollection) to either the separated collection if it's an array or the separated values of the collection if it's an object

      for (let i = 0; i < newCollection.length; i++)
        callbackFunc(newCollection[i])
      
      return collection
      // returns ORIGINAL collection, remember

    },

    map: function(collection, callbackFunc) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
      }
      // if the collection isn't an array already, turn it into one

      const newArray = []
      // does not modify the original array
      // it'd be pretty complicated to modify the original array anyway, you'd have to set each item in the array index to the new value
      // something like collection[i] = callbackFunc(collection[i]) ?
      // but only if you wanted to replace the entire original array

      for (let i = 0; i < collection.length; i++)
        newArray.push(callbackFunc(collection[i]))
      // iterate over the array and push each item, manipulated by the callback function, into the new array

      return newArray
    },

    reduce: function(array, callbackFunc, value) {
      let collection = array.slice(0)
      // take the first item out of the collection
      // use let because it needs to be changed? I guess?

      if (!value) {
        value = collection[0]
        collection = collection.slice(1)
      }

      for (let i = 0; i < collection.length; i++) {
        value = callbackFunc(value, collection[i], collection)
      }

      return value
    },

    find: function(collection, target) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
      }
      // see above: if the collection isn't an array, turn it into one

      for (let i = 0; i < collection.length; i++)
        if (target(collection[i])) {
          return collection[i]
        }

      return undefined
      // if it can't find the target, return undefined
      // keeping in mind target is Something === ??? so that's actually a function that defines what it's looking for?
      // that was wonky. target is a function something like const targetFunc = (seek) => { seek === 42 }
      // thereby looking for the integer 42. thus, if the targeting function returns true, you return the targeting function
      // otherwise return undefined
    },

    filter: function(collection, target) {
      if (!(collection instanceof Array)) {
        // eventually this is going to get memorized just like i = 0; i < length; i++
        collection = Object.values(collection)
      }

      const newArray = []

      for (let i = 0; i < collection.length; i++) // SEE???
        if (target(collection[i])) {
          newArray.push(collection[i])
          // sort of like above except in this case we're filtering, not finding the first match
          // so we push it to a new array instead
        }
      
      return newArray
    },

    size: function(collection) {
      return collection instanceof Array ? collection.length : Object.keys(collection).length 
      // easy one: ternary operator! if the collection is an array, return the length. if it's an object, return the length of the array resulting from the keys method
      // and yes you still have to use instanceof
      // I know you like typeof but no. 
    },

    first: function(collection, stopCondition) {
      // okay, you also want first N elements of a collection, so you can't just say collection[0]
      return stopCondition ? collection.slice(0, stopCondition) : collection[0]
      // if there is a stopCondition, return the collection cut from 0 (first) to stop condition, otherwise collection[0]
    },

    last: function(collection, startCondition) {
      return startCondition ? collection.slice(collection.length - startCondition, collection.length) : collection[collection.length - 1]
      // remember, slice must be called with the index from the beginning of the slice and the one AFTER the slice. 
      // So it's slice(firstSlice, lastSlice + 1)
    },

    compact: function(collection) {
      const doNotWant = new Set([false, null, 0, "", undefined, NaN])
      // hey double check your spelling maybe
      return collection.filter(i => !doNotWant.has(i))
    },

    sortBy: function(collection, callbackFunc) {
      const newArray = [...collection]
      // remember the three dots just shoves everything into an array without bothering with listing out everything in the array
      return newArray.sort(function (a, b) {
        return callbackFunc(a) - callbackFunc(b)
      })
      // basically it's a long way around sort
    },

    flatten: function(collection, shallow, array = []) {
    // flattens a nested array into a single array
    // "shallow" determines whether the array is flattened by one level, or by all levels
      if (!Array.isArray(collection)) {
        return array.push(collection)
      }
      if (shallow) {
        for (let value of collection) {
          Array.isArray(value) ? this.transfer(array, value) : array.push(value)
        }
      } else {
        for (let value of collection) {
          this.flatten(value, false, array)
        }
      }
      return array 
    },

    transfer: function(newArray, array) {
      for (let value of array)
        newArray.push(value)
    },

    uniq: function(collection, isSorted = false, callbackFunc) {
      if (isSorted) {
        return this.uniqSort(collection, callbackFunc)
      } else if (!callbackFunc) {
        return Array.from(new Set(collection))
      } else {
        const newValues = new Set ()
        const uniqValues = new Set ()
        for (let value of collection) {
          const newValue = callbackFunc(value)
          if (!newValues.has(newValue)) {
            newValues.add(newValue)
            uniqValues.add(value)
          }
        }
        return Array.from(uniqValues)
      }
    },

    uniqSort: function(collection, callbackFunc) {
      const sorted = [collection[0]]
      for (let i = 0; i < collection.length; i++) {
        if (sorted[i-1] !== collection[i]) {
          sorted.push(collection[i])
        }
      }
      return sorted
    },


    keys: function (collection) {
    // no not return collection.keys, of course it's not that simple
      const keys = []
      for (let key in collection) {
        keys.push(key)
        // basically iterate over the collection and push all the keys into a new array
        // only works for objects, obv
      }
      return keys
    },

    values: function(collection) {
      const values = []
      for (let key in collection) {
        values.push(collection[key])
      }
      return values
    },

    functions: function(object) {
    // JUST THE NAMES NOT THE WHOLE THING
      const functions = []

      for (let key in object) {
        if (typeof object[key] === "function") {
          functions.push(key)
        }
      }

      return functions.sort()
      // remember to sort it
    },
  }
})()

fi.libraryMethod()
