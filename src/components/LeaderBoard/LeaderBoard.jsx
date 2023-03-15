import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import './LeaderBoard.css'

function LeaderBoard () {
    const dispatch = useDispatch();
    const location = useLocation()
    const scores = useSelector(store => store.scores)
    const user = useSelector(store => store.user)

    // console.log(location.state)

    useEffect(() => {
        getScores()
    }, [])

    const getScores = () => {
        dispatch({
            type: 'GET_SCORES'
        })
    }

    const deleteScore = (event) => {
        dispatch({
            type: 'DELETE_SCORE',
            payload: event.target.id
        })
    }



    return (
        <>
            <h2>{'LeaderBoard'}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Rounds</th>
                    </tr>
                    {scores.map((score, i) => {
                        return (
                        <tr key={i}>
                            <td>{i+1}.</td>
                            <td>{score.username}</td>
                            {user.id === 1 ?
                                <><td>{score.score}</td><td className="delete"><button id={score.id} onClick={(event) => deleteScore(event)}>Delete</button></td></> :
                                <td>{score.score}</td>
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