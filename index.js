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

    reduce: function(collection, callbackFunc) {

    },

    functions: function() {

    },


  }
})()

fi.libraryMethod()
