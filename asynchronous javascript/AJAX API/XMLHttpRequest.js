// Original, Old way of sending requests via JAVA
// Not Important

const req = new XMLHttpRequest();

req.onload = function () {
    // runs when no error
    console.log("Loaded");
    console.log(this.responseText);
    // returns TEXT response: One Big String needs conversion
    const data = JSON.parse(this.responseText);
    console.log(data);
    console.log(data.name, ' ', data.height)
}
req.onerror = function () {
    // runs when error
    console.log("ERROR");
    console.log(this);
}

req.open("GET", "https://swapi.dev/api/people/1")
req.send();

// too dirty
// using fetch to solve