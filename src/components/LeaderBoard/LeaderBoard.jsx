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

    const gameResults = location.state

    const [game, setGame] = useState(1)

    // get scores on page load
    useEffect(() => {
        getScores()
    }, [])

    const getScores = () => {
        dispatch({
            type: 'GET_SCORES',
            payload: game
        })
    }

    // delete scores (admin only)
    const deleteScore = (event) => {
        dispatch({
            type: 'DELETE_SCORE',
            payload: event.target.id
        })
    }

    const game1 = () => {
        setGame(1)
        getScores()
    }

    const game2 = () => {
        setGame(2)
        getScores()
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

            <h2>{'LeaderBoard'}</h2>

            <div className="gameSelect">
                <div onClick={game1} className={game === 1 ? 'selectedGame' : ''} >Master Mind</div>
                <div onClick={game2} className={game === 2 ? 'selectedGame' : ''} >Castle Moonlight</div>
            </div>

            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th></th>
                        <th>Name</th>
                        <th>Rounds</th>
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
        </>
    )
}

export default LeaderBoard