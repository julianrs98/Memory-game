//game settings
const themeButtons = document.querySelector('.container--settings-content-holder').querySelectorAll('.settings-row:nth-child(1) button');
const numberOfPlayersButtons = document.querySelector('.container--settings-content-holder').querySelectorAll('.settings-row:nth-child(2) button');
const gridButtons = document.querySelector('.container--settings-content-holder').querySelectorAll('.settings-row:nth-child(3) button');
const gameStartButton = document.querySelector('#settings--start-button');

let IconNamesPlayThemeArr = ["fa fafa-user", "fa-solid fa-bomb", "fa-solid fa-bath", "fa-solid fa-book-journal-whills", "fa-solid fa-broom-ball", "fa-solid fa-ghost", "fa-solid fa-motorcycle", "fa-solid fa-user-astronaut"];
let gameNumberPlayThemeArr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

let gamePlayThemeArr = [];
function themeSelect(event) {
    themeButtons[0].classList.toggle('selected--option');
    themeButtons[1].classList.toggle('selected--option');
};

// toggling between button and adding class

themeButtons.forEach(button=>{
    button.addEventListener('click', themeSelect);
});



let numberOfPlayers = 0;
function numberOfPlayersSelect (event) {
    numberOfPlayersButtons.forEach(button=>{
        button.classList.remove('selected--option');
    });
    event.target.classList.add('selected--option');
    numberOfPlayers = Array.from(numberOfPlayersButtons).find(button=>button.classList.contains('selected--option'));
    numberOfPlayers = numberOfPlayers.innerHTML;
    numberOfPlayers = parseInt(numberOfPlayers);
}

//selecting numberofplayers

numberOfPlayersButtons.forEach(button=>{
    button.addEventListener('click', numberOfPlayersSelect);
});




function setGridSize(event) {
    gridButtons[0].classList.toggle('selected--option');
    gridButtons[1].classList.toggle('selected--option');
}

//selecting grid size

gridButtons.forEach(button=>{
    button.addEventListener('click', setGridSize);
});

const gameContainer = document.querySelector('.game--container')

function getAllSelectedSettings(arr) {
    if (themeButtons[0].classList.contains('selected--option')) {
        gamePlayThemeArr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    } else {
        gamePlayThemeArr = ["fa-user", "fa-bomb", "fa-bath", "fa-book-journal-whills", "fa-broom-ball", "fa-ghost", "fa-motorcycle","fa-user-astronaut", "fa-user", "fa-bomb", "fa-bath", "fa-book-journal-whills", "fa-broom-ball", "fa-ghost", "fa-motorcycle","fa-user-astronaut", "fa-umbrella-beach", "fa-hand-spock", "fa-whiskey-glass", "fa-record-vinyl",  "fa-socks",  "fa-user-secret", "fa-floppy-disk",  "fa-guitar",  "fa-dragon", "fa-skull-crossbones", "fa-umbrella-beach", "fa-hand-spock", "fa-whiskey-glass", "fa-record-vinyl",  "fa-socks",  "fa-user-secret", "fa-floppy-disk",  "fa-guitar",  "fa-dragon", "fa-skull-crossbones"];
    }
    if (gridButtons[0].classList.contains('selected--option')) {
        gamePlayThemeArr.length = 16;
    } else {
        gamePlayThemeArr.length = 36;
    }
    if (numberOfPlayersButtons[0].classList.contains('selected--option')) {
        numberOfPlayers = 1;
    }
    randomizeNumbers(gamePlayThemeArr);
    modeDependsOfNumberPlayers(numberOfPlayers);
    gameContainer.style.display = 'block';
    setupSection.style.display = 'none';
}

// collecting all option depends on buttons class selected-option


function modeDependsOfNumberPlayers(number) {
    if (numberOfPlayers == 1) {
        singlePlayerMode();
    } else {
        multiPlayerBar.style.display = 'flex';
        displayBlockPlayersBoxes(number)
    }
}

let playerBoxes = document.querySelectorAll('.player--box');
let playersBoxesArr = [];

function displayBlockPlayersBoxes(number) {
    for (i=0; i<number; i++) {
        playerBoxes[i].style.display = 'block';
    }
}



let singlePlayerBar = document.querySelector('.bottom--bar--singleplayer')
let multiPlayerBar = document.querySelector('.bottom--bar-multiplayer');
let stoper = document.getElementById('stoper');
let movesCounterSinglePlayer = document.getElementById('singleplayer--moves--counter');

let secondsCounterFn = 0;
let secondsCounter = 0;
function singlePlayerMode() {
    singlePlayerBar.style.display = 'flex';
    secondsCounterFn = setInterval(()=>{
        secondsCounter += 1;
        stoper.innerHTML = secondsCounter;
    },1000)
}


let randomizeNumbers = randomizeArr => {
    randomizeArr.sort((a, b) => 0.5 - Math.random());
    generatingPlanche(randomizeArr);
}

gameStartButton.addEventListener('click', getAllSelectedSettings);

const circleUknown = document.querySelectorAll('.circle h1');
const circles = document.querySelectorAll('.circle');
const plancheFourXFour = document.querySelector('.planche4x4')
const plancheSixXSix = document.querySelector('.planche6x6')


function generatingPlanche(elementsArr) {
    if (elementsArr.length == 16) {
        plancheFourXFour.style.display = 'block';
        settingSymbolsOnCircles(plancheFourXFour, elementsArr);
    } else {
        plancheSixXSix.style.display = 'block';
        settingSymbolsOnCircles(plancheSixXSix, elementsArr);
    }
}

let arrOfGameSymbols = [];
function settingSymbolsOnCircles(planche, arr) {
    let emptySymbols = planche.querySelectorAll('.row .col .circle h1');
    if (typeof(arr[0]) == 'string') {
        for (i=0; i<arr.length; i++) {
            emptySymbols[i].classList.add('fa-solid', arr[i]);
        }
    } else {
        for (i=0; i<arr.length; i++) {
            emptySymbols[i].innerHTML = arr[i];
        }
    }
    arrOfGameSymbols = arr;
}



let movesCounter = 0;
let circleUnveiled = [];

function selectingCircles(event) {
    movesCounter = movesCounter+1;
    movesCounterSinglePlayer.innerHTML = movesCounter; // single player moves counter
    let choosedCircle = event.currentTarget;
    choosedCircle.classList.add('active');
    circleUnveiled.push(choosedCircle, choosedCircle.innerHTML);
    compareCircles(circleUnveiled);
    return movesCounter;
}

let multiPlayerBoxes = document.querySelectorAll('.bottom--bar-multiplayer div');
let multiPlayerPoints = document.querySelectorAll('.bottom--bar-multiplayer h1 + h1');
let pointsNumbers = document.querySelector('.bottom--bar-multiplayer').querySelectorAll('div h1+h1');
let finalResultsArr = [];


let modifiedArr = Array.from(pointsNumbers).map(function(element){
    return element.innerHTML;
});



let playerNumber = 0;
let pointsCounter = 0;
let pointsSum = 0;
let currentSumPoints = [];



function compareCircles(arr) {
   if (arr.length >= 4) {
       if (arr[1] == arr[3]) {
           arr[0].classList.add('active-hitten');
           arr[2].classList.add('active-hitten');
           currentSumPoints = Array.from(pointsNumbers).map(elem=>{
            return parseInt(elem.innerHTML);
            });
            pointsCounter = 0;
            pointsCounter += 1;
           multiPlayerPoints[playerNumber].innerHTML = currentSumPoints[playerNumber] + pointsCounter;
           circleUnveiled = [];
           pointsSum = pointsSum + 1;
           if (pointsSum == arrOfGameSymbols.length/2) {
            gameEnd(finalArrPoints);
           }
        } else {
           circleUnveiled = [];
           pointsCounter = 0;
           setTimeout(()=>{
            arr[0].classList.remove('active');
            arr[2].classList.remove('active');
            changePlayerTurn();
           },2000)
       }
       circles.forEach(elem=>{
           if (elem.classList.contains('active-hitten')) {
               elem.classList.remove('active');
               elem.classList.replace('active-hitten', 'guessed');
           }
       })
   }
};

function changePlayerTurn() {
    playerNumber = playerNumber + 1;
    if (playerNumber >= numberOfPlayers) {
        playerNumber = 0
    }
    multiPlayerBoxes.forEach(elem=>{
        elem.style.background = '#F2F2F2';
    })
    multiPlayerBoxes[playerNumber].style.background = '#FDA214';
}


let setupSection = document.querySelector('.setup');
let resultsMultipLayerContainer = document.querySelector('.container--results-multiplayer');
let finalArrPoints = [];
let sortedArrResults = [];

function gameEnd(arr) {
    if (numberOfPlayers == 1) {
        generateResultsSinglePlayer();
    } else {
        let finalArrPoints = Array.from(pointsNumbers).map(elem=>{
            return  parseInt(elem.innerHTML);
        });
        let playerFinalArr = [[finalArrPoints[0], 'Player 1'], [finalArrPoints[1], 'Player 2'], [finalArrPoints[2], 'Player 3'], [finalArrPoints[3], 'Player 4']];
        sortedArrResults = playerFinalArr.sort((a,b)=>{
            return b[0]-a[0];
        });
        sortedArrResults.length = numberOfPlayers;
        generateResultsMultiplayer(sortedArrResults);
    }
}


const timeResultSpan = document.getElementById('time');
const movesResultSpan = document.getElementById('moves');
const singlePlayerContainerResults = document.querySelector('.container--results-singleplayer');


function generateResultsSinglePlayer() {
    clearInterval(secondsCounterFn);
    gameContainer.classList.add('hide-behind');
    singlePlayerContainerResults.classList.add('show-ontop');
    timeResultSpan.innerHTML = secondsCounter;
    movesResultSpan.innerHTML = movesCounter;
}


const playerNumberTable = document.querySelectorAll('.container--results-multiplayer .results--box > div h1:first-child');
const winnerHeader = document.querySelector('.results .results--text span');
const pairsPoints = document.querySelectorAll('.container--results-multiplayer > div h1:last-child span')
const resultsBoxes = document.querySelectorAll('.container--results-multiplayer .results--box');
console.log(playerNumberTable)


const winners = [];
function generateResultsMultiplayer(arr) {
    for (i=0; i<arr.length; i++) {
        resultsBoxes[i].style.display = 'flex';
        playerNumberTable[i].innerHTML = arr[i][1];
        pairsPoints[i].innerHTML = arr[i][0] + ' pairs';
        }
    if (arr[0][0] == arr[1][0]) {
        for (let i=0; i<arr.length; i++) {
            if (arr[0][0] == arr[i][0]) {
                winners.push(arr[i]);
            }
        }
        console.log(playerNumberTable[i])
        for (i=0; i<winners.length; i++) {
            resultsBoxes[i].style.background = '#304859';
            pairsPoints[i].style.color = 'white';
            playerNumberTable[i].style.color = 'white';
            }
    winnerHeader.innerHTML = 'It’s a tie!';
    } else {
    winnerHeader.innerHTML = arr[0][1] + ' Wins!';
    }
    resultsMultipLayerContainer.classList.add('show-ontop');
    gameContainer.classList.add('hide-behind');
}




circles.forEach(elem=>{
    elem.addEventListener('click', selectingCircles);
});



function restartGame() {
    if (resultsMultipLayerContainer.classList.contains('show-ontop') || singlePlayerContainerResults.classList.contains('show-ontop')) {
        gameContainer.classList.remove('hide-behind');
        resultsMultipLayerContainer.classList.remove('show-ontop');
        singlePlayerContainerResults.classList.remove('show-ontop');
    }
    circleUknown.forEach(symbol=>{
        symbol.className = '';
    });
    circles.forEach(circle=>{
        circle.classList.remove('active','guessed')
    })
    clearInterval(secondsCounterFn);
    pointsSum = 0;
    movesCounter = 0;
    playerNumber = 0;
    movesCounterSinglePlayer.innerHTML = pointsSum;
    secondsCounter = 0-1;
    multiPlayerPoints.forEach(numberOfPoints=>{
        numberOfPoints.innerHTML = '0'
    });
    gamePlayThemeArr = [];
    multiPlayerBoxes[0].style.background = '#FDA214';
    for (i=1; i<multiPlayerBoxes.length; i++) {
        multiPlayerBoxes[i].style.background = '#F2F2F2';
    }
    getAllSelectedSettings()
}


const restartButtons = document.querySelectorAll('.restart--button');
restartButtons.forEach(button=>{
button.addEventListener('click', restartGame);
})



const newGameButtons = document.getElementsByClassName('newgame--button');

function newGameSetUp() {
    document.location.reload(true);
}

Array.from(newGameButtons).forEach(button=>{
    button.addEventListener('click', newGameSetUp);
})