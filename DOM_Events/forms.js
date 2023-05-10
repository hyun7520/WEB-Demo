const comment = document.querySelector('#comment');
const tweetContainer = document.querySelector('#tweets');
comment.addEventListener('submit', (e) => {

    e.preventDefault();
    // prevent default behaviour : won't move to new page
    // needs to be at top

    // const usernameInput = document.querySelectorAll('input')[0];
    // const tweetInput = document.querySelectorAll('input')[1];
    const usernameInput = comment.elements.username;
    const tweetInput = comment.elements.comment;
    addTweet(usernameInput.value, tweetInput.value);

    usernameInput.value = '';
    tweetInput.value = ''

    // console.log(newTweet);
})

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    // <b></b>
    bTag.append(username);
    // <b>username</b>
    newTweet.append(bTag);
    // <li><b>username<b></li>
    newTweet.append(`- ${tweet}`);
    // <li><b>username<b> - tweet</li>

    tweetContainer.append(newTweet);
}