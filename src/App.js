import "./index.html"
import React from 'react'
import ReactDOM from 'react-dom/client';
import Die from "./Die"
import {nanoid} from "nanoid"
function App() {

  const[dice,setdice]=React.useState(allNewDice())
  
  function generatenewDice(){
    return {
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
  }
  
  function allNewDice(){
    const result=[]
    for (let i=0;i<10;i++){
      result.push({
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:nanoid()
      })
    }
    return result
  }

  const diceElements=dice.map(die=><Die key = {die.id} value={die.value} held={die.isHeld} holddice={()=>holdDice(die.id)} />)

 
  function reroll(){
    setdice(newDice=>newDice.map(die=>{
      return die.isHeld?die:generatenewDice()
    }))
  }


  function holdDice(id){
    setdice(oldDice=>oldDice.map(die=>{
      return die.id===id?{...die,isHeld:!die.isHeld}:die
    }))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={reroll}>Roll</button>
    </main>
  )
}
    
export default App;
