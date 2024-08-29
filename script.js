const choicesButtons = document.querySelectorAll('button.choice');
const choicesResult = document.querySelector('.choices-result');
const winner = document.querySelector('.winner');
const score = document.querySelector('.score');
const resetButton = document.querySelector('button.reset-score');
const autoplayButton = document.querySelector('button.auto-play');

let choicesArray = [];
choicesButtons.forEach(btn => choicesArray.push(btn.dataset.choice));

let scoreObject = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    draws : 0,
    losses : 0
}

updateLocalStorage(scoreObject);
displayScore();

choicesButtons.forEach(btn => {
    btn.addEventListener('click', () => playGame(btn.dataset.choice));
});

resetButton.addEventListener('click', resetScore);

let autoplayActivated = false;
let autoplayGame;

autoplayButton.addEventListener('click', () => {
    
    autoplayActivated = !autoplayActivated;
    
    if (autoplayActivated === true) {
        autoplayGame = setInterval(() => {
            const autoplayChoice = pickRandomChoice();
            playGame(autoplayChoice);
        }, 2000);
    } else {
        clearInterval(autoplayGame);
    }
});

function playGame(choice) {

    const playerChoice = choice;
    const computerChoice = pickRandomChoice();

    displayChoices(playerChoice, computerChoice);

    if (playerChoice === 'rock' && computerChoice === 'scissors' 
        || playerChoice === 'paper' && computerChoice === 'rock'
        || playerChoice === 'scissors' && computerChoice === 'paper') {

        youWin();
    } 
    
    else if (computerChoice === 'rock' && playerChoice === 'scissors' 
        || computerChoice === 'paper' && playerChoice === 'rock'
        || computerChoice === 'scissors' && playerChoice === 'paper') {
        youLose();
    } 
    
    else draw();
}

function pickRandomChoice() {
    const move = choicesArray[Math.floor(Math.random() * choicesArray.length)];
    return move;
}

function displayChoices(playerChoice, computerChoice) {
    choicesResult.innerHTML = `You  <img src="images/${playerChoice}-emoji.png" class="small"> <img src="images/${computerChoice}-emoji.png" class="small"> Computer`;
}

function displayScore() {
    let scoreHtml = ''
    for (let i in scoreObject) {
        scoreHtml += `<p>${i} : ${scoreObject[i]}</p>`;
    }
    score.innerHTML = scoreHtml;
}

function youWin() {
    scoreObject.wins++;
    winner.innerHTML = 'You win.'
    updateLocalStorage(scoreObject);
    displayScore();
}

function youLose() {
    scoreObject.losses++;
    winner.innerHTML = 'You lose.'
    updateLocalStorage(scoreObject);
    displayScore();
}

function draw() {
    scoreObject.draws++;
    winner.innerHTML = 'Draw.'
    updateLocalStorage(scoreObject);
    displayScore();
}

function updateLocalStorage(scoreObject) {
    localStorage.setItem('score', JSON.stringify(scoreObject));
}

function resetScore() {
    for (let i in scoreObject) {
        scoreObject[i] = 0;
        updateLocalStorage(scoreObject);
        displayScore();
    }
}

let test = false;
console.log(test);
test = !test;
console.log(test);