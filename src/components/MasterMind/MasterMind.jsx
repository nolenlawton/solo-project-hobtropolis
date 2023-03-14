import { useEffect } from 'react'
import { useState } from 'react'
import Round from './Round'
import './MasterMind.css'

import { useDispatch } from 'react-redux'

function MasterMind () {
    const [answers, setAnswers] = useState([])
    const [hints, setHints] = useState([])
    const [round, setRound] = useState(1)
    const [guesses, setGuesses] = useState([])
    const [winner, setWinner] = useState(false)
    const dispatch = useDispatch()

// handles drag and drop funcitionality
    const handleOnDrag = (event) => {
        event.dataTransfer.setData('color', event.target.id)
    }

    const handleOnDrop = (event) => {
        let areaToDrop = event.target
        let id = areaToDrop.id
        let color = event.dataTransfer.getData('color')
    
            // adds to guesses
            switch(id) {
                case 'guess1':
                    setGuesses({...guesses, guess1: color})
                    break;
                case 'guess2':
                    setGuesses({...guesses, guess2: color})
                    break;
                case 'guess3':
                    setGuesses({...guesses, guess3: color})
                    break;
                case 'guess4':
                    setGuesses({...guesses, guess4: color})
                    break;
                default: setGuesses({... guesses, guesses: color})
            }
    

            // changes color
            areaToDrop.classList.remove('red', 'salmon', 'yellow', 'blue', 'green', 'black')
    
            areaToDrop.classList.add(color)
    }
    
    const handleOnDragOver = (event) => {
        event.preventDefault()
    }

// random color generator
    useEffect(() => {
        randomNumbers()
    }, [])

    const randomNumbers = () => {
        const colors = ['red', 'blue', 'salmon', 'yellow', 'green', 'black']

        const number1 = Math.floor(Math.random() * 6)
        const number2 = Math.floor(Math.random() * 6)
        const number3 = Math.floor(Math.random() * 6)
        const number4 = Math.floor(Math.random() * 6)

        const answers = [colors[number1], colors[number2], colors[number3], colors[number4]]
        setAnswers(answers)
    }

// checks answers
    const checkAnswers = () => {
        let correctColor = 0
        let correct = 0

        let answersToCheck = [...answers]
        const guessesArray = Object.values(guesses)

        console.log('answers: ', answers)

        if (winner === true){
            dispatch({
                type: 'ADD_SCORE',
                payload: round
            })
        }

        // checks guesses if they are in correct position
        guessesArray.forEach((guess, i) => {
            if(guess === answersToCheck[i]) {
                correct++
                answersToCheck.splice(i, 1, 'correct')
            }
        })


        // checks guesses if they have correct color
        guessesArray.forEach((guess, i) => {
            if (answersToCheck.includes(guess) && answersToCheck[i] !== 'correct') {
                correctColor++
                let index = answersToCheck.indexOf(guess)
                answersToCheck.splice(index, 1, 'correct color')
            }
        })

        
        // sets hints based on results
        switch (correct) {
            case 0:
                switch(correctColor) {
                    case 1:
                        setHints([...hints, {hint1:'correctColor'}])
                        break;
                    case 2:
                        setHints([...hints, {hint1: 'correctColor', hint2: 'correctColor'}])
                        break;
                    case 3:
                        setHints([...hints, {hint1: 'correctColor', hint2: 'correctColor', hint3: 'correctColor'}])
                        break;
                    case 4:
                        setHints([...hints, {hint1: 'correctColor', hint2: 'correctColor', hint3: 'correctColor' , hint4: 'correctColor'}])
                        break;
                    default:  setHints([...hints, {hints: 'none'}])

                }
                break;
            case 1:
                switch(correctColor) {
                    case 0:
                        setHints([...hints, {hint1: 'correct'}])
                        break;
                    case 1:
                        setHints([...hints, {hint1: 'correct', hint2: 'correctColor'}]) 
                        break;
                    case 2:
                        setHints([...hints, {hint1: 'correct', hint2: 'correctColor', hint3: 'correctColor'}])
                        break;
                    case 3:
                        setHints([...hints, {hint1: 'correct', hint2: 'correctColor', hint3: 'correctColor', hint4: 'correctColor'}])
                        break;
                    default: setHints([...hints, {hints: 'none'}])
                }
                break;

            case 2:
                switch(correctColor) {
                    case 0:
                        setHints([...hints, {hint1: 'correct', hint2: 'correct'}])
                        break;
                    case 1:
                        setHints([...hints, {hint1: 'correct', hint2: 'correct', hint3: 'correctColor'}])
                        break;
                    case 2:
                        setHints([...hints, {hint1: 'correct', hint2: 'correct', hint3: 'correctColor', hint4: 'correctColor'}])
                        break;
                    default: setHints([...hints, {hints: 'none'}])
                }
                break;
            case 3:
                setHints([...hints, {hint1: 'correct', hint2: 'correct', hint3: 'correct'}])
                break;
            case 4:
                setHints([...hints, {hint1: 'correct', hint2: 'correct', hint3: 'correct', hint4: 'correct'}])
                break;
            default: setHints([...hints, {hints: 'none'}])
        }

        if (correct === 4) {
            setWinner(true)
        }
        else { 
            setRound(round + 1)
        }
    }


    // adds rows based on rounds
    let rows = []

    for (let i=0; i < round ; i++) {
        rows.unshift(<Round key={i} id={i} handleOnDragOver={handleOnDragOver} handleOnDrop={handleOnDrop} hints={hints} />)
    }
    //------------------------//

    return(
        <div>
            <h2>Master Mind</h2>

            <div className='masterMind'>
                <div className='masterMindBody'>
                    <h2 className='masterMindTurn'>{winner ? `Winner!` : `Round ${round}`}</h2>
                    <div className='table'>

                    {/* game rows */}
                        {rows}
                        
                </div>
        </div>

        {/* color selection */}
                <div className='colorSelection'>
                    <div 
                    draggable
                    onDragStart={(event) => handleOnDrag(event)}
                    className='color' 
                    id='red'
                    ></div>
                    <div 
                    draggable
                    onDragStart={(event) => handleOnDrag(event)}
                    className='color' 
                    id='salmon'></div>
                    <div 
                    draggable
                    onDragStart={(event) => handleOnDrag(event)}
                    className='color' 
                    id='yellow'></div>
                    <div 
                    draggable
                    onDragStart={(event) => handleOnDrag(event)}
                    className='color' 
                    id='blue'></div>
                    <div 
                    draggable
                    onDragStart={(event) => handleOnDrag(event)}
                    className='color' 
                    id='green'></div>
                    <div 
                    draggable
                    onDragStart={(event) => handleOnDrag(event)}
                    className='color' 
                    id='black'></div>
                </div>

        {/* check answers */}
                <div className='submit'>
                    <h3 onClick={checkAnswers} className='checkAnswers'>{winner ? `Next!` : `Check Answers`}</h3>
                </div>
            </div>
        </ div>
    )
}

export default MasterMind