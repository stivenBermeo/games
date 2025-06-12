import { useCallback, useEffect, useState } from 'react'
import './sudoku.css'
import { toast } from 'react-toastify';

const getRepeatsInArray = (array) => {
  const repeatedValues = []
  const repeatedIndexes = []

  const joinedRow = array.join(',')
  const duplicatedNumberRegex = /([1-9])(?=.*\1)/g
  const matches = [...joinedRow.matchAll(duplicatedNumberRegex)]
  if (matches.length) {
    matches.forEach(([matchedValue])=>{repeatedValues.push(Number(matchedValue))})
    array.forEach((value, index) => { if (repeatedValues.includes(value)) repeatedIndexes.push(index)})
  }
  return repeatedIndexes
}

const validateRules = (board) => {
  const repeats = []
  const chunkCoords = [
    [0,0],
    [0,3],
    [0,6],
    [3,0],
    [3,3],
    [3,6],
    [6,0],
    [6,3],
    [6,6],
  ]

  for (let i = 0; i < 9; i++) {
    // no repeats on row
    const repeatsInRow = getRepeatsInArray(board[i])
    repeats.push(...repeatsInRow.map(column => `${i},${column}`))

    // no repeats on column
    const repeatsInColumn = getRepeatsInArray((new Array(9)).fill().map((_value, index) => board[index][i]))
    repeats.push(...repeatsInColumn.map(row => `${row},${i}`))

    // no repeats in chunk
    
    const [x, y] = chunkCoords[i]
    const chunkIndexes = [
      [x, y],
      [x, y+1],
      [x, y+2],
      [x+1, y],
      [x+1, y+1],
      [x+1, y+2],
      [x+2, y],
      [x+2, y+1],
      [x+2, y+2],
    ]
    const repeatsInChunk = getRepeatsInArray([...chunkIndexes.map(([x,y])=>board[x][y])])
    repeats.push(...repeatsInChunk.map(i => `${chunkIndexes[i][0]},${chunkIndexes[i][1]}`))
  }

  return repeats
}

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

  const [invalidCells, setInvalidCells] = useState([])
  const [selectedCell, setSelectedCell] = useState([0, 0])
  const [board, setBoard] = useState(null)
  const [solutionBoard, setSolutionBoard] = useState(null)
  const [templateBoard, setTemplateBoard] = useState(null)

  useEffect(()=>{
    // fetch('https://sudoku-api.vercel.app/api/dosuku')
    //   .then(response => response.json())
    //   .then(data => {
    //     const grid = data.newboard.grids[0]
    //     console.log({grid})
    //     setSolutionBoard(grid.solution)
    //     setTemplateBoard(grid.value)
    //     setBoard(grid.value)
    //   })

    const grid = {
      "value": [
          [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
          ],
          [
              7,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
          ],
          [
              5,
              0,
              0,
              0,
              0,
              4,
              0,
              0,
              0
          ],
          [
              0,
              2,
              0,
              0,
              4,
              0,
              0,
              0,
              0
          ],
          [
              0,
              0,
              0,
              9,
              0,
              0,
              0,
              0,
              0
          ],
          [
              3,
              4,
              0,
              0,
              0,
              0,
              1,
              0,
              0
          ],
          [
              0,
              0,
              0,
              0,
              0,
              7,
              4,
              0,
              0
          ],
          [
              9,
              0,
              0,
              0,
              0,
              6,
              0,
              0,
              0
          ],
          [
              0,
              1,
              0,
              4,
              0,
              3,
              0,
              2,
              0
          ]
      ],
      "solution": [
          [
              4,
              3,
              1,
              2,
              5,
              8,
              7,
              6,
              9
          ],
          [
              7,
              6,
              2,
              3,
              1,
              9,
              5,
              4,
              8
          ],
          [
              5,
              9,
              8,
              6,
              7,
              4,
              3,
              1,
              2
          ],
          [
              1,
              2,
              7,
              8,
              4,
              5,
              6,
              9,
              3
          ],
          [
              8,
              5,
              6,
              9,
              3,
              1,
              2,
              7,
              4
          ],
          [
              3,
              4,
              9,
              7,
              6,
              2,
              1,
              8,
              5
          ],
          [
              2,
              8,
              3,
              1,
              9,
              7,
              4,
              5,
              6
          ],
          [
              9,
              7,
              4,
              5,
              2,
              6,
              8,
              3,
              1
          ],
          [
              6,
              1,
              5,
              4,
              8,
              3,
              9,
              2,
              7
          ]
      ],
      "difficulty": "Hard"
    }

    setSolutionBoard(grid.solution)
    setTemplateBoard(grid.value)
    setBoard(grid.value)
  }, [])

  const selectCell = (x, y) => {
    setSelectedCell([x, y])
  }

  const checkBoard = useCallback(() => {
    if (board && solutionBoard) {
      console.log('Checking board')
      if (JSON.stringify(getFreshBoard(solutionBoard)) === JSON.stringify(getFreshBoard(board))) {
        return toast('Success')
      }
      
      const invalidCells = validateRules(board)
      setInvalidCells(invalidCells)
    }
  }, [solutionBoard, board])

  const fillCell = (value) => {
    const [selectedRow, selectedColumn] = selectedCell;
    if (templateBoard?.[selectedRow]?.[selectedColumn]) return
    const virtualBoard = getFreshBoard(board)
    virtualBoard[selectedRow][selectedColumn] = virtualBoard[selectedRow][selectedColumn] === value ? undefined : value
    setBoard(virtualBoard)
  }

  const Cell = ({ x, y }) => {
    const [selectedRow, selectedColumn] = selectedCell;

    const boardValue = board[x][y]
    const templateValue = templateBoard?.[x]?.[y]
    const selectedValue = board[selectedRow][selectedColumn]
    const selectedSectionClass = (selectedRow === x || selectedColumn === y) && 'selected-section'
    const selectedCellClass = (selectedRow === x && selectedColumn === y) && 'selected-cell'
    const selectedValueClass = selectedValue === boardValue && 'selected-value'
    const invalidCellClass = invalidCells.find(coordinate => coordinate === `${x},${y}`) && 'text-danger'

    const className =  invalidCellClass ? invalidCellClass : `${selectedSectionClass} ${selectedCellClass} ${selectedValueClass}`

    return <div className={`sudoku-cell ${Boolean(templateValue) && 'template-cell'} ${className}`} data-x={x} data-y={y} onClick={() => {selectCell(x, y)}}>{Boolean(boardValue) &&  boardValue}</div>
  }


  useEffect(()=>{
      checkBoard()
  }, [board, checkBoard])

  return board ? <>
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
  </> : <div/>

}

export default Sudoku