let max = parseInt(prompt("Enter the Max number"));
while (!max) {
    max = parseInt(prompt("Enter VALID Max number"));
}
const targetNum = Math.floor(Math.random() * max) + 1;
console.log(targetNum);

let guess = parseInt(prompt("Enter your  first guess : what is the secret number?"));
let attempts = 1;

while (parseInt(guess) !== targetNum) {
    if (guess === 'q') {
        break;
    }
    attempts++;
    if (guess < targetNum) {
        //we want to let guess to be a string. like "q" so parse it only in the while condition
        guess = prompt("Too low! Try again!");
    }
    else {
        guess = prompt("Too High! Try again!");
    }
}

if (guess === "q") {
    console.log("Giving UP?... BYE BYE!");
}
else {
    if (attempts === 1) {
        console.log("Well Done! You Got It! It took you only one guess!!!");
    }
    else {
        console.log(`Well Done! You Got It! It took you ${attempts} guesses.`);
    }
}
