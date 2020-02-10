const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

  this.classList.toggle('flip');

  if(!hasFlippedCard){
      // first click
      hasFlippedCard = true;
      firstCard = this; 

      return;
  } 
      // second click
      
      secondCard = this; 
      
      checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    // ternary operator. short hand if else statement
    isMatch ? disableCards() : unflip();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
}

function unflip(){
    // not a match
    lockBoard = true;
          setTimeout(() =>  {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');

          resetBoard(); 
          },1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));