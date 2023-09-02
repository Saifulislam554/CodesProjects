// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;

function checkGuess() {
  const userGuess = parseInt(document.getElementById('userGuess').value);
  attempts++;

  if (isNaN(userGuess)) {
    displayMessage('Please enter a valid number.');
  } else if (userGuess < 1 || userGuess > 100) {
    displayMessage('Please enter a number between 1 and 100.');
  } else if (userGuess === randomNumber) {
    displayMessage(`Congratulations! You guessed the correct number ${randomNumber} in ${attempts} attempts.`);
    disableInput();
  } else if (userGuess < randomNumber) {
    displayMessage('Try a higher number.');
  } else {
    displayMessage('Try a lower number.');
  }
}

function displayMessage(message) {
  document.getElementById('message').textContent = message;
}

function disableInput() {
  document.getElementById('userGuess').disabled = true;
}

function resetGame() {
  attempts = 0;
  document.getElementById('userGuess').value = '';
  document.getElementById('userGuess').disabled = false;
  document.getElementById('message').textContent = '';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
