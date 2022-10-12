//players guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//guess button
const guessButton = document.querySelector(".guess");
//text input where player guesses letters
const letter = document.querySelector(".letter");
//empty <p> where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//<p> where the remaining guesses will display
const remaining = document.querySelector(".remaining");
//<span> inside <p> where remaining guesses display
const remainingSpan = document.querySelector(".remaining span");
//empty <p> where messages appear when player guesses
const message = document.querySelector(".message");
//hidden button for play again
const playAgain = document.querySelector(".play-again");
//starter word until add API
const word = "magnolia";
const guessedLetters = [];

const progress = function(word) {
    const progressPlaceholder = [];
    for (const letter of word) {
        console.log(letter);
        progressPlaceholder.push("●");
    }
    wordInProgress.innerText = progressPlaceholder.join("");
};

progress(word);

//Event listener for guess button
guessButton.addEventListener("click", function(e) {
    //to prevent reloading behavior, working with form
    e.preventDefault();
    message.innerText = "";
    //what is entered in the input
    const playerGuess = letter.value;
   //make sure its a letter
   const goodGuess = validateInput(playerGuess);

   if (goodGuess) {
    makeGuess(playerGuess);
   }
   letter.value = "";
});

//Validates player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z."
    } else {
        return input;
    }
};

//function to capture input
const makeGuess = function(playerGuess) {
    playerGuess = playerGuess.toUpperCase();
    if (guessedLetters.includes(playerGuess)) {
        message.innerText = "You already guessed that letter. Try Again.";
    } else {
        guessedLetters.push(playerGuess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//function to show the guessed letters
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//update the word in progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    // console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};

