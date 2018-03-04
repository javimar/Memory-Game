/*
 * Create a list that holds all of your cards
 */
 const masterCard =
 {
   allCardsList:
   [ // All 16 cards are here, 8 types x 2
     {
       name: 'diamond',
       icon: 'fa fa-diamond',
       class: 'card'
     },
     {
       name: 'diamond',
       icon: 'fa fa-diamond',
       class: 'card'
     },
     {
       name: 'plane',
       icon: 'fa fa-paper-plane-o',
       class: 'card'
     },
     {
       name: 'plane',
       icon: 'fa fa-paper-plane-o',
       class: 'card'
     },
     {
       name: 'anchor',
       icon: 'fa fa-anchor',
       class: 'card'
     },
     {
       name: 'anchor',
       icon: 'fa fa-anchor',
       class: 'card'
     },
     {
       name: 'bolt',
       icon: 'fa fa-bolt',
       class: 'card'
     },
     {
       name: 'bolt',
       icon: 'fa fa-bolt',
       class: 'card'
     },
     {
       name: 'cube',
       icon: 'fa fa-cube',
       class: 'card'
     },
     {
       name: 'cube',
       icon: 'fa fa-cube',
       class: 'card'
     },
     {
       name: 'leaf',
       icon: 'fa fa-leaf',
       class: 'card'
     },
     {
       name: 'leaf',
       icon: 'fa fa-leaf',
       class: 'card'
     },
     {
       name: 'bicycle',
       icon: 'fa fa-bicycle',
       class: 'card'
     },
     {
       name: 'bicycle',
       icon: 'fa fa-bicycle',
       class: 'card'
     },
     {
       name: 'bomb',
       icon: 'fa fa-bomb',
       class: 'card'
     },
     {
       name: 'bomb',
       icon: 'fa fa-bomb',
       class: 'card'
     }
   ]
 };

 // control the moves (clicks)
 let moveCounter = 0;

 const cardState = ['open', 'match', 'nomatch'];
 let openCardsList = []; // we put the cards that are faced up (open card)

/**
* Functions to return the state of a card
*/
 function openCard()
 {
   return cardState[0];
 }

 function matchCard()
 {
   return cardState[1];
 }

 function nomatchCard()
 {
   return cardState[2];
 }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards()
 {
   const cards = masterCard.allCardsList;
   shuffle(cards);

   // get a reference to the deck
   const deck = document.querySelector('.deck');

   // loop through the array of cards
   for (let card of cards)
   {
     // create li and i elements as per deck HTML layout
     let liElem = document.createElement('li');
     let iElem = document.createElement('i');

     // assign classes
     liElem.classList.add(card.class, card.name); // assign "name" to identify card not to style it
     iElem.className = card.icon;

     // append to ul deck list
     liElem.appendChild(iElem);
     deck.appendChild(liElem);

     // assign a click event listener for each card
     liElem.addEventListener('click', function()
     {
       // open card
       addCardToOpen(liElem, card.name);
     });
   }
 }

 function addCardToOpen(li, cardName)
 {
   // card is open
   li.classList.add(openCard());

   // put card in the open list array
   openCardsList.push(li);

   // if the list already has another card, check to see if the two cards match
   if (openCardsList.length === 2)
   {
     // place individual cards in 2 variables so we can compare them
     let card1 = openCardsList[0];
     let card2 = openCardsList[1];
     if(card1.classList.contains(cardName) && card2.classList.contains(cardName))
     {
       // cards match, set state to "match"
       card1.classList.add(matchCard());
       card2.classList.add(matchCard());
     }
     else
     {
       // cards not match, set state to "nomatch"
       card1.classList.add(nomatchCard());
       card2.classList.add(nomatchCard());

       // set timeout to hide the card
       setTimeout(function()
       {
           card1.classList.remove(openCard(), nomatchCard());
           card2.classList.remove(openCard(), nomatchCard());
       }, 900);
     }

     // clean and reset openCardsList array
     resetList(openCardsList);
     incrementMoves();
   }
 }

// Increment moves counter
function incrementMoves()
{
  // increment moves counter
  const movesElement = document.querySelector('.moves');
  const movesWord = document.querySelector('.moves-literal');
  moveCounter++;
  if(moveCounter === 1)
  {
    movesWord.textContent = "Move";
  }
  else
  {
    movesWord.textContent = "Moves";
  }
  movesElement.textContent = moveCounter;
}

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

function resetList(list)
{
  list.length = 0;
  return list;
}

function initGame()
{
  const restartButton = document.querySelector('.restart');
  restartButton.addEventListener('click', function()
  {
    location.reload();
  });
  displayCards();
}

initGame();
