import { useEffect } from "react"
import { useState } from "react"

function App() {

  const [box,setBox]=useState(Array(9).fill(""))
  const [isX,setX]=useState(true)
  const [gameOver,setGameOver]=useState(false)
  const [winner,setWinner]=useState(null)

  function handleClick(idx){
    if(box[idx] || winner ) return;
      const newBoard=[...box]
    newBoard[idx]=isX?"X":"O"
    setBox(newBoard)
    setX(!isX)
  }

  function winnerChecker(box){
    const winningPattern=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for(let i=0;i<winningPattern.length;i++){
      const[a,b,c]=winningPattern[i]
      if(box[a] && box[a]==box[b] && box[a]==box[c]){
        setGameOver(true)
        return `winner is ${box[a]}`;
      }
      if (box.every(cell => cell !== "")) {
        setGameOver(true)
        return "Match is draw";
      }
    }
  }

useEffect(()=>{
  const winner=winnerChecker(box)
  setWinner(winner)
},[box])

function resetGame(){
  setBox(Array(9).fill(""))
  setX(true)
  setGameOver(false)
}

  return (
    <div className="container">
      <h1>TicTacToe Game</h1>
      {
        gameOver? 
        (<>
          <h5>{winner} </h5>
          <button onClick={resetGame}> Restart</button>
        </>) : 
        (<>
          <h4>It's now {isX?"X":"O"} turn</h4>
      <div className="game-board">
      {
        box.map((item,idx)=>(
          <button key={idx} onClick={()=>handleClick(idx)} > {item} </button>
        ))
      }
      </div>
        </>)
      }
    </div>
  )
}

export default App
