/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.css'
import Board from './Components/Board/Board'
import Heading from './Components/Heading/Heading'

import { useSelector } from 'react-redux/es/exports'
import { rootState } from './Components/interface'

function App() {
  const board = useSelector((state: rootState)=> state.board.board)
  return (
    <div className="App">
      <Heading type="h1" text="Wordle"/>
      <Heading type="subtitle" text="Another Wordle Clone"/>
      <div className="board-container">
        <Board board={ board }/>
      </div>
    </div>
  )
}

export default App
