import { useState } from 'react'
import './sudoku.css'

const Sudoku = () => {
  const getFreshBoard = (from = null) => JSON.parse(JSON.stringify(from ?? [
    new Array(9),
    new Array(9),
    new Array(9),
    new Array(9),
    new Array(9),
    new Array(9),
    new Array(9),
    new Array(9),
    new Array(9),
  ]));

  const [selectedCell, setSelectedCell] = useState([0, 0])
  const [board, setBoard] = useState(getFreshBoard())


  const selectCell = (x, y) => {
    setSelectedCell([x, y])
  }


  const Cell = ({ x, y }) => {
    const [selectedRow, selectedColumn] = selectedCell;

    const boardValue = board[x][y]

    const className = `sudoku-cell ${(selectedRow === x || selectedColumn === y) && 'selected-section'} ${(selectedRow === x && selectedColumn === y) && 'selected-cell'}`

    return <div className={className} data-x={x} data-y={y} onClick={() => {selectCell(x, y)}}>{boardValue && boardValue}</div>
  }

  const fillCell = (value) => {
    const virtualBoard = getFreshBoard(board)
    const [selectedRow, selectedColumn] = selectedCell;
    virtualBoard[selectedRow][selectedColumn] = value
    setBoard(virtualBoard)
  }

  return <>
    <div className='sudoku'>
      <div className="sudoku-row">
        <Cell x={0} y={0} />
        <Cell x={0} y={1} />
        <Cell x={0} y={2} />
        <Cell x={0} y={3} />
        <Cell x={0} y={4} />
        <Cell x={0} y={5} />
        <Cell x={0} y={6} />
        <Cell x={0} y={7} />
        <Cell x={0} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={1} y={0} />
        <Cell x={1} y={1} />
        <Cell x={1} y={2} />
        <Cell x={1} y={3} />
        <Cell x={1} y={4} />
        <Cell x={1} y={5} />
        <Cell x={1} y={6} />
        <Cell x={1} y={7} />
        <Cell x={1} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={2} y={0} />
        <Cell x={2} y={1} />
        <Cell x={2} y={2} />
        <Cell x={2} y={3} />
        <Cell x={2} y={4} />
        <Cell x={2} y={5} />
        <Cell x={2} y={6} />
        <Cell x={2} y={7} />
        <Cell x={2} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={3} y={0} />
        <Cell x={3} y={1} />
        <Cell x={3} y={2} />
        <Cell x={3} y={3} />
        <Cell x={3} y={4} />
        <Cell x={3} y={5} />
        <Cell x={3} y={6} />
        <Cell x={3} y={7} />
        <Cell x={3} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={4} y={0} />
        <Cell x={4} y={1} />
        <Cell x={4} y={2} />
        <Cell x={4} y={3} />
        <Cell x={4} y={4} />
        <Cell x={4} y={5} />
        <Cell x={4} y={6} />
        <Cell x={4} y={7} />
        <Cell x={4} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={5} y={0} />
        <Cell x={5} y={1} />
        <Cell x={5} y={2} />
        <Cell x={5} y={3} />
        <Cell x={5} y={4} />
        <Cell x={5} y={5} />
        <Cell x={5} y={6} />
        <Cell x={5} y={7} />
        <Cell x={5} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={6} y={0} />
        <Cell x={6} y={1} />
        <Cell x={6} y={2} />
        <Cell x={6} y={3} />
        <Cell x={6} y={4} />
        <Cell x={6} y={5} />
        <Cell x={6} y={6} />
        <Cell x={6} y={7} />
        <Cell x={6} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={7} y={0} />
        <Cell x={7} y={1} />
        <Cell x={7} y={2} />
        <Cell x={7} y={3} />
        <Cell x={7} y={4} />
        <Cell x={7} y={5} />
        <Cell x={7} y={6} />
        <Cell x={7} y={7} />
        <Cell x={7} y={8} />
      </div>
      <div className="sudoku-row">
        <Cell x={8} y={0} />
        <Cell x={8} y={1} />
        <Cell x={8} y={2} />
        <Cell x={8} y={3} />
        <Cell x={8} y={4} />
        <Cell x={8} y={5} />
        <Cell x={8} y={6} />
        <Cell x={8} y={7} />
        <Cell x={8} y={8} />
      </div>
      
    </div>
    <div className='input-keys d-flex justify-content-center'>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(1)}}>1</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(2)}}>2</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(3)}}>3</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(4)}}>4</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(5)}}>5</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(6)}}>6</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(7)}}>7</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(8)}}>8</div>
      <div className='btn btn-small btn-light' onClick={() => {fillCell(9)}}>9</div>
    </div>
  </>

}

export default Sudoku