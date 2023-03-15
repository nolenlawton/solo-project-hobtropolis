import { Link } from "react-router-dom"
import game1Image from '../art/mastermind.png'

function SelectGame () {
    return (
        <>
        <h2>SELECT GAME</h2>
        <div className="topGameSelect">
            <Link to='/masterMind'>
                <div className="gameToSelect">
                    Master Mind
                    {/* <img src={game1Image} /> */}
                </div>
            </Link>

            <Link to='/sudoku'>
                <div className="gameToSelect">Sudoku</div>
            </Link>
            
            <Link to='/galacticGoblin'>
                <div className="gameToSelect">Galactic Goblin</div>
            </Link>

            <Link to='/basketball'>
                <div className="gameToSelect">Basketball</div>
            </Link>
        </div>
        </>
    )
}

export default SelectGame