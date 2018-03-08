/*
 * Create a list that holds all of your cards
 */
 const masterCard =
 {
   allCardsList:
   [ // All cards types
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
       name: 'bicycle',
       icon: 'fa fa-bicycle',
       class: 'card'
     },
     {
       name: 'bomb',
       icon: 'fa fa-bomb',
       class: 'card'
     }
   ]
 };

 // Game object variables
 const game =
 {
    moveCounter: 0,
    matchCounter: 0,
    starCounter: 3,
    timeEllapsed: null,
    timeStarted: false,
    openCard: "open",
    matchCard: "match",
    nomatchCard: "nomatch",
    openCardsList: [] // we put the cards that are faced up (open card)
 }

 // Utilities functions go here
 const utils = {};

 utils.shuffle = function(array) // Shuffle function from http://stackoverflow.com/a/2450976
 {
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

  utils.startTimer = function() // Timer function-. Adapted from https://stackoverflow.com/a/7910506/6260431
  {
    let sec = 0;
    function pad(val)
    {
      return val > 9 ? val : "0" + val;
    }
    timeEllapsed = setInterval(function()
    {
      document.getElementById("seconds").innerHTML = pad(++sec % 60);
      document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
     }, 1000);
  }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards()
 {
   // double the array so as to have all 16 cards
   const cards = masterCard.allCardsList.concat(masterCard.allCardsList);
   utils.shuffle(cards);

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
       addCardToOpenList(liElem, card.name);
     });
   }
 }

 function addCardToOpenList(li, cardName)
 {
  // check if timer already started
  if(!game.timeStarted)
  {
    utils.startTimer();
    game.timeStarted = true;
  }

   // if card is already open, we cannot push it again into the list
   if(li.classList.contains(game.openCard))
   {
     return;
   }

   // card is open
   li.classList.add(game.openCard);

   // put card in the open list array
   game.openCardsList.push(li);

   // check cards
   checkCards(cardName);
 }

 function checkCards(cardName)
 {
   // if the list already has another card, check to see if the two cards match
   if (game.openCardsList.length === 2)
   {
     // place individual cards in 2 variables so we can compare them
     let card1 = game.openCardsList[0];
     let card2 = game.openCardsList[1];
     if(card1.classList.contains(cardName) && card2.classList.contains(cardName))
     {
       // cards match, set state to "match"
       card1.classList.add(game.matchCard);
       card2.classList.add(game.matchCard);

       // increment the match counter
       game.matchCounter++;
     }
     else
     {
       // cards not match, set state to "nomatch"
       card1.classList.add(game.nomatchCard);
       card2.classList.add(game.nomatchCard);

       // set timeout to hide the card
       setTimeout(function()
       {
           card1.classList.remove(game.openCard, game.nomatchCard);
           card2.classList.remove(game.openCard, game.nomatchCard);
       }, 900);
     }

     // clean and reset openCardsList array
     resetList(game.openCardsList);
     incrementMoves();

     // check if game is finished
     if(game.matchCounter === 8)
     {
       // stop timer
       clearInterval(timeEllapsed);

       // game over, show Modal box
       showModal();
       game.matchCounter, game.moveCounter = 0;
     }
   }
 }

 // Displays the modal with the game statistics
 function showModal()
 {
   // Get the modal
   const modal = document.getElementById('myModal');

   // Get the <span> element that closes the modal
   const spanClose = document.getElementsByClassName("close")[0];

   // open the modal
   modal.style.display = "block";

   // When the user clicks on <span> (x), close the modal
   spanClose.onclick = function()
   {
     modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event)
   {
     if (event.target == modal)
     {
       modal.style.display = "none";
     }
   }

   // feed stats to the body of the modal
   const modalBody = document.querySelector('.modal-body');
   let para1 = document.createElement('p');
   let para2 = document.createElement('p');
   let para3 = document.createElement('p');

   // Handle MOVES
   para1.textContent = "Moves = " + game.moveCounter;
   modalBody.appendChild(para1);

   // Handle TIMER
   para2.textContent =
        "Time used = " +
        document.querySelector('#minutes').textContent + ":" +
        document.querySelector('#seconds').textContent;
   modalBody.appendChild(para2);

   // Handle STARS RATING
   const stars = document.querySelector('.stars');
   para3.textContent = "Your star rating = ";

   // choose color of stars based on number
   let color = "";
   switch(game.starCounter)
   {
    case 1:
      color = "red";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "green";
      break;
   }

   for(let i = 0; i < game.starCounter; i++)
   {
    // create the <i> element to host the "*"
    let iElem = document.createElement('i');

    // assign classes and color
    iElem.className = "fa fa-star";
    iElem.style.color = color;

    // append the rating to the <p> element
    para3.appendChild(iElem);
   }
   modalBody.appendChild(para3);

   // add an event listener to the button
   document.querySelector(".modal-button").addEventListener("click", function()
   {
     location.reload();
   });
 }

// Increment moves counter
function incrementMoves()
{
  // increment moves counter
  const movesElement = document.querySelector('.moves');
  const movesWord = document.querySelector('.moves-literal');
  game.moveCounter++;

  if(game.moveCounter === 1)
  {
    movesWord.textContent = "Move";
  }
  else
  {
    movesWord.textContent = "Moves";
  }
  movesElement.textContent = game.moveCounter;

  // take control of the stars (player performance)
  setStarPerformance(game.moveCounter);
}

function setStarPerformance(moves)
{
  const starsUl = document.querySelector('.stars');
  const liNumElem = starsUl.getElementsByTagName("LI").length;

  if(game.starCounter !== 1)
  {
    // decrement 1 star when hitting 11 moves
    if(moves > 12 && moves <= 20)
    {
      game.starCounter = 2;
      // leave two <li> elements
      if(liNumElem === 3)
      {
        starsUl.removeChild(starsUl.childNodes[0]);
        starsUl.style.color = "orange";
      }
    }
    // decrement 2 stars when hitting 20 moves
    else if(moves > 20)
    {
      game.starCounter = 1;
      // leave just one <li> element
      if(liNumElem === 2)
      {
        starsUl.removeChild(starsUl.childNodes[1]);
        starsUl.style.color = "red";
      }
    }
  }
}

function resetList(list)
{
  list.length = 0;
  return list;
}

function initGame()
{
  // add a listener to the restart button
  const restartButton = document.querySelector('.restart');
  restartButton.addEventListener('click', function()
  {
    location.reload();
  });

  // display all the cards
  displayCards();
}

// GAME point of entry
initGame();
