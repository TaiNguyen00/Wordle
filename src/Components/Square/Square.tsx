/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import "./Square.css";
import { motion } from "framer-motion";
import { rootState } from "../interface";

import { useState, useEffect } from "react";

interface IProps {
  val: string,
  squareIndex: number
}

const Square: React.FC<IProps> = (props) => {
  const { val, squareIndex } = props;

  // Redux state
  const correctWord = useSelector((state: rootState) => state.board.correctWord)
  const   position = useSelector((state: rootState) => state.board.pos)
  const reduxRow = useSelector((state: rootState) => state.board.row)

  // State
  const [ correct, setCorrect ] = useState<boolean>(false);
  const [ almost, setAlmost ] = useState<boolean>(false)
  const [ wrong, setWrong ] = useState<boolean>(false)

  // 
  const wordLastIndex = 4;
  const currentPos = 
  position === 5 ? wordLastIndex // khi vị trí trong ô là 5 thì nó sẽ matched với index 4 của từ
  : position > 5  && position % 5  === 0 ? wordLastIndex  // nếu vị trí lớn hơn 5(từ hàng 2) và chia hết cho 5 thì nó sẽ matched với wordLastIndex
  : (position - 1 ) % 5 // such as 1 2 3 4 6 7 8 9 11   để nó trả lùi về 1 số = với số của wordlastIndex (11 - 1) = 10 % 5 = 0


  const variants = {
    filled: () => ({
      scale: [1.2,1],
      transition: {
        duration: 0.2
      }
    }),
    unfilled: () => ({
      scale: [1.2,1],
      transition: {
        duration: 0.2
      }
    })
  }

  // check value
  useEffect(() => {
    if (correctWord[currentPos] === val) {
      setCorrect(true)
    } else if (!correct && val !== "" && correctWord.includes(val)) {
      setAlmost(true)
    } else if (!correct && val !== "" && !correctWord.includes(val)) {
      setWrong(true)
    }
    return () => {
      setCorrect(false)
      setAlmost(false)
      setWrong(false)
    }
  },[val])

  const status: any =  Math.floor(squareIndex / 5) < reduxRow && (correct ? "correct" : almost ? "almost" : wrong  ? "wrong" : "") ;
  return (
    <motion.div 
      animate={val ? 'filled' : "unfilled"} variants={variants}
    >
      <div className="square" id={status}>
        {val}
      </div>
    </motion.div>
  )
}

export default Square