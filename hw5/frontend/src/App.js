import React, { useState } from 'react';
import './App.css';
// import StartMenu from './component/startMenu'
// import GameMode from './component/gameMode'
// import WinningMode from './component/winningMode'
import {StartGame, Guess, Restart} from './axios'

function App() {
  
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleStart = async () => {
    setHasStarted(true)
    const response = await StartGame()
  }

  const handleGuess = async () => {
    const response = await Guess(number)
    console.log("response: ", response)

    if(response === 'Equal') setHasWon(true)
    else {
        setStatus(response)
        setNumber('')
    }
  }

  const handleRestart = async () => {
    setHasStarted(false)
    setHasWon(false)
    const response = await Restart()
    console.log("response: ", response)
  }

  function setNum (e) {
    // console.log("e, number: ", e.target.value, number)
    setNumber(e.target.value)
  }

  const GameMode = <>
      <p>guess a number between 1 to 100 </p>
      <input onChange={setNum}></input>
      <button onClick={handleGuess} disabled={!number}> guess!</button>
      <p>{status}</p>
  </>

  const StartMenu = <div>
      <button onClick={handleStart}> start game </button>
  </div>
  

  const WinningMode = <>
      <p>you won! the number was {number}</p>
      <button onClick={handleRestart}> restart!</button>
  </>



  const game = <div>
    {hasWon ? WinningMode : GameMode }
  </div>
  

  return<div className="App">
      {hasStarted ? game : StartMenu } 
    </div>
  
}

export default App;
