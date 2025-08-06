import React, { useEffect, useState } from 'react'
import { useTicTacToe } from './hooks/useTicTacToe'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import './TicTacToe.css'

const TicTacToe = () => {
  const [isSinglePlayer, setIsSinglePlayer] = useState(true)
  
  const {
    board,
    currentPlayer,
    scores,
    gameStatus,
    winner,
    emptyCells,
    isGameOver,
    makeMove,
    resetGame,
    resetScores,
    makeComputerMove,
    switchGameMode
  } = useTicTacToe()

  // Handle computer moves in single player mode
  useEffect(() => {
    if (isSinglePlayer && currentPlayer === 'O' && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        makeComputerMove()
      }, 700)
      
      return () => clearTimeout(timer)
    }
  }, [currentPlayer, gameStatus, isSinglePlayer, makeComputerMove])

  // Auto-reset game when game ends
  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        resetGame()
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [isGameOver, resetGame])

  const handleCellClick = (row, col) => {
    if (isSinglePlayer && currentPlayer === 'O') {
      return // Don't allow clicks during computer's turn
    }
    makeMove(row, col)
  }

  const handleToggleMode = () => {
    const newMode = !isSinglePlayer
    setIsSinglePlayer(newMode)
    switchGameMode(newMode)
  }

  const handleResetGame = () => {
    resetGame()
  }

  return (
    <div className="tic-tac-toe-container">
      <GameControls
        scores={scores}
        currentPlayer={currentPlayer}
        gameStatus={gameStatus}
        isSinglePlayer={isSinglePlayer}
        onToggleMode={handleToggleMode}
        onResetGame={handleResetGame}
      />
      
      <GameBoard
        board={board}
        onCellClick={handleCellClick}
        currentPlayer={currentPlayer}
        gameStatus={gameStatus}
      />
      
      {isGameOver && (
        <div className="text-center mt-3">
          <div className="alert alert-info">
            {winner ? `${winner} won the game!` : 'Game ended in a draw!'}
          </div>
        </div>
      )}
    </div>
  )
}

export default TicTacToe