import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import './LeaderBoard.css'

function LeaderBoard () {
    const dispatch = useDispatch();
    const location = useLocation()
    const scores = useSelector(store => store.scores)
    const user = useSelector(store => store.user)
    const [game_id, setGame] = useState(1)
    const [myScores, setMyScores] = useState(false)
    const [scoreToDelete, setScoreToDelete] = useState({})

    const gameResults = location.state

    // get scores on page load
    useEffect(() => {
        getScores()
    }, [game_id, myScores])

    const getScores = () => {
        console.log(game_id, myScores)
        const scoresToGet = {
            game_id,
            myScores
        }
        dispatch({
            type: 'GET_SCORES',
            payload: scoresToGet
        })
    }

    // delete scores (admin only)
    const deleteScore = (event) => {
        scoreToDelete.game_id = game_id
        scoreToDelete.score_id = event.target.id
        scoreToDelete.myScores = myScores

        console.log('delete:', scoreToDelete)
        dispatch({
            type: 'DELETE_SCORE',
            payload: scoreToDelete
        })
    }

    return (
        <>

            {/* if user comes from game, it will show results */}
            {/* {gameResults ? 
                <h2 id="yourScore">
                    <div>YOU WON IN</div>
                    <div>{gameResults.round} Rounds</div>
                    <div>{gameResults.timer} Seconds</div>
                </h2> 
                : <></>
            } */}

            <h2>
                <div>
                    {game_id === 1 ? 'Master Mind' : ''}
                    {game_id === 2 ? 'Castle Moonlight' : ''}
                    {game_id === 3 ? 'Sudoku' : ''}
                </div>
                <div>LeaderBoard</div>
            </h2>

            <div className="myScores">
                <div onClick={() => setMyScores(!myScores)} className={myScores === true ? 'selectedGame' : ''} >Show My Scores</div>
            </div>

            <div className="gameSelect">
                <div onClick={() => setGame(1)} className={game_id === 1 ? 'selectedGame' : ''} >Master Mind</div>
                <div onClick={() => setGame(3)} className={game_id === 3 ? 'selectedGame' : ''} >Sudoku</div>
                <div onClick={() => setGame(2)} className={game_id === 2 ? 'selectedGame' : ''} >Castle Moonlight</div>
            </div>

            {game_id === 1 || game_id === 2 ?
            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th></th>
                        <th>Name</th>
                        {game_id === 1 ? <th>Rounds</th> : ''}
                        {game_id === 2 ? <th>Gems</th> : ''}
                        <th>Time</th>
                        {user.id === 1 ?
                            <th></th> : <></>
                        }
                    </tr>
                    {scores.map((score, i) => {
                        return (
                        <tr key={i}>
                            <td>{i+1}.</td>
                            <td className="pfpTd"><img className="leaderboardPfp" src={score.pfp} /></td>
                            <td>{score.username}</td>
                            <td>{score.score}</td>
                            {user.id === 1 ?
                                <><td>{score.time}s</td><td className="delete"><button className="deleteButton" id={score.id} onClick={(event) => deleteScore(event)}>Delete</button></td></> :
                                <td>{score.time}s</td>
                            }
                        
                        </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        : <></>}
        </>
    )
}

export default LeaderBoard