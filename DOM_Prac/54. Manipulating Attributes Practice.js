// Let's get some practice working with DOM element attributes. I've provided you with some very basic markup.  Please select the image element and:

// change its source to this url: https://devsprouthosting.com/images/chicken.jpg

// change its alt text to be "chicken"

// <!--DONT CHANGE ANYTHING IN THIS FILE, PLEASE!-->
// Egg and Chicken


// <h4>Which Came First?</h4>
// <img src="https://devsprouthosting.com/images/egg.jpg" width="200px">
// <!-- image source: unsplash.com -->

const img = document.querySelector('img');
img.src = 'https://devsprouthosting.com/images/chicken.jpg';
img.setAttribute('alt', 'chicken');