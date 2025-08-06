import { useState, useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'

// Constants
export const PLAYERS = {
  X: 'X',
  O: 'O'
}

export const GAME_STATUS = {
  PLAYING: 'playing',
  WIN: 'win',
  DRAW: 'draw'
}

export const BOARD_SIZE = 3

// Utility functions
const createEmptyBoard = () => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))

const checkWinner = (board, player) => {
  const playerValue = player === PLAYERS.X ? 'XXX' : 'OOO'
  
  // Check rows
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = board[i].map(cell => cell || '').join('')
    if (row === playerValue) return true
  }
  
  // Check columns
  for (let i = 0; i < BOARD_SIZE; i++) {
    const col = board.map(row => row[i] || '').join('')
    if (col === playerValue) return true
  }
  
  // Check diagonals
  // Diagonal 1: top-left to bottom-right (0,0 -> 1,1 -> 2,2)
  const diagonal1 = board[0][0] + board[1][1] + board[2][2]
  // Diagonal 2: top-right to bottom-left (0,2 -> 1,1 -> 2,0)
  const diagonal2 = board[0][2] + board[1][1] + board[2][0]
  
  return diagonal1 === playerValue || diagonal2 === playerValue
}

const isBoardFull = (board) => {
  return board.every(row => row.every(cell => cell !== null))
}

const getEmptyCells = (board) => {
  const emptyCells = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === null) {
        emptyCells.push([i, j])
      }
    }
  }
  return emptyCells
}

export const useTicTacToe = () => {
  // State
  const [board, setBoard] = useState(createEmptyBoard())
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.X)
  const [scores, setScores] = useState({ [PLAYERS.X]: 0, [PLAYERS.O]: 0 })
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING)
  const [winner, setWinner] = useState(null)

  // Memoized values
  const emptyCells = useMemo(() => getEmptyCells(board), [board])
  const isGameOver = useMemo(() => gameStatus !== GAME_STATUS.PLAYING, [gameStatus])

  // Game logic functions
  const makeMove = useCallback((row, col) => {
    if (board[row][col] !== null || isGameOver) {
      toast('Cell has been selected already', { type: 'error' })
      return false
    }

    const newBoard = board.map(row => [...row])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    // Check for winner
    if (checkWinner(newBoard, currentPlayer)) {
      setGameStatus(GAME_STATUS.WIN)
      setWinner(currentPlayer)
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }))
      toast(`${currentPlayer} Wins!`)
      return true
    }

    // Check for draw
    if (isBoardFull(newBoard)) {
      setGameStatus(GAME_STATUS.DRAW)
      toast('Stalemate!')
      return true
    }

    // Switch player
    setCurrentPlayer(prev => prev === PLAYERS.X ? PLAYERS.O : PLAYERS.X)
    return true
  }, [board, currentPlayer, isGameOver])

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard())
    setCurrentPlayer(PLAYERS.X)
    setGameStatus(GAME_STATUS.PLAYING)
    setWinner(null)
  }, [])

  const resetScores = useCallback(() => {
    setScores({ [PLAYERS.X]: 0, [PLAYERS.O]: 0 })
  }, [])

  const makeComputerMove = useCallback(() => {
    if (emptyCells.length === 0) return

    const randomIndex = Math.floor(Math.random() * emptyCells.length)
    const [row, col] = emptyCells[randomIndex]
    makeMove(row, col)
  }, [emptyCells, makeMove])

  const switchGameMode = useCallback((newIsSinglePlayer) => {
    resetGame()
    resetScores()
    return newIsSinglePlayer
  }, [resetGame, resetScores])

  return {
    // State
    board,
    currentPlayer,
    scores,
    gameStatus,
    winner,
    emptyCells,
    isGameOver,
    
    // Actions
    makeMove,
    resetGame,
    resetScores,
    makeComputerMove,
    switchGameMode
  }
} 