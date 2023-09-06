import { useSelector, useDispatch } from "react-redux";
import Key from "../Key/Key";
import "./Keyboard.css";

import wordList from "../../word.json";
import { rootState } from "../interface";
import { setBoard, desPos, incRow } from "../../redux/boardSlice";


const Keyboard = () => {
  const rows: string[] = [
    "q w e r t y u i o p",
    "a s d f g h j k l",
    "z x c v b n m",
  ];

  const dispatch = useDispatch()
  const board = useSelector((state: rootState) => state.board.board)
  const position = useSelector((state: rootState) =>  state.board.pos)
  const row = useSelector((state: rootState) => state.board.row)

  const allWords: string[] =  wordList.words;
  const board5Words: string = `${board[position-5]}${board[position-4]}${board[position-3]}${board[position-2]}${board[position-1]}`.toLowerCase();

  // gồm 3 state: chính xác, sai, gần đúng
  const ClickBack = () => {
    console.log("check postion", Math.floor(position - 1) / 5 )
    console.log("check row", row)
    if (Math.floor(position -1 ) /5 < row) return; // vị trí hiện tại của position - 1 
    if (position <=  0) return 0; //  nếu postion mà nhỏ hơn 0 thì nó sẽ break k cho render nữa
    const newBoard = [...board];
    dispatch(desPos())
    newBoard[position - 1] = "";
    dispatch(setBoard(newBoard))
  }

  const ClickEnter = () => {
    console.log("check allWords", allWords)
    console.log("check board5W", board5Words)
    if (!allWords.includes(board5Words) === false) {
      alert("Invalid Word")
    }
    if (allWords.includes(board5Words)) {
      // xử lý logic chỉ khi cuối hàng mới được bấm enter.
      if (position % 5 === 0 && position !== 0) {
        dispatch(incRow())
      }
    }
  }
  return (
    <div
      className="keyboard-container"
    >
      {rows.map((row, index) => {
      return (  
          <div className="row">
            {index === 2 && (
              <span onClick={ClickEnter}>Enter</span>
            )}
            {row.split(" ").map((letter, idx) => {
              return (
                <div className="letter-row">
                  <Key letter={letter.toLocaleUpperCase()} index={idx}/>
                  {letter === 'm' && <span onClick={ClickBack}> Back </span>}
                </div>
              )
            })}
          </div>
      )
    })}
    </div>
  )
}

export default Keyboard