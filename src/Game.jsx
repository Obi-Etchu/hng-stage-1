import { useState } from "react";
import "./Game.css";

const Game = () => {
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function generateColorOptions(targetColor) {
    const colors = new Set();
    colors.add(targetColor);

    while (colors.size < 6) {
      colors.add(getRandomColor());
    }

    return Array.from(colors).sort(() => Math.random() - 0.5);
  }

  const [boxColor, setBoxcolor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [gameMessage, setGamemessage] = useState("");
  const [options, setOptions] = useState(generateColorOptions(boxColor));
  const [animationClass, setAnimationClass] = useState("");

  const handleClick = (color) => {
    if (color === boxColor) {
      setScore(score + 1);
      setGamemessage("Correct Guess! Great Job👏");
      setAnimationClass("correct-text");
      const newBoxColor = getRandomColor();
      setTimeout(() => {
        setBoxcolor(newBoxColor);
        setOptions(generateColorOptions(newBoxColor));
        setAnimationClass("");
      }, 1000);
    } else {
      setGamemessage("Oops, try again❌");
      setAnimationClass("wrong-text");
      const newBoxColor = getRandomColor();
      setTimeout(() => {
        setBoxcolor(newBoxColor);
        setOptions(generateColorOptions(newBoxColor));
        setAnimationClass("");
      }, 1000);
}
    setTimeout(() => {
      setGamemessage("");
      setAnimationClass("");
    }, 1000);
  };

  return (
    <div className="container">
      <h2 data-testid="gameInstructions">Choose The Correct Color</h2>
      <div
        className="color-box"
        style={{ background: boxColor,
          width:"200px",
          height: "100px",
          margin:"auto",
          alignItems:"center",
          marginBottom:"20px"
         }}
        data-testid="colorBox"
      >
        <p style={{margin: "auto", 
          justifyContent:"center",
           padding: "20px", 
           color: "white"}}>Guess This Colour</p>
      </div>
      {options.map((color, index) => (
        <button
          key={index}
          onClick={() => handleClick(color)}
          style={{ 
            background: color,
            marginLeft:"5px",
            marginBottom:"5px",
            padding:"20px",
            width:"15%"
           }}
          data-testid="colorOption"
        >
          
        </button>
      ))}
      <p className={animationClass} data-testid="gameStatus">{gameMessage}</p>
      <p data-testid="score" style={{color:"black"}}>{`Score: ${score}`}</p>

      
      <button
        onClick={() => {
          const newBoxColor = getRandomColor();
          setBoxcolor(newBoxColor);
          setOptions(generateColorOptions(newBoxColor));
          setScore(0);
          setGamemessage("");
        }}
        style={{
          width:"100%",
          backgroundColor: "skyblue"
        }}
        data-testid="newGameButton"
      >
        New Game
      </button>

    </div>
  );
};

export default Game;
