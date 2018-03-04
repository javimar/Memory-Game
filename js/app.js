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
   ],

   openCardsList: [], // we put the cards that are faced up
   cardState: ['open', 'match', 'nomatch']
 };


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards()
 {
   const cards = masterCard.allCardsList;
   const openCards = masterCard.openCardsList;
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
     liElem.classList.add(card.class);
     iElem.className = card.icon;
     // append to ul deck list
     liElem.appendChild(iElem);
     deck.appendChild(liElem);
     // assign a click event listener for each card
     liElem.addEventListener('click', function()
     {
       // add class open and show
       liElem.classList.add(masterCard.cardState[0]);
     });
   }
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


displayCards();
