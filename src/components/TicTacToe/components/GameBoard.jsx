import React from 'react'
import GameCell from './GameCell'

const GameBoard = ({ board, onCellClick, currentPlayer, gameStatus }) => {
  return (
    <div className="tic-tac-toe bg-dark my-1" role="grid" aria-label="Tic Tac Toe Board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="d-flex row justify-content-center" role="row">
          {row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              row={rowIndex}
              col={colIndex}
              onClick={onCellClick}
              currentPlayer={currentPlayer}
              gameStatus={gameStatus}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameBoard 