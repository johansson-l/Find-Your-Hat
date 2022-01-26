const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

let inPlay = true;

class Field {
  constructor(field) {
    this._field = field;
    this.x = 0;
    this.y = 0;
  }
  get field() {
    return this._field;
  }
  // Prints the game field to console
  print() {
    return console.log(this._field.map((row) => row.join(" ")).join("\n"));
  }
  // Retrieve user input
  keyInput() {
    const direction = prompt("Which way? ");
    switch (direction.toLowerCase()) {
      case "w":
        console.log("Moving up");
        this.y -= 1;
        break;
      case "s":
        console.log("Moving down");
        this.y += 1;
        break;
      case "a":
        console.log("Moving left");
        this.x -= 1;
        break;
      case "d":
        console.log("Moving right");
        this.x += 1;
        break;
      default:
        break;
    }
  }
  // TODO: Retrieve in/out of bounds status
  status() {
    if (this.field[this.y] == undefined) {
      console.log("You lose - Out of boundary");
      return (inPlay = false);
    }
    switch (this.field[this.y][this.x]) {
      case hole:
        console.log("You lose - You fell in a hole!");
        inPlay = false;
        break;
      case undefined:
        console.log("You lose - Out of boundary");
        inPlay = false;
        break;
      case hat:
        console.log("You win - You found the hat!");
        inPlay = false;
        break;
      case fieldCharacter:
        console.log("Keep looking for the hat...");
        this.field[this.y][this.x] = pathCharacter;
        break;
      case pathCharacter:
        console.log("You are stepping on *");
        break;
    }
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

// Gameplay methods
function game() {
  while (inPlay) {
    myField.print();
    myField.keyInput();
    myField.status();
  }
  console.log("Game Over!");
}

game();
