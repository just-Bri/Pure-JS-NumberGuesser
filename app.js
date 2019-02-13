// GAME FUNCTION
//  - Player must guess a number between a min and max
//  - Player gets a certain number of guesses
//  - Notify player of guesses remaining, and if they are correct
//  - Let player choose to play again

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listener
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  // Check if won
  if (guess === winningNum) {
    // Game Over - Won
    gameOver(true, `${winningNum} is correct! YOU WIN!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game Over Man - Lost
      gameOver(false, `${winningNum} was the correct answer, GAME OVER MAN!`);
    } else {
      // Game Continues - answer wrong
      // Wrong Number
      setMessage(`${guess} is incorrect, ${guessesLeft} guesses left`, "red");
      guessInput.style.borderColor = "red";
      // Clear input
      guessInput.value = "";
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable Input
  guessInput.disabled = true;
  // Change Border  and Text color based on won
  guessInput.style.borderColor = color;
  message.style.color = color;
  // Winning Message
  setMessage(msg);

  // Play Again
  guessBtn.value = "Play Again?";
  guessBtn.className += "play-again";
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Set Winning Num
function getRandNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
