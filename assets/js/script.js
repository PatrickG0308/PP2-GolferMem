// retrieve start button from start page
const startBtn = document.getElementById("start-btn");

// retrieve start page element
const startPage = document.getElementById("start-page");

// retrieve gameboard element
const gameBoard = document.getElementById("gameboard");

// retrieve reset button element
const resetBtn = document.getElementById("reset-btn");

// retrieve memeory card element
const cards = document.querySelectorAll('.memory-card');

// retrieve moves(putts) 1st element
const moveContainer = document.querySelector(".moves");

// retrieve timer 1st element*/
const timeContainer = document.querySelector(".timer");

// retrieve max number of matches required
const MAX_MATCH = 6;
const modal = document.getElementById("modal");

// state of game
let gameOn = false;

// start of complete match scores
let perfectMatch = 0;

// manage flip state
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//store number of moves (putts)
let moves = 0;

//store elapse time from timer
let finalTime = "";

// hide game board behind start page
gameBoard.style.display = 'none';

// listen for click of start button on start page
// display game board 
startBtn.addEventListener('click', () => {
    startPage.style.display = 'none';
    gameBoard.style.display = 'block';
    startGame();
});

// Using cards const listen for click
cards.forEach(card => card.addEventListener('click', startGame));
shuffle();

/**
* startGame function
*/

function startGame() {
    if (!gameOn) {
        gameOn = true;
        timer();
    }
    // prevent more than 2 cards from flipping at the same time
    if (lockBoard) return;
    // check if current clicked card is equal to first card
    if (this === firstCard) return;
    // this refers to respective div.card element
    // append class of "flip" to all items of cards array
    this.classList.add('flip');
    // The first card clicked
    if (!flippedCard) {
        flippedCard = true;
        //stores this as first card
        firstCard = this;
    } else {
        //second card clicked
        secondCard = this;
        // call the checkCardMatch function     
        checkCardMatch();
    }
}

/**
checking if firstCard & secondCard 'data-id' 
in this case data-image id are a match
*/

function checkCardMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) perfectMatch += 1;
    //if match call pairMatch function
    if (isMatch) pairMatch();
    //if no match call noMatch function
    else noMatch();
    //if this match equal MAX_MATCH value call winGame function
    if (perfectMatch === MAX_MATCH) completeGame();
}

/**
 * cards that are matched will have 'click' listener disabled
 * preventing cards from unflipping
 */

function pairMatch() {

    firstCard.removeEventListener('click', startGame);
    secondCard.removeEventListener('click', startGame);
    resetBoard();
}

/**
 *  if no match, unflip cards after 1 sec
 */

function noMatch() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);

    // call addMove function to add to moves counter 
    addMove();
}

//Move counter
moves = 0;
moveContainer.innerHtml = 0;

/**
 * add one to move counter if no match
 */

function addMove() {
    moves++;
    moveContainer.innerHTML = moves;
}

// declared timer variables
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

// display "Time" with value 0 for minutes : 0 for seconds
timeContainer.innerHTML = "Time " + minutes + " : " + seconds;

/**
 * add one to the seconds until it is equal to 59
 * then add one to the minutes. display format 0:00
 */

function timer() {
    time = setInterval(function () {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        timeContainer.innerHTML = "Time " + minutes + " : " + seconds;
    }, 1000);
}

/**
 * clears timer set with the setInterval() method.
 */

function stopTime() {
    clearInterval(time);
}

/**
 * unlock board, unflip cards
 */

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/**
 * game complete show time and finish message
 */

function completeGame() {
    stopTime();
    showFinishMessage();
}

/**
 * message displayed on game completion showing
 * time taken and number of moves
 */

function showFinishMessage() {
    modal.style.display = "block";
    finalTime = timeContainer.innerHTML;
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
    reset();
}

// when the user clicks the (x) modal is closed

window.onclick = function (event) {
    if (event.target.id == 'close') {
        document.getElementById('modal').style.display = "none";
    }
};

/**
 * shuffle cards after completion
 */

function shuffle() {
    cards.forEach(cards => {
        let randomPosition = Math.floor(Math.random() * 16);
        cards.style.order = randomPosition;
    });

}

// Listen for click on Game reset button call reset function

resetBtn.addEventListener('click', reset);

/**
 * resets all counters removes flips and shuffles
 * cards ready for new game
 */

function reset() {
    setTimeout(() => {
        flippedCard = false;
        [firstCard, secondCard] = [null, null];
        stopTime();
        gameOn = false;
        timeStart = false;
        seconds = 0;
        minutes = 0;
        timeContainer.innerHTML = "Timer 0:00";
        moves = 0;
        moveContainer.innerHTML = 0;
        perfectMatch = 0;
        cards.forEach(cardReset => cardReset.classList.remove('flip'));
        shuffle();
        cards.forEach(card => card.addEventListener('click', startGame));
    }, 500);
}
