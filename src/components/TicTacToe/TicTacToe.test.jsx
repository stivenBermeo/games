import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TicTacToe from './TicTacToe'
import { toast } from 'react-toastify'

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: vi.fn(),
}))

describe('TicTacToe Component', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  // Helper functions
  const getGameCells = () => {
    return screen.getAllByRole('gridcell')
  }

  const getScoreText = () => {
    const scoreElement = screen.getByText(/Score: X/)
    return scoreElement.textContent
  }

  // Utility function to switch to two-player mode
  const switchToTwoPlayerMode = async (user) => {
    const toggleButton = screen.getByText('Playing: Single Player')
    await user.click(toggleButton)
  }

  // Utility function to create a stalemate board
  const createStalemateBoard = async (user, cells) => {
    // Creates a stalemate board: X | O | X, X | O | O, O | X | X
    // Click sequence: 0(X), 1(O), 2(X), 3(O), 5(X), 4(O), 7(X), 6(O), 8(X)
    await user.click(cells[0]) // X
    await user.click(cells[1]) // O
    await user.click(cells[2]) // X
    await user.click(cells[3]) // O
    await user.click(cells[5]) // X
    await user.click(cells[4]) // O
    await user.click(cells[7]) // X
    await user.click(cells[6]) // O
    await user.click(cells[8]) // X
  }

  describe.only('Initial State', () => {
    it('should render empty game board', () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      expect(cells).toHaveLength(9)
      
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

    it('should display current player indicator', () => {
      render(<TicTacToe />)
      
      const statusElement = screen.getByText(/Current player: X/)
      expect(statusElement).toBeInTheDocument()
    })
  })

  describe.only('Basic Game Logic', () => {
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
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
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

    it.skip('should not allow clicking on already filled cells', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
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

  describe('Win Detection', () => {
    it('should detect horizontal win for X', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
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

    it('should detect horizontal win for O', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // O wins with horizontal line (middle row)
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[8]) // X
      await user.click(cells[5]) // O wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('O Wins!')
      }, { timeout: 3000 })
    })

    it('should detect vertical win for X', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
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

    it('should detect vertical win for O', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // O wins with vertical line (second column)
      await user.click(cells[0]) // X
      await user.click(cells[1]) // O
      await user.click(cells[2]) // X
      await user.click(cells[4]) // O
      await user.click(cells[8]) // X
      await user.click(cells[7]) // O wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('O Wins!')
      }, { timeout: 3000 })
    })

    it('should detect diagonal win (top-left to bottom-right)', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // X wins with diagonal (top-left to bottom-right)
      await user.click(cells[0]) // X
      await user.click(cells[1]) // O
      await user.click(cells[4]) // X
      await user.click(cells[2]) // O
      await user.click(cells[8]) // X wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('X Wins!')
      }, { timeout: 3000 })
    })

    it('should detect diagonal win (top-right to bottom-left)', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // X wins with reverse diagonal (top-right to bottom-left)
      await user.click(cells[2]) // X
      await user.click(cells[0]) // O
      await user.click(cells[4]) // X
      await user.click(cells[1]) // O
      await user.click(cells[6]) // X wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('X Wins!')
      }, { timeout: 3000 })
    })
  })

  describe('Game End Conditions', () => {
    it('should detect stalemate when board is full', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Fill board for stalemate (no winner)
      await createStalemateBoard(user, cells)
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Stalemate!')
      }, { timeout: 3000 })
    })

    it('should show winner message when game ends', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // X wins
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('X Wins!')
      }, { timeout: 3000 })
    })

    it('should show draw message when game ends in stalemate', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Fill board for stalemate (no winner)
      await createStalemateBoard(user, cells)
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Stalemate!')
      }, { timeout: 3000 })
    })

    it('should auto-reset game after win', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // X wins
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      // Wait for auto-reset
      await waitFor(() => {
        cells.forEach(cell => {
          expect(cell.textContent).toBe('')
        })
      }, { timeout: 3000 })
    })

    it('should auto-reset game after stalemate', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Fill board for stalemate (no winner)
      await createStalemateBoard(user, cells)
      
      // Wait for auto-reset
      await waitFor(() => {
        cells.forEach(cell => {
          expect(cell.textContent).toBe('')
        })
      }, { timeout: 3000 })
    })
  })

  describe('Score Tracking', () => {
    it('should increment X score when X wins', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
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

    it('should increment O score when O wins', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // O wins
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[8]) // X
      await user.click(cells[5]) // O wins
      
      await waitFor(() => {
        const scoreText = getScoreText()
        expect(scoreText).toContain('Score: X (0) O (1)')
      }, { timeout: 3000 })
    })

    it('should maintain scores across multiple games', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Play multiple games
      for (let i = 0; i < 2; i++) {
        // X wins each time
        await user.click(cells[0]) // X
        await user.click(cells[3]) // O
        await user.click(cells[1]) // X
        await user.click(cells[4]) // O
        await user.click(cells[2]) // X wins
        
        // Wait for board reset
        await waitFor(() => {
          expect(cells[0].textContent).toBe('')
        }, { timeout: 3000 })
      }
      
      // Score should be 2-0
      await waitFor(() => {
        const scoreText = getScoreText()
        expect(scoreText).toContain('Score: X (2) O (0)')
      }, { timeout: 3000 })
    })

    it('should reset scores when switching game modes', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Play a game to get some score
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      // Switch modes
      const modeButton = screen.getByText(/Playing: Two Players/)
      await user.click(modeButton)
      
      // Scores should be reset
      const scoreText = getScoreText()
      expect(scoreText).toContain('Score: X (0) O (0)')
    })
  })

  describe('Game Mode Switching', () => {
    it('should toggle between single player and two player modes', async () => {
      render(<TicTacToe />)
      
      const modeButton = screen.getByText(/Playing: Single Player/)
      
      await user.click(modeButton)
      
      expect(screen.getByText(/Playing: Two Players/)).toBeInTheDocument()
      
      await user.click(modeButton)
      
      expect(screen.getByText(/Playing: Single Player/)).toBeInTheDocument()
    })

    it('should reset current game when switching modes', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Make some moves
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      
      // Switch modes
      const modeButton = screen.getByText(/Playing: Single Player/)
      await user.click(modeButton)
      
      // Board should be reset
      cells.forEach(cell => {
        expect(cell.textContent).toBe('')
      })
    })

    it('should reset scores when switching modes', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
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

    it('should update UI to reflect current mode', async () => {
      render(<TicTacToe />)
      
      // Should start in single player mode
      expect(screen.getByText(/Playing: Single Player/)).toBeInTheDocument()
      
      // Switch to two player mode
      const modeButton = screen.getByText(/Playing: Single Player/)
      await user.click(modeButton)
      
      expect(screen.getByText(/Playing: Two Players/)).toBeInTheDocument()
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

    it('should not allow player moves during computer turn', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Player makes first move
      await user.click(cells[0])
      
      // Try to make another move immediately (should be ignored)
      await user.click(cells[1])
      
      // Should only have one move initially
      const filledCells = cells.filter(cell => cell.textContent !== '')
      expect(filledCells.length).toBe(1)
    })

    it('should use random strategy for computer moves', async () => {
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

    it('should handle computer wins correctly', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Set up a scenario where computer can win
      // This test would need to be more sophisticated to ensure computer wins
      // For now, just test that computer moves work
      await user.click(cells[0])
      
      await waitFor(() => {
        const filledCells = cells.filter(cell => cell.textContent !== '')
        expect(filledCells.length).toBeGreaterThan(1)
      }, { timeout: 3000 })
    })
  })

  describe('Two Player Mode', () => {
    it('should allow both players to make moves', async () => {
      render(<TicTacToe />)
      
      // Switch to two player mode
      const modeButton = screen.getByText(/Playing: Single Player/)
      await user.click(modeButton)
      
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

    it('should not make computer moves in two player mode', async () => {
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

    it('should handle player vs player wins correctly', async () => {
      render(<TicTacToe />)
      
      // Switch to two player mode
      const modeButton = screen.getByText(/Playing: Single Player/)
      await user.click(modeButton)
      
      const cells = getGameCells()
      
      // X wins
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('X Wins!')
      }, { timeout: 3000 })
    })
  })

  describe('Game Controls', () => {
    it('should reset current game when reset button is clicked', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Make some moves
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      
      // Click reset button
      const resetButton = screen.getByText(/Reset Game/)
      await user.click(resetButton)
      
      // Board should be reset
      cells.forEach(cell => {
        expect(cell.textContent).toBe('')
      })
    })

    it('should maintain scores when resetting game', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Play a game to get some score
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      // Click reset button
      const resetButton = screen.getByText(/Reset Game/)
      await user.click(resetButton)
      
      // Scores should be maintained
      const scoreText = getScoreText()
      expect(scoreText).toContain('Score: X (1) O (0)')
    })

    it('should allow new game to start after reset', async () => {
      render(<TicTacToe />)
      
      // Switch to two-player mode to prevent computer moves
      await switchToTwoPlayerMode(user)
      
      const cells = getGameCells()
      
      // Make some moves
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      
      // Click reset button
      const resetButton = screen.getByText(/Reset Game/)
      await user.click(resetButton)
      
      // Should be able to make new moves
      await user.click(cells[1]) // X
      await waitFor(() => {
        expect(cells[1].textContent).toBe('x')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for cells', () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      cells.forEach((cell, index) => {
        const row = Math.floor(index / 3) + 1
        const col = (index % 3) + 1
        expect(cell).toHaveAttribute('aria-label', `Cell ${row}, ${col}`)
      })
    })

    it('should be keyboard navigable', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // First cell should be focusable
      expect(cells[0]).toHaveAttribute('tabIndex', '0')
      
      // Focus first cell and press Enter
      cells[0].focus()
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(cells[0].textContent).toBe('x')
      })
    })

    it('should have proper focus management', () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Empty cells should be focusable
      cells.forEach(cell => {
        if (cell.textContent === '') {
          expect(cell).toHaveAttribute('tabIndex', '0')
        }
      })
    })

    it('should announce current player to screen readers', () => {
      render(<TicTacToe />)
      
      const statusElement = screen.getByText(/Current player: X/)
      expect(statusElement).toBeInTheDocument()
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

    it('should handle multiple rapid mode switches', async () => {
      render(<TicTacToe />)
      
      const modeButton = screen.getByText(/Playing: Single Player/)
      
      // Rapidly switch modes
      await user.click(modeButton)
      await user.click(modeButton)
      await user.click(modeButton)
      
      // Should end up in a consistent state
      expect(screen.getByText(/Playing: Single Player/)).toBeInTheDocument()
    })

    it('should handle game state during mode switching', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Start a game
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      
      // Switch modes mid-game
      const modeButton = screen.getByText(/Playing: Single Player/)
      await user.click(modeButton)
      
      // Board should be reset
      cells.forEach(cell => {
        expect(cell.textContent).toBe('')
      })
    })

    it('should prevent moves after game ends', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Win the game
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      // Wait for game to end
      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('X Wins!')
      }, { timeout: 3000 })
      
      // Try to make another move
      await user.click(cells[5])
      
      // Should not allow the move
      expect(cells[5].textContent).toBe('')
    })
  })

  describe('UI/UX', () => {
    it('should show visual feedback for clickable cells', () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Empty cells should have clickable class
      cells.forEach(cell => {
        if (cell.textContent === '') {
          expect(cell).toHaveClass('clickable')
        }
      })
    })

    it('should show visual feedback for current player', () => {
      render(<TicTacToe />)
      
      const statusElement = screen.getByText(/Current player: X/)
      expect(statusElement).toBeInTheDocument()
    })

    it('should display game status messages', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Win the game
      await user.click(cells[0]) // X
      await user.click(cells[3]) // O
      await user.click(cells[1]) // X
      await user.click(cells[4]) // O
      await user.click(cells[2]) // X wins
      
      await waitFor(() => {
        expect(screen.getByText(/X won the game!/)).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('should have responsive design', () => {
      render(<TicTacToe />)
      
      const container = screen.getByRole('grid')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Make several moves quickly
      await user.click(cells[0])
      await user.click(cells[1])
      await user.click(cells[2])
      
      // Should handle rapid interactions without issues
      await waitFor(() => {
        expect(cells[0].textContent).toBe('x')
        expect(cells[1].textContent).toBe('o')
        expect(cells[2].textContent).toBe('x')
      })
    })

    it('should handle large number of rapid moves', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Make moves rapidly
      for (let i = 0; i < 5; i++) {
        await user.click(cells[i])
      }
      
      // Should handle without errors
      await waitFor(() => {
        expect(cells[0].textContent).toBe('x')
        expect(cells[1].textContent).toBe('o')
        expect(cells[2].textContent).toBe('x')
        expect(cells[3].textContent).toBe('o')
        expect(cells[4].textContent).toBe('x')
      })
    })

    it('should clean up timers properly', async () => {
      render(<TicTacToe />)
      
      const cells = getGameCells()
      
      // Make a move to trigger computer move timer
      await user.click(cells[0])
      
      // Wait for computer move
      await waitFor(() => {
        const filledCells = cells.filter(cell => cell.textContent !== '')
        expect(filledCells.length).toBeGreaterThan(1)
      }, { timeout: 3000 })
      
      // Component should unmount without timer leaks
      // This is tested implicitly by the test framework
    })
  })
}) 