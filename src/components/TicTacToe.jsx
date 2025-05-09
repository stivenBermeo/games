import { useState } from "react"
import { toast } from 'react-toastify';

function TicTacToe () {
  const boardInitialState = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const [oddTurn, setOddTurn] = useState(true)
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(boardInitialState)))

  function markCell(x,y) {
    if (board[x][y] !== null) {
      toast('Cell has been selected already', { type: 'error' })
      return
    }

    const newBoard = JSON.parse(JSON.stringify(board))
    newBoard[x][y] = !oddTurn
    
    const combinations = [
      // Horizontals
      `${newBoard[0][0]}${newBoard[0][1]}${newBoard[0][2]}`,
      `${newBoard[1][0]}${newBoard[1][1]}${newBoard[1][2]}`,
      `${newBoard[2][0]}${newBoard[2][1]}${newBoard[2][2]}`,
      // Verticals
      `${newBoard[0][0]}${newBoard[1][0]}${newBoard[2][0]}`,
      `${newBoard[0][1]}${newBoard[1][1]}${newBoard[2][1]}`,
      `${newBoard[0][2]}${newBoard[1][2]}${newBoard[2][2]}`,

      // Diagonals
      `${newBoard[0][0]}${newBoard[1][1]}${newBoard[2][2]}`,
      `${newBoard[2][0]}${newBoard[1][1]}${newBoard[0][2]}`,
    ]

    if (combinations.includes('truetruetrue')) {
      toast('O Wins!')
      return setBoard(JSON.parse(JSON.stringify(boardInitialState)))
    }
    if (combinations.includes('falsefalsefalse')) {
      toast('X Wins!')
      return setBoard(JSON.parse(JSON.stringify(boardInitialState)))
    }

    setBoard(newBoard)
    setOddTurn(!oddTurn)
  }

  function Cell({ x, y }) {
    const value = board[x][y];
    return <div className="btn btn-dark d-inline cell align-middle text-center " onClick={()=>{markCell(x,y)}}>
      {value === true && 'o'}
      {value === false && 'x'}
    </div>
  }

  console.log({ board })
  return <>
    <div className="tic-tac-toe bg-dark mx-auto my-5">
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