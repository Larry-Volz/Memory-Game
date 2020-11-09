
/*
Has to be tracked:
- cardsTurned
- colors of each card
- each won pair
- # of pairs to end game
- color of last card
*/

const gameContainer = document.getElementById("game");
let cardsTurned = 0;
let lastCard;
let lastCardColor;
let pairsMatched = 0;
let numClicks = 0;
let highScore = 0;

//check localStorage for prior high score
let oldScore = JSON.parse(window.localStorage.getItem("highScore")) || 0;
highScore = oldScore;

console.log(`oldScore: ${oldScore}`);

//output to screen
document.querySelector("#score-number").innerText = oldScore;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(shuffledColors) {
  let cardNumber = 0;
  for (let color of shuffledColors) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('faceDown');
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick); //each has identical eventListener

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


/********************************************************************************** */
/*                           GAME LOOP                                             */
/********************************************************************************* */    

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  numClicks++;
  document.querySelector('#clicks').innerText = numClicks;

  //if !unClickable proceed - if not ignore

    switch(cardsTurned) {
      
      case 0:
      //no cards already turned over this round
      //if none are visable turn one face up
      flipFaceUp(event);

      //update cardsTurned to 1
      cardsTurned = 1;
      
      // console.log(`last card was ${lastCard.classList.item(0)}`);
      // console.log(`this card is ${event.target.classList.item(0)}`);

      lastCardColor = event.target.style.backgroundColor; //for referencing next round
      lastCard = event.target;
      console.log(`last card: ${lastCard.classList.item(0)}`);

      break;
    case 1:
      //1 card already turned over
      //if click on one that'a already face up ignore
      if (event.target.classList.contains("faceUp")) {
          //skip the next section
          // alert("face up");
      } else {

      //if one is visable show the second
      flipFaceUp(event);

      //if correct 
      if (isCorrect(event)) {

          // setTimeout(function(){
          //   alert("Correct!")
          // },1);

              //leave them both visable (change class to unclickable)

              //add them to clicked cards so now unclickable class
              // create correctPair(event); where add unclickable class and score++, add if(!unclickable) to flipFaceDown()

              //check to see if game over.
               //timeOut to compensate for delay in screen rendering of flipFaceUp 
              pairsMatched++;
              if (pairsMatched >= (COLORS.length/2)){

                // let oldScore = JSON.parse(window.localStorage.getItem("highScore"));

                if (numClicks < oldScore || highScore === 0) {

                  highScore = numClicks;
                  window.localStorage.setItem("highScore", highScore);
                  document.querySelector("#score-number").innerText = highScore;
                  
                } else if (highScore >= oldScore) {
                  highScore = oldScore;
                } 
                
                document.querySelector("#score-number").innerText = highScore;

                setTimeout(function(){
                  alert(`GAME OVER.  You scored: ${numClicks}`);
                },1);

                document.querySelector("BUTTON").style.display = "inline-block";
                document.querySelector("BUTTON").addEventListener('click', function(){
                  location.reload();
                });
                
              }
              
                  //Yes -> go to closing/reset subroutine
          //set # of cards face up back to 0
          cardsTurned = 0;
          break;
      }   

          //if 2nd card incorrect 
          
              //do pause timer and flip both cards
              setTimeout(function(){
                flipFaceDown(event)}, 1000);

              
              
          
        }
          //set # of cards face up back to 0
          cardsTurned = 0;
          break;
        case 2:

         //event.target.classList.add("faceDown");
        //event.target.style.backgroundColor = "black";

          break;
      }
}



function flipFaceUp(event) {
  event.target.classList.remove("faceDown");
  event.target.classList.add("faceUp");
  event.target.style.backgroundColor = event.target.classList.item(0);
  console.log("color is", event.target.classList.item(0));
}

function flipFaceDown(event) {
  setTimeout(function(){
  event.target.style.backgroundColor = "white";
  event.target.classList.remove("faceUp");
  event.target.classList.add("faceDown");

  lastCard.style.backgroundColor = "white";
  lastCard.classList.remove("faceUp");
  lastCard.classList.add("faceDown");   // <--- THIS IS THE ERROR.  iT IS ADDING THE STYLE BUT NOT SHOWING THE background-image!
  
  //console.log("color is", event.target.classList.item(0));  
  }, 0);
}

function isCorrect(event) {
  let card1 = event.target.style.backgroundColor;
  let card2 = lastCard.style.backgroundColor;
  if( card1 === card2){  
    // && card1.classList.contains("faceUp") & card2.classList.contains("faceUp")
  return true;
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);