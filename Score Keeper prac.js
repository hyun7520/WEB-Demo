const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

function updateScores(player, opponent) {
    // more than 2 player : list opponents as rest of the players
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

// const p1Button = document.querySelector('#p1Button');
// const p2Button = document.querySelector('#p2Button');
// const p1Display = document.querySelector('#p1Display');
// const p2Display = document.querySelector('#p2Display');
const resetButton = document.querySelector('#reset');
const playTo = document.querySelector('#playto');

let winningScore = parseInt(playTo.value);
// let p1Score = 0;
// let p2Score = 0;
let isGameOver = false;

p1.button.addEventListener('click', () => {
    updateScores(p1, p2);
})

p2.button.addEventListener('click', () => {
    updateScores(p2, p1);
})

playTo.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})
// arrow function 사용 시 오류 원인 확인하기

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove(('has-text-danger', 'has-text-success'));
        p.button.disabled = false;
    }
    // p1.score = 0;
    // p2.score = 0;
    // p1.display.textContent = 0;
    // p2.display.textContent = 0;
    // p1.button.disabled = false;
    // p2.button.disabled = false;
    // p1.display.classList.remove('has-text-danger', 'has-text-success');
    // p2.display.classList.remove('has-text-danger', 'has-text-success');
}