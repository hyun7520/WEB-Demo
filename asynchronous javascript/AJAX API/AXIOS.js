// axios.get("https://swapi.dev/api/people/1")
//     .then(res => {
//         console.log("RESPONSE:", res)
//     })
//     // auto parse data
//     // no .json() prgress in fetch
//     .catch((e) => {
//         console.log("ERROR", e);
//     })

const getSWP = async (id/* can add parameter*/) => {
    try {
        const res = await axios.get(`https://swapi.dev/api/people/${id}`);
        console.log(res.data);
    }
    catch (e) {
        console.log("ERROR", e);
    }
}

const jokes = document.querySelector('#jokes')
const button = document.querySelector('button')

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    const newLi = document.createElement('li');
    newLi.append(jokeText);
    jokes.append(newLi);
}
const getDadJoke = async () => {
    try {
        const headers = { headers: { Accept: 'application/json' } }
        const res = await axios.get('https://icanhazdadjoke.com/', headers);
        return res.data.joke;
    }
    catch (e) {
        return "No Jokes"
    }

}

button.addEventListener('click', addNewJoke);
// this site returns html, only want jason
// need to read the docs of the sites