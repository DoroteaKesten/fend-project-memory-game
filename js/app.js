/*
 * Create a list that holds all of your cards
 */

let cardsList = ["fa fa-diamond", "fa fa-diamond",
                 "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                 "fa fa-anchor", "fa fa-anchor",
                 "fa fa-bolt", "fa fa-bolt",
                 "fa fa-cube", "fa fa-cube",
                 "fa fa-leaf", "fa fa-leaf",
                 "fa fa-bicycle", "fa fa-bicycle",
                 "fa fa-bomb", "fa fa-bomb"]

const deck = document.querySelector(".deck");

const moves = document.querySelector(".moves");

const timer = document.querySelector("#timer");

const congratsWindow = document.querySelector(".modal");

const restartButton = document.querySelector(".restart");

// Define variables where shown or matched cards will be stored

let shownCards,
    matchedCards,
    count,
    seconds,
    firstClick,
    howManyStars;

const thirdStar = document.querySelector("i.third");
const secondStar = document.querySelector("i.second");

let startTimer;

function countSeconds() {
    seconds ++;
    timer.innerHTML = seconds;
};

function stopTimer() {
    clearInterval(startTimer);
};


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Initialize the game
restart();

function cardsDisplay() {

    //Clean the HTML cards
    deck.innerHTML = "";

    shuffle(cardsList);

    //loop through an array of cardsList and create HTML cards
    cardsList.forEach(function(item) {
        const card = document.createElement("li");
        card.className = "card";
        const icon = document.createElement("i");
        icon.className = item;
        click(card);
        card.appendChild(icon);
        deck.appendChild(card);
    });

};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Add event listener to a card
function click(card) {
    card.addEventListener("click", function showCard() {
        // Start timer on the first click
        if(firstClick) {
            firstClick = false;
            startTimer = setInterval (countSeconds, 1000);
        };
        // Open the clicked card
        if (shownCards.length < 2) {
            card.classList.add("open", "show");
            shownCards.push(card);
        };
        // See if opened cards match
        setTimeout(function match() {
            if (shownCards.length === 2) {
                if (shownCards[0].innerHTML === shownCards[1].innerHTML) {
                    shownCards.forEach(function(card) {
                        card.classList.add("match");
                        matchedCards.push(card);
                        endGame();
                });
            } else {
                shownCards.forEach(function(card) {
                    card.classList.remove("open", "show");
                });
            };
            shownCards = [];
            movesCount();
            };
        }, 1500);
    });
};


function endGame() {
    if (matchedCards.length === cardsList.length) {
        stopTimer();
        openCongratsWindow();
    };
};

function movesCount() {
    count++;
    moves.innerHTML = count;
    stars();
};

// Keep score based on the number of moves
function stars() {
    if (count === 10) {
        thirdStar.classList.replace("fa-star", "fa-star-o");
        howManyStars--;
    };
    if (count === 16) {
        secondStar.classList.replace("fa-star", "fa-star-o");
        howManyStars--;
    };
};

function openCongratsWindow() {
    const playButton = congratsWindow.querySelector("button");
    playButton.addEventListener("click", function() {
        congratsWindow.style.display = "none";
        restart();
    });
    congratsWindow.style.display = "block";
    const message = congratsWindow.querySelector("#message");
    message.innerHTML = "You've successfully completed the game in " + count + " move(s) and with " + howManyStars + " star(s). \n And all that in just " + seconds + " seconds!";
};

function restart () {
    shownCards = [];
    matchedCards = [];
    count = 0;
    moves.innerHTML = 0;
    seconds = 0;
    timer.innerHTML = 0;
    firstClick = true;
    stopTimer();
    howManyStars = 3;
    secondStar.className = "fa fa-star second";
    thirdStar.className = "fa fa-star third";
    cardsDisplay();
};

restartButton.addEventListener("click", restart);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
