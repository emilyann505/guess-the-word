//players guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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
    const playerGuess = letter.value;
    console.log(guess);
    //playerGuess.value to clear box
    playerGuess.value = "";
});
