import React from 'react'
import { PLAYERS } from '../hooks/useTicTacToe'

const GameControls = ({ 
  scores, 
  currentPlayer, 
  gameStatus, 
  isSinglePlayer, 
  onToggleMode, 
  onResetGame 
}) => {
  const getStatusMessage = () => {
    if (gameStatus === 'win') {
      return `Winner: ${currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X}`
    }
    if (gameStatus === 'draw') {
      return 'Game ended in a draw'
    }
    return `Current player: ${currentPlayer}`
  }

  return (
    <div className="my-5 tic-tac-toe-score d-flex justify-content-between align-items-center">
      <div className="d-flex gap-2">
        <button 
          className="btn btn-primary" 
          onClick={onToggleMode}
          aria-label={`Switch to ${isSinglePlayer ? 'two player' : 'single player'} mode`}
        >
          Playing: {isSinglePlayer ? 'Single Player' : 'Two Players'}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={onResetGame}
          aria-label="Reset current game"
        >
          Reset Game
        </button>
      </div>
      
      <div className="d-flex flex-column align-items-end">
        <div className="btn btn-light mb-2">
          Score: {PLAYERS.X} ({scores[PLAYERS.X]}) {PLAYERS.O} ({scores[PLAYERS.O]})
        </div>
        <div className="text-muted small" id={`current-player-${currentPlayer}`}>
          {getStatusMessage()}
        </div>
      </div>
    </div>
  )
}

export default GameControls 