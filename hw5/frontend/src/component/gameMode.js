import React, { useState } from 'react';


const GameMode = ({number, status, handleGuess}) => {
    
    return(
        <>
            <p>guess a number between 1 to 100 </p>
            <input></input>
            <button onClick={handleGuess} disabled={!number}> guess!</button>
            <p>{status}</p>
        </>
    )
}
export default GameMode;
