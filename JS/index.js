// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 5;
let timer;
let highScore = localStorage.getItem('highScore') || '-';
const timeLimitInSeconds = 60;

function startTimer() {
  let secondsLeft = timeLimitInSeconds;
  timer = setInterval(function() {
    secondsLeft--;
    if (secondsLeft >= 0) {
      document.getElementById('timer').innerText = secondsLeft;
    }
    if (secondsLeft === 0) {
      clearInterval(timer);
      disableInput();
      setMessage(`Time's up! The number was ${randomNumber}.`, 'red');
    }
  }, 1000);
}

startTimer();
displayHighScore();

function checkGuess() {
  const guess = parseInt(document.getElementById('guessInput').value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    setMessage('Please enter a valid number between 1 and 100.', 'red');
    return;
  }

  attempts--;

  if (guess === randomNumber) {
    clearInterval(timer);
    setMessage(`Congratulations! You guessed the number ${randomNumber} correctly!`, 'green');
    disableInput();
    updateHighScore();
    setTimeout(function() {
      alert("Congratulations! You guessed the number correctly!");
    }, 100);
  } else {
    if (attempts === 0) {
      clearInterval(timer);
      setMessage(`Game Over! The number was ${randomNumber}.`, 'red');
      disableInput();
    } else {
      const hint = guess < randomNumber ? 'higher' : 'lower';
      setMessage(`Incorrect! Try again. Hint: The number is ${hint}. Attempts remaining: ${attempts}`, 'red');
    }
  }
}

function setMessage(message, color) {
  document.getElementById('message').innerText = message;
  document.getElementById('message').style.color = color;
}

function disableInput() {
  document.getElementById('guessInput').disabled = true;
  document.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

function resetGame() {
  clearInterval(timer);
  attempts = 5;
  document.getElementById('guessInput').value = '';
  document.getElementById('guessInput').disabled = false;
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
  startTimer();
  setMessage('');
}

function updateHighScore() {
  if (attempts === 5 || attempts > highScore) {
    highScore = attempts;
    localStorage.setItem('highScore', highScore);
    displayHighScore();
  }
}

function displayHighScore() {
  document.getElementById('highScore').innerText = highScore !== '-' ? highScore : '-';
}

