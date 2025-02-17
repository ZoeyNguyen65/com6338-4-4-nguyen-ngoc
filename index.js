var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]
var specificWords = ['bananas', 'javascript', 'mango'];
let specificWordIndex = 0;

//Get references to the HTML elements//
const wordToGuessElement = document.getElementById('word-to-guess');
const previousWordElement = document.getElementById('previous-word');
const incorrectLettersElement = document.getElementById('incorrect-letters');
const remainingGuessesElement = document.getElementById('remaining-guesses');
const winsElement = document.getElementById('wins');
const lossesElement = document.getElementById('losses');

//Variables//
let wordToGuess = '';
let previousWord = '';
let incorrectLetters = [];
let remainingGuesses = 10;
let wins = 0;
let losses = 0;
let guessedWord = '';

function updateGameState() {
  wordToGuessElement.textContent = guessedWord;
  previousWordElement.textContent = previousWord;
  incorrectLettersElement.textContent = incorrectLetters.join(', ');
  remainingGuessesElement.textContent = remainingGuesses;
  winsElement.textContent = wins;
  lossesElement.textContent = losses;
}

function selectNextWord() {
  if (specificWordIndex < specificWords.length) {
  wordToGuess = specificWords[specificWordIndex];
  specificWordIndex++;
  } else {
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  }
  guessedWord = '_'.repeat(wordToGuess.length);
  }

//Initialize the game state//
selectNextWord();
updateGameState();

//Add an event listener to handle user input//
document.addEventListener('keypress', (event) => {
  const userInput = event.key.toLowerCase();

//Check if the user input is a letter//
if (userInput.match(/[a-z]/)) {
  //Check if the letter is in the word to guess//
  if (wordToGuess.includes(userInput)) {
    //Update the guessed word//
    const wordToGuessArray = wordToGuess.split('');
    const guessedWordArray = guessedWord.split('');
    for (let i = 0; i < wordToGuessArray.length; i++) {
      if (wordToGuessArray[i] === userInput) {
        guessedWordArray[i] = userInput;
      }
    }
    guessedWord = guessedWordArray.join('');
    //Check if the user wins//
    if (!guessedWord.includes('_')) {
      wins++;
      previousWord = wordToGuess;
      selectNextWord(); //Call selectNextWord again here//
      incorrectLetters = [];
      remainingGuesses = 10;
    }
  
  } else {
    //Add the incorrect letter to the list//
    if (!incorrectLetters.includes(userInput)) {
      incorrectLetters.push(userInput);
      remainingGuesses--;
      //Check if the user loses//
      if (remainingGuesses === 0) {
        losses++;
        previousWord = wordToGuess;
        wordToGuess = words[Math.floor(Math.random() * words.length)];
        guessedWord = '_'.repeat(wordToGuess.length);
        incorrectLetters = [];
        remainingGuesses = 10;
      }
    }
  }
}

updateGameState();
});
