const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard; 

function flipCard() {
  this.classList.toggle('flip');

  if(!hasFlippedCard){
      // first click
      hasFlippedCard = true;
      firstCard = this; 
  } else {
      // second click
      hasFlippedCard = false;
      secondCard = this; 
      
      checkMatch();
  }
}

function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    // ternary operator. short hand if else statement
    isMatch ? disableCards() : unflip();
    
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
}

function unflip(){
    // not a match
          setTimeout(() =>  {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          },1000);
}

cards.forEach(card => card.addEventListener('click', flipCard));