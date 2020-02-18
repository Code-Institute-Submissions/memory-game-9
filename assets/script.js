const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
/**
 * lockboard allows one set to flip at a time
 */
let lockBoard = false;
let firstCard, secondCard;
let countdown = null;
const timerDisplay = document.querySelector('.timer');

/**
 * adds flip on click
 */
function flipCard() {
    if (lockBoard) return;
    /**
     * prevents double-click match
     */
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        timer(120);
        return;
    }
    // second click

    secondCard = this;

    checkMatch();
}

/**
 * checks for a match
 */
function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    // ternary operator. shorthand if else statement
    isMatch ? disableCards() : unflip();
}

/**
 * removes class when matched
 */
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


/**
 * unflips no match
 */
function unflip() {
    lockBoard = true;
    /**
     * unflip timer
     */
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}


/**
 * resets conditions
 */
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/**
 * randomly positions cards
 */
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    // displayTimeLeft(seconds);

    if (countdown === null) {
        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdown);
                countdown = null;
                // find a way to stop the timer when all cards match
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000);
    }
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

/**
 * adds flipcard class on click
 */
cards.forEach(card => card.addEventListener('click', flipCard));