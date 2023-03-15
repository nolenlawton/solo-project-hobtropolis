import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useState } from "react";
import './LeaderBoard.css'

function LeaderBoard () {
    const dispatch = useDispatch();
    const scores = useSelector(store => store.scores)

    useEffect(() => {
        getScores()
    }, [])

    const getScores = () => {
        dispatch({
            type: 'GET_SCORES'
        })
    }

    return (
        <>
            <h2>{'LeaderBoard'}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Rounds</th>
                    </tr>
                    {scores.map((score, i) => {
                        return (
                        <tr key={i}>
                            <td>{score.username}</td>
                            <td>{score.score}</td>
                        </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </>
    )
}

export default LeaderBoard