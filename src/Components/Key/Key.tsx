import { rootState } from "../interface";
import "./Key.css"
import { useSelector } from 'react-redux/es/exports'
import { useDispatch}  from "react-redux";

import { setBoard, incPos} from "../../redux/boardSlice";
interface IProps {
  letter: string,
  index: number
}
const Key: React.FC<IProps> = (props) => {
  const { letter } = props; 
  const dispatch = useDispatch()
  const board = useSelector((state: rootState) => state.board.board)
  const position = useSelector((state: rootState) => state.board.pos)
  const row = useSelector((state: rootState) => state.board.row);

  const currentRow = Math.floor(position / 5); // cú 5 lần bấm thì current row sẽ tăng thêm 1 
  // vì vậy ta cần xử lý điều kiện bên phía keyboard nút 
  //enter, khi enter sẽ tăng row của redux lên 1, 
  //lúc đó sẽ thoả mãn điều kiện
  
  const chooseLetter = () => {
    // == 0 because the currentRow using Math.floor methods. 
    //so the position of current row is 0
    if (position >= 30) return; // break;
    if (currentRow > row) return; //break; ngắt đk

    const newBoard = [...board];
    newBoard[position] = letter; 
    // tương đương với postion có index là 0 1 2 3 4
    dispatch(incPos())
    dispatch(setBoard(newBoard))
  }

  return (
    <div className="letter" onClick={chooseLetter}>
      {letter}
    </div>
  )
}

export default Key