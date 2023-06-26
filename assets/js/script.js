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
const MAX_MATCH = 8;
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