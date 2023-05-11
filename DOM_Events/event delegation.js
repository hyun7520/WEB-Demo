const button = document.querySelector('button');
const form = document.querySelector('form');
const ul = document.querySelector('ul');
// const lis = document.querySelectorAll('li');

button.addEventListener('click', (e) => {
    e.preventDefault();
    const username = form.elements.username;
    const tweet = form.elements.tweet;
    addLi(username.value, tweet.value);
    username.value = '';
    tweet.value = ''
})

const addLi = (username, tweet) => {
    const newLi = document.createElement('li');
    ul.appendChild(newLi);
    newLi.innerText = `${username} - ${tweet}`
}

// for (let li of lis) {
//     li.addEventListener('click', () => {
//         li.remove();
//     })
//     // doesn't work on newly added list elements
//     // they were made after this
// }

// attach to parent

ul.addEventListener('click', (e) => {
    // console.log('click on ul');
    // console.log(e)
    // checking the console after clicking newly created li and already made li 
    // both have the same 'target: li'
    // so going for the target
    // e.target.remove();
    // will successfully delete newly and already made li elements
    e.target.nodeName === ' LI' && e.target.remove();
    // check is clicked is li to make it more accurate nad safer
    // without checking li -> any elements in the ul will also be deleted by clicking on it
})