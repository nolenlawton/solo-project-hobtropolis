import { Link } from "react-router-dom"
import game1Image from '../art/mastermind.png'
import game3Image from '../art/castleMoonlight.png'

function SelectGame () {
    return (
        <>
        <h2>SELECT GAME</h2>
        <div className="topGameSelect">
            <Link to='/masterMind'>
                <div className="gameToSelect">
                    Master Mind
                    <img src={game1Image} />
                </div>
            </Link>

            <Link to='/sudoku'>
                <div className="gameToSelect">Sudoku</div>
            </Link>
            
            <Link to='/castleMoonlight'>
                <div className="gameToSelect">
                    Castle Moonlight
                    <img src={game3Image} />
                </div>
            </Link>

            <Link to='/basketball'>
                <div className="gameToSelect">Basketball</div>
            </Link>
        </div>

        <Link to='leaderBoard'>
            <h2>LeaderBoard</h2>
        </Link>
        </>
    )
}

export default SelectGame