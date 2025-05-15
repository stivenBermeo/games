import { useState } from 'react'
import './sudoku.css'

const Sudoku = () => {

  const [selectedCell, setSelectedCell] = useState([0, 0])


  const selectCell = (x, y) => {
    setSelectedCell([x, y])
  }


  const Cell = ({ x, y }) => {
    const [selectedRow, selectedColumn] = selectedCell;

    const className = `sudoku-cell ${(selectedRow === x || selectedColumn === y) && 'selected-section'} ${(selectedRow === x && selectedColumn === y) && 'selected-cell'}`

    return <div className={className} data-x={x} data-y={y} onClick={() => {selectCell(x, y)}}></div>
  }

  return <>
    <div className='sudoku'>
      <div className="sudoku-row">
        <Cell x={1} y={1} />
        <Cell x={1} y={2} />
        <Cell x={1} y={3} />
        <Cell x={1} y={4} />
        <Cell x={1} y={5} />
        <Cell x={1} y={6} />
        <Cell x={1} y={7} />
        <Cell x={1} y={8} />
        <Cell x={1} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={2} y={1} />
        <Cell x={2} y={2} />
        <Cell x={2} y={3} />
        <Cell x={2} y={4} />
        <Cell x={2} y={5} />
        <Cell x={2} y={6} />
        <Cell x={2} y={7} />
        <Cell x={2} y={8} />
        <Cell x={2} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={3} y={1} />
        <Cell x={3} y={2} />
        <Cell x={3} y={3} />
        <Cell x={3} y={4} />
        <Cell x={3} y={5} />
        <Cell x={3} y={6} />
        <Cell x={3} y={7} />
        <Cell x={3} y={8} />
        <Cell x={3} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={4} y={1} />
        <Cell x={4} y={2} />
        <Cell x={4} y={3} />
        <Cell x={4} y={4} />
        <Cell x={4} y={5} />
        <Cell x={4} y={6} />
        <Cell x={4} y={7} />
        <Cell x={4} y={8} />
        <Cell x={4} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={5} y={1} />
        <Cell x={5} y={2} />
        <Cell x={5} y={3} />
        <Cell x={5} y={4} />
        <Cell x={5} y={5} />
        <Cell x={5} y={6} />
        <Cell x={5} y={7} />
        <Cell x={5} y={8} />
        <Cell x={5} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={6} y={1} />
        <Cell x={6} y={2} />
        <Cell x={6} y={3} />
        <Cell x={6} y={4} />
        <Cell x={6} y={5} />
        <Cell x={6} y={6} />
        <Cell x={6} y={7} />
        <Cell x={6} y={8} />
        <Cell x={6} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={7} y={1} />
        <Cell x={7} y={2} />
        <Cell x={7} y={3} />
        <Cell x={7} y={4} />
        <Cell x={7} y={5} />
        <Cell x={7} y={6} />
        <Cell x={7} y={7} />
        <Cell x={7} y={8} />
        <Cell x={7} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={8} y={1} />
        <Cell x={8} y={2} />
        <Cell x={8} y={3} />
        <Cell x={8} y={4} />
        <Cell x={8} y={5} />
        <Cell x={8} y={6} />
        <Cell x={8} y={7} />
        <Cell x={8} y={8} />
        <Cell x={8} y={9} />
      </div>
      <div className="sudoku-row">
        <Cell x={9} y={1} />
        <Cell x={9} y={2} />
        <Cell x={9} y={3} />
        <Cell x={9} y={4} />
        <Cell x={9} y={5} />
        <Cell x={9} y={6} />
        <Cell x={9} y={7} />
        <Cell x={9} y={8} />
        <Cell x={9} y={9} />
      </div>
    </div>
  </>

}

export default Sudoku