import "./index.html"
import React from 'react'
import ReactDOM from 'react-dom/client';
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
function App() {

  const[dice,setdice]=React.useState(allNewDice())

  const [tenzies,setTenzies]=React.useState(false)
  
  React.useEffect(()=>{
    if (dice.every(v=>v.isHeld == true) && dice.every(v=>v.value===dice[0].value)){
      setTenzies(true)
      console.log("You won")
    }
  },[dice])


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
  const buttonText = tenzies?"New Game":"Roll"
  var count=0
  function reroll(){
    if (!tenzies){
      count++
      setdice(newDice=>newDice.map(die=>{
        return die.isHeld?die:generatenewDice()
      }))
    }
    else{
      setTenzies(false)
      setdice(allNewDice())
    }
  }


  function holdDice(id){
    setdice(oldDice=>oldDice.map(die=>{
      return die.id===id?{...die,isHeld:!die.isHeld}:die
    }))
  }


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={reroll}>{buttonText}</button>
    </main>
  )
}
    
export default App;
