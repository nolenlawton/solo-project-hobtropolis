import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import Round from './Round'

import './MasterMind.css'

import { useDispatch } from 'react-redux'

function MasterMind () {
    const [answers, setAnswers] = useState([])
    const [hints, setHints] = useState([])
    const [round, setRound] = useState(1)
    const [guesses, setGuesses] = useState([])
    const [winner, setWinner] = useState(false)
    const [timer, setTimer] = useState(0)
    const [timeToStop, setTimeToStop] = useState(0)
    const dispatch = useDispatch()
    let history = useHistory()

    // starts timer
    const startTimer = () => {
        let interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
            
            setTimeToStop(interval)
    }


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

// generates random colors and starts timer on load
    useEffect(() => {
        randomNumbers()
        startTimer()
    }, [])

// random color generator
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
        const guessesArray = [guesses.guess1, guesses.guess2, guesses.guess3, guesses.guess4]

        console.log('answers: ', answers)

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
            clearInterval(timeToStop)
        }
        else { 
            setRound(round + 1)
        }
    }


    const leaderBoard = () => {
        const game_id = 1

        const gameResults = {
            game_id: game_id,
            round: round,
            timer: timer
        }

        dispatch({
            type: 'ADD_SCORE',
            payload: gameResults
        })

        history.push({pathname: '/leaderBoard', state: gameResults})
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

            <div id='timer'>{timer}</div>

            <div className='masterMind'>
                <div className='masterMindBody'>
                    
                    <h2 className='masterMindTurn'><div>{winner ? `Winner!` : `Round ${round}`}</div><div id='timer'>({timer})</div></h2>
                    <div className='table'>

                    {/* game rows // game leaderboard */}
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

        {/* check answers, if 4 are correct, show leaderboard  */}
                <div className='submit'>
                    {
                    winner ? <h3 onClick={leaderBoard} className='checkAnswers'>Next</h3>

                    : <h3 onClick={checkAnswers} className='checkAnswers'>Check Answers</h3>
                    }
                </div>
            </div>
        </ div>
    )
}

export default MasterMind