import './sudoku.css'

const Sudoku = () => {

  const Cell = ({ x, y }) => {

    return <div className="sudoku-cell" data-x={x} data-y={y}></div>
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
    </div>
  </>

}

export default Sudoku