/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    // console.log(guess)
    let idx = 0
    let ans
    if(guess[rowIdx] != undefined) {
        ans=<div className='Row-wrapper'>
            <div className={'Row-wordbox ' + guess[rowIdx][0].color} id={rowIdx+"-0"} key={rowIdx+"-0"} >{guess[rowIdx][0].char}</div>
            <div className={'Row-wordbox ' + guess[rowIdx][1].color} id={rowIdx+"-1"} key={rowIdx+"-1"} >{guess[rowIdx][1].char}</div>
            <div className={'Row-wordbox ' + guess[rowIdx][2].color} id={rowIdx+"-2"} key={rowIdx+"-2"} >{guess[rowIdx][2].char}</div>
            <div className={'Row-wordbox ' + guess[rowIdx][3].color} id={rowIdx+"-3"} key={rowIdx+"-3"} >{guess[rowIdx][3].char}</div>
            <div className={'Row-wordbox ' + guess[rowIdx][4].color} id={rowIdx+"-4"} key={rowIdx+"-4"} >{guess[rowIdx][4].char}</div>
        </div>
    }
    else{
        ans=<div className='Row-wrapper'>
            <div className={'Row-wordbox gray'} id={rowIdx+"-0"} key={rowIdx+"-0"} ></div>
            <div className={'Row-wordbox gray'} id={rowIdx+"-1"} key={rowIdx+"-1"} ></div>
            <div className={'Row-wordbox gray'} id={rowIdx+"-2"} key={rowIdx+"-2"} ></div>
            <div className={'Row-wordbox gray'} id={rowIdx+"-3"} key={rowIdx+"-3"} ></div>
            <div className={'Row-wordbox gray'} id={rowIdx+"-4"} key={rowIdx+"-4"} ></div>
        </div>
    }
    return (    
        <div className='Row-container' id={"row_"+rowIdx} key={"row_"+rowIdx}>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            {ans}
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;