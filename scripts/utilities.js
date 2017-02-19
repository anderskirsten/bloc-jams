function forEach(array, callback) {

    // use a loop to go through all the elements in the pointsArray
    for (var i = 0; i < array.length; i++) {

        // execute a callback function for each element
        callback(array[i]);
    }
}
