'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}


let hint
let coloredPegs = 0
let whitePegs = 0
let guessedLetters = '';
const generateHint = (guess) =>  {
  for (let i = 0; i < guess.length; i++) {
    if (guessedLetters.includes(guess.charAt(i))) {
      continue
    } else if (guess.charAt(i) == solution.charAt(i)) {
      coloredPegs += 1
    } else if (solution.includes(guess.charAt(i))) {
      whitePegs += 1
    }
    guessedLetters += guess.charAt(i)
  }
  hint = coloredPegs + "-" + whitePegs
  coloredPegs = 0
  whitePegs = 0
  guessedLetters = ''

  return hint
}

const mastermind = (guess) => {
  
  board.push(guess)
  if (solution == ''){
    generateSolution()
  }
  
  generateHint(guess)
  coloredPegs = 0
  whitePegs = 0
  console.log(hint.slice(0,1))
  if (hint.slice(0,1) == 4) {
    return 'You guessed it!'
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}