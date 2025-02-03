// import React from 'react'

import { useState } from "react";

const Game = () => {
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256); // Random value between 0-255
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`; // Return as an RGB string
    }
    
    console.log(getRandomColor());
    function generateColorOptions(targetColor) {
        const colors = new Set();
        colors.add(targetColor); // Ensure the correct color is in the list
    
        while (colors.size < 6) {
            colors.add(getRandomColor()); // Keep adding until we have 6 unique colors
        }
    
        return Array.from(colors).sort(() => Math.random() - 0.5); // Shuffle the colors
    }

    const [boxColor, setBoxcolor] = useState(getRandomColor())
    const [score, setScore] = useState(0)
    const [gameMessage, setGamemessage] = useState("");
    const [options, setOptions] = useState(generateColorOptions(boxColor));

    const handleclick =(color)=>{
      if(color === boxColor){
        setScore(score+1)
        setGamemessage('Correct Guess! Great Job👏')
        const newBoxColor = getRandomColor();
        setBoxcolor(newBoxColor);
        setOptions(generateColorOptions(newBoxColor));
      }else{
        setGamemessage('Oops try again❌')
      }
      setTimeout(()=>(
        setGamemessage('')
      ), 1000)
    }

   return (
    <div>
      <div>
        <h2 data-testid="gameInstructions">Choose The Correct Color</h2>
      </div>
      <div style={{width:"200px",
      height: "100px",
      background: boxColor,
      marginBottom: "10px",
      margin: "auto",
      border: "2px solid black",
      alignItems: "center"
      }} data-testid="colorbox">
        <h2>Box</h2>
      </div>
     
     {options.map((color, index) => (
      <button 
      key={index}
      onClick={()=> handleclick(color)}
      style={{
        background: color,
        color: "white",
        margin: "5px",
        padding: "10px",
        border: "none",
        cursor: "pointer"
      }}
      data-testid="colorOption"
      >button</button>
     ))}

     <p data-testid="score">{`Score:${score}`}</p>
     <p data-testid="gameStatus">{gameMessage}</p>

     <button
        onClick={() => {
          const newBoxColor = getRandomColor();
          setBoxcolor(newBoxColor);
          setOptions(generateColorOptions(newBoxColor));
          setScore(0);
          setGamemessage("");
        }}
        style={{
          margin: "10px",
          padding: "10px",
          cursor: "pointer"
        }}
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  )
}

export default Game
