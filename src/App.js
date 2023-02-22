import "./index.html"
import React from 'react'
import ReactDOM from 'react-dom/client';
import Die from "./Die"
import {nanoid} from "nanoid"
function App() {

  const[dice,setdice]=React.useState(allNewDice())
  function allNewDice(){
    const result=[]
    for (let i=0;i<10;i++){
      result.push({
        value:Math.ceil(Math.random()*6),
        isHeld:true,
        id:nanoid()
      })
    }
    return result
  }

  const diceElements=dice.map(die=><Die key = {die.id} value={die.value} held={die.isHeld} />)

  function reroll(){
    setdice(allNewDice)
  }


  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={reroll}>Roll</button>
    </main>
  )
}
    
export default App;
