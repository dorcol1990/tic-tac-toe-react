import React, { useState } from 'react'
import Square from './Square'

const Board = () => {

    function calculateWinner(squares){
        const lines = [
            [0,1,2], [3,4,5], [6,7,8],  //rows
            [0,3,6], [1,4,7], [2,5,8],  //columns
            [0,4,8], [2,4,6]            //diagonals
        ];

        for (let line of lines){
            const [a,b,c] = line;

            if (squares[a] && squares[a] === squares[b] && squares[a]=== squares[c]){
                return squares[a]
            }
        }
        return null;
    }

    
    const initialSquares = Array(9).fill(null)
    const [squares, setSquares] = useState(initialSquares)
    const [xIsNext, setXIsNext] = useState(true)

    const handleClickEvent = (i)=>{
        const newSquares = [...squares];

        const winnerDeclared = Boolean(calculateWinner(squares));
        const squareFilled = Boolean(squares[i])
        if (winnerDeclared || squareFilled){
            return
        }

        newSquares[i] = xIsNext ? "X" : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }
    const winner = calculateWinner(squares);
    const status = winner ? `Winner is: ${winner}` :
      `Next player is: ${xIsNext ? "X" : "O"}` 

    const renderSquare = (i)=>{
        return (
            <Square value={squares[i]}
            onClickEvent = {()=>{handleClickEvent(i)}}
            />
        )
    }

    return (
        <div>
            <div className='status'>{status}</div>
            <div className='board'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='board'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='board'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

export default Board
