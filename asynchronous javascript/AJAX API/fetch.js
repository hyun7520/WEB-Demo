fetch("https://swapi.dev/api/people/1")
    // returns promise
    .then((res) => {
        console.log("resloved", res);
        return res.json();
        // res.json().then(data => {
        //     console.log("JSON Done", data);
        // })
    })
    .then((data) => {
        console.log("JSON Done", data)
        return fetch("https://swapi.dev/api/people/2")
    })
    .then((res) => {
        console.log("Second Request");
        return res.json();
    })
    .then
    .catch((e) => {
        console.log("Error", e);
    })

const loadStarWarsPeople = async () => {
    try {
        const res = fetch("https://swapi.dev/api/people/1");
        const data = await res.json;
        console.log(data);
        const res2 = fetch("https://swapi.dev/api/people/2");
        const data2 = await res2.json;
        console.log(data2);
    } catch (e) {
        console.log('Error', e)
    }

}

loadStarWarsPeople();