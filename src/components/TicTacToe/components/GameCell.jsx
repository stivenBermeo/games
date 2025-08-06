import React from 'react'

const GameCell = ({ value, row, col, onClick, currentPlayer, gameStatus }) => {
  const handleClick = () => {
    if (gameStatus === 'playing') {
      onClick(row, col)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const getDisplayValue = () => {
    if (!value) return ''
    return value.toLowerCase()
  }

  const getCellClass = () => {
    const baseClass = "btn btn-dark d-inline cell align-middle text-center"
    const isClickable = gameStatus === 'playing' && !value
    return `${baseClass} ${isClickable ? 'clickable' : 'disabled'}`
  }

  return (
    <div
      className={getCellClass()}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={gameStatus === 'playing' && !value ? 0 : -1}
      role="gridcell"
      aria-label={`Cell ${row + 1}, ${col + 1}${value ? ` - ${value}` : ''}`}
      aria-describedby={gameStatus === 'playing' ? `current-player-${currentPlayer}` : undefined}
    >
      {getDisplayValue()}
    </div>
  )
}

export default GameCell 