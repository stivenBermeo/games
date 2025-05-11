import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

function TicTacToe () {
  const boardInitialStateGen = () => JSON.parse(JSON.stringify([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]));
  const [turn, setTurn] = useState(true)
  const [board, setBoard] = useState(boardInitialStateGen())
  const [isSinglePlayer, setIsSinglePlayer] = useState(true)

  useEffect(()=>{
    if (JSON.stringify(board) !== JSON.stringify(boardInitialStateGen())) {
      checkBoard()
    }
  }, [board])

  useEffect(()=>{
    if (JSON.stringify(board) !== JSON.stringify(boardInitialStateGen())) {
      if (isSinglePlayer && !turn) {
        setTimeout(makeComputerMove, 700)
      }
    }
  }, [turn])


  function resetBoard() {
    setBoard(boardInitialStateGen())
    setTurn(true)
  }

  function checkBoard() {
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

    const winnerValue = turn ? 'truetruetrue' : 'falsefalsefalse';

    if (combinations.includes(winnerValue)) {
      toast(`${turn ? 'X' : 'O' } Wins!`)
      return resetBoard()
    }

    const emptyCells = getEmptyCells()
    if (emptyCells.length === 0) {
      toast(`Stalemate!`)
      return resetBoard()
    }
    setTurn(!turn)
  }

  function getEmptyCells() {
    const emptyCells = []

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[x][y] === null) emptyCells.push([x, y])
      }
    }

    return emptyCells
  }

  function makeComputerMove() {
    const emptyCells = getEmptyCells()
    const [x, y] =  emptyCells[Math.floor(Math.random() * emptyCells.length)]
    markCell(x, y, true)
  }

  function markCell(x,y) {
    if (board[x][y] !== null) {
      toast('Cell has been selected already', { type: 'error' })
      return
    }

    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[x][y] = turn

    setBoard(newBoard)
  }

  function toggleSinglePlayer() {
    resetBoard()
    setIsSinglePlayer(!isSinglePlayer)
  }

  function Cell({ x, y }) {
    const value = board[x][y];
    return <div className="btn btn-dark d-inline cell align-middle text-center " onClick={()=>{markCell(x,y)}}>
      {value && 'x'}
      {value === false && 'o'}
    </div>
  }

  return <>
    <div className="my-5 tic-tac-toe-score d-flex justify-content-between">
      <div className="btn btn-primary" onClick={toggleSinglePlayer}>Playing: {isSinglePlayer ? 'Single Player' : 'Two players'}</div>
      <div className="btn btn-light">Score: X () O ()</div>
    </div>
    <div className="tic-tac-toe bg-dark my-1">
      <div className="d-flex row justify-content-center">
        <Cell x={0} y={0}/>
        <Cell x={0} y={1}/>
        <Cell x={0} y={2}/>
      </div>
      <div className="d-flex row justify-content-center">
        <Cell x={1} y={0}/>
        <Cell x={1} y={1}/>
        <Cell x={1} y={2}/>
      </div>
      <div className="d-flex row justify-content-center">
        <Cell x={2} y={0}/>
        <Cell x={2} y={1}/>
        <Cell x={2} y={2}/>
      </div>
    </div>
  </>

}


export default TicTacToe