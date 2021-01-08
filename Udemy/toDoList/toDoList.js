let input = prompt("Please enter your command.");
let list = [];
while (input !== "quit") {
    if (input === "new") {
        task = prompt("Please enter your task.")
        list.push(task);
    }
    else if (input === "list") {
        for (let i = 0; i < list.length; i++) {
            console.log(`${i} : ${list[i]}`);
        }
    }
    else if (input === "delete") {
        let removedIndex = prompt("Which task would you like to delete?");
        list.splice(removedIndex, 1);
    }
    else {
        console.log("Please use one out of 4 valid commands.");
        break;
    }
    input = prompt("Please enter your command.");
}

console.log("Thank you. Bye Bye!");