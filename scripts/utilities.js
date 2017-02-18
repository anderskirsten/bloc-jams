// this function should replace the for loop in the animatePoints function

function forEach() {
    // use a loop to go through all the elements in the pointsArray
    for (var i = 0; i < points.length; i++) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }

    // execute a callback for each element
    revealPoint(i);
}


// confirm that all selling-points are still animating properly
