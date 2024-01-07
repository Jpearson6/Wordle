import React, { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard";
import TopBanner from "./pages/TopBanner";
import MessageCenter from './pages/MessageCenter';

// Load and map the word list from a JSON file
let wordList = require('./fiveLetterWords.json');
wordList = wordList['words'].map(word => word);

// Select a random word from the word list
let currentWord = wordList[Math.floor(Math.random() * wordList.length)];

// Configuration settings for the game
const config = {
  numBoxesPerRow: 5,
  numBoxRows: 6,
  widthOfABox: 50,
  heightOfABox: 50,
  gapBetweenBoxes: 10,
  initialBackgroundColor: '#919191'
};

// Main App Component
function App() {
  // Keyboard layout definition
  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // State variables
  const [keyboard, setKeyboard] = useState([
    line1.map(letter => ({ letter, backgroundColor: config.initialBackgroundColor })),
    line2.map(letter => ({ letter, backgroundColor: config.initialBackgroundColor })),
    line3.map(letter => ({ letter, backgroundColor: config.initialBackgroundColor }))
  ]);
  const [activeRow, setActiveRow] = useState(new Array(config.numBoxesPerRow * config.numBoxRows).fill({
    backgroundColor: config.initialBackgroundColor,
    letter: ""
  }));
  const [idx, setIdx] = useState(0);
  const [messageString, setMessageString] = useState("");
  const [currentRow, setCurrrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);

 useEffect(() => {
    // Add event listener for keyboard input
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  },);

// Function to change the color of a specific key in the active row
const changeColor = (idx, color) => {
  // PRE: idx is within the bounds of the active row
  // POST: The color of the key at the specified index in the active row is changed
  // PARAMS: idx - Index of the key, color - New background color
  if (idx < config.numBoxesPerRow * (currentRow + 1)) {
    const newActiveRow = activeRow.slice();
    newActiveRow[idx].backgroundColor = color;
    setActiveRow(newActiveRow);
  }
}

// Function to update the background color of a key in the keyboard layout
const updateKey = (letter, color) => {
  // PRE: None
  // POST: The background color of the specified letter in the keyboard layout is updated
  // PARAMS: letter - The letter to update, color - New background color
  setKeyboard(prevKeyboardArray => {
    return prevKeyboardArray.map(line =>
      line.map(key => {
        if (key.letter === letter && key.backgroundColor !== "green") {
          return { ...key, backgroundColor: color };
        }
        return key;
      })
    );
  });
}

// Handle keyboard key press event
const handleKeyPress = (event) => {
  // PRE: None
  // POST: Depending on the pressed key, different actions may be triggered (e.g., enterButton, backSpaceButton)
  // PARAMS: event - The keyboard event object
  const pressedKey = event.key.toUpperCase();
  const alphaRegex = /^[A-Z]+$/;

  // Check Tab key
  pressedKey === "TAB" ? event.preventDefault() :
    // Check Enter key
    pressedKey === "ENTER" ? enterButton() :
      // Check Backspace key
      pressedKey === "BACKSPACE" ? backSpaceButton() :
        // Test the input string against the regular expression
        alphaRegex.test(pressedKey) && pressedKey.length === 1 ?
          changeLetter(pressedKey) :
          setMessageString("Letters Only");
}

// Function to change the letter in the active row
const changeLetter = (letter) => {
  // PRE: idx is within the bounds of the active row, gameOver is false
  // POST: The letter at the current index in the active row is changed, idx is incremented
  // PARAMS: letter - The new letter to be placed in the active row
  if (idx < config.numBoxesPerRow * (currentRow + 1) && !gameOver) {
    const newActiveRow = activeRow.slice();
    newActiveRow[idx] = {
      letter: letter,
      backgroundColor: config.initialBackgroundColor
    }
    setActiveRow(newActiveRow);
    let i = idx;
    i++;
    setIdx(i);
  }
}

// Function to handle Backspace key press
const backSpaceButton = () => {
  // PRE: gameOver is false
  // POST: The letter at the current index in the active row is cleared, idx is decremented
  // PARAMS: None
  if (gameOver)
    return;
  let i = idx;
  if (i > config.numBoxesPerRow * currentRow)
    i--;
  if (i < config.numBoxesPerRow * (currentRow + 1)) {
    const newActiveRow = activeRow.slice();
    newActiveRow[i] = {
      letter: "",
      backgroundColor: config.initialBackgroundColor
    }
    setActiveRow(newActiveRow);
  }
  setIdx(i);
}

// Function to handle Enter key press
const enterButton = () => {
  // PRE: gameOver is false
  // POST: Depending on the correctness of the entered word, keys and colors may be updated, and game state may change
  // PARAMS: None
  if (gameOver)
    return;
  let x = "";
  activeRow.slice(config.numBoxesPerRow * currentRow, config.numBoxesPerRow * (currentRow + 1)).forEach((attribute) => {
    x += attribute.letter
  })
  if (wordList.includes(x.toLowerCase())) {
    for (let i = 0; i < config.numBoxesPerRow; i++) {
      if (x[i].toLowerCase() === currentWord[i]) {
        updateKey(x[i], "green");
        changeColor(i + currentRow * config.numBoxesPerRow, "green");
      }
      else if (currentWord.includes(x[i].toLowerCase())) {
        updateKey(x[i], "orange");
        changeColor(i + currentRow * config.numBoxesPerRow, "orange");
      }
      else {
        updateKey(x[i], "#303030");
        changeColor(i + currentRow * config.numBoxesPerRow, "#303030");
      }
    }
    if (currentWord === x.toLowerCase()) {
      // Word is correct, game is over
      let message = "Correct!";
      setMessageString(message);
      setGameOver(true);
    }
    else {
      // Partially correct or incorrect word, move to the next row or end the game
      let message = "";
      setMessageString(message);
      let row = currentRow + 1;
      setCurrrentRow(row);
      let i = config.numBoxesPerRow * (currentRow + 1);
      if (i === config.numBoxRows * config.numBoxesPerRow) {
        // End of the game, reveal the correct word
        setGameOver(true);
        setMessageString(currentWord);
      }
      setIdx(i);
    }
  }
  else if (x.length < config.numBoxesPerRow) {
    // Entered word has insufficient letters
    let message = "Not enough letters"
    setMessageString(message);
    message = "";
    setTimeout(setMessageString, 2000, message);
  }
  else {
    // Entered word is not in the word list
    let message = "Not in Word List"
    setMessageString(message);
    message = "";
    setTimeout(setMessageString, 2000, message);
  }
}

  return (
    <Fragment>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContents: "center",
        minHeight: '100%',
        height: '100%',
        backgroundColor: 'black'
      }}>
        <TopBanner />
        < MessageCenter messageString={messageString} />
        <GuessArea activeRow={activeRow} />
        <Keyboard keyboard={keyboard}
          changeLetterCallBack={(letter) => changeLetter(letter)}
          backSpaceButtonCallback={() => backSpaceButton()}
          enterButtonCallback={() => enterButton()} />
        
      </Box>
    </Fragment>
  );
}

export default App;
