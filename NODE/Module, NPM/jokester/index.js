const jokes = require("give-me-a-joke");
const colors = require("colors");
// show methods

jokes.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
});