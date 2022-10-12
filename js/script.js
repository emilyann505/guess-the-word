//players guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//guess button
const guessButton = document.querySelector(".guess");
//text input where player guesses letters
const letterInput = document.querySelector(".letter");
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
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//async function to get txt file
const getWord = async function() {
    const getWordrequest = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await getWordrequest.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    progress(word);
    
};

getWord();

const progress = function(word) {
    const progressPlaceholder = [];
    for (const letter of word) {
        console.log(letter);
        progressPlaceholder.push("●");
    }
    wordInProgress.innerText = progressPlaceholder.join("");
};


//Event listener for guess button
guessButton.addEventListener("click", function(e) {
    //to prevent reloading behavior, working with form
    e.preventDefault();
    message.innerText = "";
    //what is entered in the input
    const guess = letterInput.value;
   //make sure its a letter
   const goodGuess = validateInput(guess);

   if (goodGuess) {
    makeGuess(guess);
   }
   letterInput.value = "";
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
const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try Again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessesRemaining(guess);
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

//fxn to count guesses remaining
const guessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}!`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

//hide and show elements
const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
};

//click event for playAgain
playAgain.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetters =[];
    remainingGuesses = 8;
    remaining.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    //to get a new word to populate
    getWord();

    guessButton.classList.remove("hide");
    playAgain.classList.add("hide");
    remaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});