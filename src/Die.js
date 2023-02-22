import React from 'react'

export default function Die(props){
    const styles={
        backgroundColor: props.held?"#59E391":"white"
    }
    return (
            <div 
                className='die-face' 
                style={styles}
                onClick={props.holddice}
            >
                <h2 className='die-num'>{props.value}</h2>
            </div>
          
    )
}