/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.
    const [context, setContext] = useState("");           
    const [remainMineNum, setRemainMineNum] = useState(25);    

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        setRemainFlagNum(25);
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        setBoard(newBoard.board);
        setMineLocations(newBoard.mineLocations)
        setNonMineCount(boardSize*boardSize - mineNum);
        // Hint: Read the definition of those Hook useState functions and make good use of them.
    }

    // console.log('Board created' + board)



    const restartGame = () => {
        freshBoard();
        setRemainFlagNum(25);
        setGameOver(false);
        setWin(false);
    }

    const check_win = () => {
        if(remainMineNum === 0 || nonMineCount === 0){
            setGameOver(true)
            setWin(true)
            setContext("CONGRATS, U WIN👑!!!")
        }
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if(board[x][y].revealed) return
        if(remainFlagNum === 0) return
        if(board[x][y].flagged){
            board[x][y].flagged = false
            setRemainFlagNum(remainFlagNum + 1)
            if(board[x][y].value === '💣'){
                setRemainMineNum(remainMineNum + 1)
            }
        }
        
        else{
            board[x][y].flagged = true
            setRemainFlagNum(remainFlagNum - 1)
            if(board[x][y].value === '💣'){
                setRemainMineNum(remainMineNum - 1)
            }
        }
        
        check_win()
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        if(board[x][y].value === '💣'){
            setGameOver(true)
            setWin(false)
            setContext("CONGRATS, U LOSE💥!!!")
            board[x][y].revealed = true
        }
        else if(board[x][y].flagged) return
        else{
            // const temp_reveal = revealed(board[x][y], x, y, nonMineCount)
            board[x][y].revealed = true
            setNonMineCount(nonMineCount - 1)
        }
        
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
    };

    var rowIdx = -1
    var colIdx = -1

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                <div className='boardContainer'>
                    <Dashboard remainFlagNum={remainFlagNum}/>
                    {
                        board.map((item) => {
                            {rowIdx += 1}
                            {colIdx = -1}
                            return <div className='row' id={'row' + rowIdx}>
                                {
                                    item.map((items) =>{
                                        {colIdx += 1}
                                        return <Cell rowIdx={rowIdx} colIdx={colIdx} detail={items} updateFlag={updateFlag} revealCell={revealCell}/>
                                    })
                                }
                            </div>
                        })
                    }
                    
                </div>
                <div>{context}</div>

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}

                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                
            </div>
        </div>
    );



}

export default Board