import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TicTacToe from './TicTacToe'
import { toast } from 'react-toastify'

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: vi.fn(),
}))

describe('TicTacToe', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  const getGameCells = () => {
    return screen.getAllByText('').filter(element => 
      element.className.includes('cell')
    )
  }

  const getScoreText = () => {
    const scoreElement = screen.getByText(/Score: X/)
    return scoreElement.textContent
  }

  describe('Initial State', () => {
    it('should render the game board with empty cells', () => {
      render(<TicTacToe />)
      
      // Check if all 9 cells are rendered
      const cells = getGameCells()
      expect(cells).toHaveLength(9)
      
      // Check if cells are empty initially
      cells.forEach(cell => {
        expect(cell.textContent).toBe('')
      })
    })

    it('should display initial score as 0 for both players', () => {
      render(<TicTacToe />)
      
      const scoreText = getScoreText()
      expect(scoreText).toContain('Score: X (0) O (0)')
    })

    it('should show single player mode by default', () => {
      render(<TicTacToe />)
      
      const modeButton = screen.getByText(/Playing: Single Player/)
      expect(modeButton).toBeInTheDocument()
    })
  })

  describe('Basic Game Logic', () => {
    it('should allow X to make the first move', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      await user.click(cells[0])
      
      await waitFor(() => {
        expect(cells[0].textContent).toBe('x')
      })
    })

    it('should alternate between X and O players', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // X's turn
      await user.click(cells[0])
      await waitFor(() => {
        expect(cells[0].textContent).toBe('x')
      })
      
      // O's turn
      await user.click(cells[1])
      await waitFor(() => {
        expect(cells[1].textContent).toBe('o')
      })
    })

    it('should not allow clicking on already filled cells', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      await user.click(cells[0])
      await waitFor(() => {
        expect(cells[0].textContent).toBe('x')
      })
      
      // Try to click the same cell again
      await user.click(cells[0])
      
      expect(toast).toHaveBeenCalledWith('Cell has been selected already', { type: 'error' })
      expect(cells[0].textContent).toBe('x') // Should still be 'x'
    })
  })

  describe('Game Mode Switching', () => {
    it('should toggle between single player and two player modes', async () => {
      render(<TicTacToe />)
      
      const modeButton = screen.getByText(/Playing: Single Player/)
      
      await user.click(modeButton)
      
      expect(screen.getByText(/Playing: Two players/)).toBeInTheDocument()
      
      await user.click(modeButton)
      
      expect(screen.getByText(/Playing: Single Player/)).toBeInTheDocument()
    })

    it('should reset scores when switching modes', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Play a game to get some score
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      // Switch modes
      const modeButton = screen.getByText(/Playing: Single Player/)
      await user.click(modeButton)
      
      // Scores should be reset
      const scoreText = getScoreText()
      expect(scoreText).toContain('Score: X (0) O (0)')
    })
  })

  describe('Win Detection - Simple Cases', () => {
    it('should detect horizontal win for X in top row', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // X wins with horizontal line (top row)
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('X Wins!')
      }, { timeout: 3000 })
    })

    it('should detect vertical win for X in first column', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // X wins with vertical line (first column)
      await user.click(cells[0]) // X
      await user.click(cells[1]) // O
      await user.click(cells[3]) // X
      await user.click(cells[2]) // O
      await user.click(cells[6]) // X wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('X Wins!')
      }, { timeout: 3000 })
    })
  })

  describe('Stalemate Detection', () => {
    it('should detect stalemate when board is full', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Fill the board without a winner
      await user.click(cells[0]) // X
      await user.click(cells[1]) // O
      await user.click(cells[2]) // X
      await user.click(cells[3]) // O
      await user.click(cells[4]) // X
      await user.click(cells[5]) // O
      await user.click(cells[6]) // X
      await user.click(cells[7]) // O
      await user.click(cells[8]) // X
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Stalemate!')
      }, { timeout: 3000 })
    })
  })

  describe('Score Tracking', () => {
    it('should increment X score when X wins', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // X wins
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      await waitFor(() => {
        const scoreText = getScoreText()
        expect(scoreText).toContain('Score: X (1) O (0)')
      }, { timeout: 3000 })
    })
  })

  describe('Game Reset', () => {
    it('should reset board after a win', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // X wins
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      // Board should be reset
      await waitFor(() => {
        cells.forEach(cell => {
          expect(cell.textContent).toBe('')
        })
      }, { timeout: 3000 })
    })
  })

  describe('Single Player Mode', () => {
    it('should make computer move after player move', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Player makes first move
      await user.click(cells[0])
      
      // Wait for computer move
      await waitFor(() => {
        const filledCells = cells.filter(cell => cell.textContent !== '')
        expect(filledCells.length).toBeGreaterThan(1)
      }, { timeout: 3000 })
    })

    it('should not make computer move in two player mode', async () => {
      render(<TicTacToe />)
      
      // Switch to two player mode
      const modeButton = screen.getByText(/Playing: Single Player/)
      await user.click(modeButton)
      
      const cells = getGameCells()
      
      // Player makes first move
      await user.click(cells[0])
      
      // Wait a bit to ensure no computer move
      await waitFor(() => {
        const filledCells = cells.filter(cell => cell.textContent !== '')
        expect(filledCells).toHaveLength(1)
      }, { timeout: 3000 })
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid clicking gracefully', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Rapidly click the same cell
      await user.click(cells[0])
      await user.click(cells[0])
      await user.click(cells[0])
      
      await waitFor(() => {
        expect(cells[0].textContent).toBe('x')
      })
      expect(toast).toHaveBeenCalledWith('Cell has been selected already', { type: 'error' })
    })
  })
}) 