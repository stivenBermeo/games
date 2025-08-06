import { describe, it, expect } from 'vitest'

// Utility functions extracted from TicTacToe component for testing
const boardInitialStateGen = () => JSON.parse(JSON.stringify([
  [null, null, null],
  [null, null, null],
  [null, null, null]
]))

const checkBoard = (board, turn) => {
  const combinations = [
    // Horizontals
    `${board[0][0]}${board[0][1]}${board[0][2]}`,
    `${board[1][0]}${board[1][1]}${board[1][2]}`,
    `${board[2][0]}${board[2][1]}${board[2][2]}`,
    // Verticals
    `${board[0][0]}${board[1][0]}${board[2][0]}`,
    `${board[0][1]}${board[1][1]}${board[2][1]}`,
    `${board[0][2]}${board[1][2]}${board[2][2]}`,
    // Diagonals
    `${board[0][0]}${board[1][1]}${board[2][2]}`,
    `${board[2][0]}${board[1][1]}${board[0][2]}`,
  ]

  const winnerValue = turn ? 'truetruetrue' : 'falsefalsefalse'
  return combinations.includes(winnerValue)
}

const getEmptyCells = (board) => {
  const emptyCells = []
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board[x][y] === null) emptyCells.push([x, y])
    }
  }
  return emptyCells
}

const isStalemate = (board) => {
  return getEmptyCells(board).length === 0
}

describe('TicTacToe Utilities', () => {
  describe('boardInitialStateGen', () => {
    it('should create a fresh 3x3 board with null values', () => {
      const board = boardInitialStateGen()
      
      expect(board).toHaveLength(3)
      board.forEach(row => {
        expect(row).toHaveLength(3)
        row.forEach(cell => {
          expect(cell).toBeNull()
        })
      })
    })

    it('should create independent board instances', () => {
      const board1 = boardInitialStateGen()
      const board2 = boardInitialStateGen()
      
      board1[0][0] = 'X'
      
      expect(board1[0][0]).toBe('X')
      expect(board2[0][0]).toBeNull()
    })
  })

  describe('checkBoard', () => {
    it('should detect horizontal win for X (true)', () => {
      const board = [
        [true, true, true],
        [false, null, null],
        [null, null, null]
      ]
      
      expect(checkBoard(board, true)).toBe(true)
    })

    it('should detect horizontal win for O (false)', () => {
      const board = [
        [null, null, null],
        [false, false, false],
        [true, null, null]
      ]
      
      expect(checkBoard(board, false)).toBe(true)
    })

    it('should detect vertical win', () => {
      const board = [
        [true, null, null],
        [true, false, null],
        [true, null, null]
      ]
      
      expect(checkBoard(board, true)).toBe(true)
    })

    it('should detect diagonal win (top-left to bottom-right)', () => {
      const board = [
        [true, null, null],
        [null, true, null],
        [null, null, true]
      ]
      
      expect(checkBoard(board, true)).toBe(true)
    })

    it('should detect reverse diagonal win (top-right to bottom-left)', () => {
      const board = [
        [null, null, true],
        [null, true, null],
        [true, null, null]
      ]
      
      expect(checkBoard(board, true)).toBe(true)
    })

    it('should not detect win when no winning combination exists', () => {
      const board = [
        [true, false, true],
        [false, true, false],
        [null, null, null]
      ]
      
      expect(checkBoard(board, true)).toBe(false)
      expect(checkBoard(board, false)).toBe(false)
    })

    it('should handle mixed board states correctly', () => {
      const board = [
        [true, false, true],
        [false, true, false],
        [true, false, true]
      ]
      
      expect(checkBoard(board, true)).toBe(true)
    })
  })

  describe('getEmptyCells', () => {
    it('should return all cells for empty board', () => {
      const board = boardInitialStateGen()
      const emptyCells = getEmptyCells(board)
      
      expect(emptyCells).toHaveLength(9)
      expect(emptyCells).toEqual([
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
      ])
    })

    it('should return only empty cells for partially filled board', () => {
      const board = [
        [true, null, false],
        [null, true, null],
        [false, null, true]
      ]
      const emptyCells = getEmptyCells(board)
      
      expect(emptyCells).toHaveLength(4)
      expect(emptyCells).toEqual([
        [0, 1], [1, 0], [1, 2], [2, 1]
      ])
    })

    it('should return empty array for full board', () => {
      const board = [
        [true, false, true],
        [false, true, false],
        [true, false, true]
      ]
      const emptyCells = getEmptyCells(board)
      
      expect(emptyCells).toHaveLength(0)
      expect(emptyCells).toEqual([])
    })
  })

  describe('isStalemate', () => {
    it('should return false for empty board', () => {
      const board = boardInitialStateGen()
      expect(isStalemate(board)).toBe(false)
    })

    it('should return false for partially filled board', () => {
      const board = [
        [true, false, true],
        [false, true, null],
        [null, null, null]
      ]
      expect(isStalemate(board)).toBe(false)
    })

    it('should return true for full board', () => {
      const board = [
        [true, false, true],
        [false, true, false],
        [true, false, true]
      ]
      expect(isStalemate(board)).toBe(true)
    })

    it('should return true for full board with no winner', () => {
      const board = [
        [true, false, true],
        [false, true, false],
        [false, true, false]
      ]
      expect(isStalemate(board)).toBe(true)
    })
  })

  describe('Game State Combinations', () => {
    it('should handle winning state with empty cells remaining', () => {
      const board = [
        [true, true, true],
        [false, null, null],
        [null, null, null]
      ]
      
      expect(checkBoard(board, true)).toBe(true)
      expect(getEmptyCells(board)).toHaveLength(5) // 3 filled + 5 empty = 8 total (one cell is false)
      expect(isStalemate(board)).toBe(false)
    })

    it('should handle stalemate state correctly', () => {
      const board = [
        [true, false, true],
        [false, true, false],
        [false, true, false]
      ]
      
      expect(checkBoard(board, true)).toBe(false)
      expect(checkBoard(board, false)).toBe(false)
      expect(getEmptyCells(board)).toHaveLength(0)
      expect(isStalemate(board)).toBe(true)
    })

    it('should handle ongoing game state', () => {
      const board = [
        [true, null, false],
        [null, true, null],
        [null, null, null]
      ]
      
      expect(checkBoard(board, true)).toBe(false)
      expect(checkBoard(board, false)).toBe(false)
      expect(getEmptyCells(board)).toHaveLength(6) // 3 filled + 6 empty = 9 total
      expect(isStalemate(board)).toBe(false)
    })
  })
}) 