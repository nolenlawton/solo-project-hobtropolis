import './Sudoku.css'
import axios from 'axios'

function Sudoku () {

const squares = 81
const table = []
const yourAnswers = []

for(let i = 0; i < squares; i++){
    table.push(<input key={i} className='box' type='number' min='0' max='9' />)
}

const check = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            yourAnswers.push(input.value)
        } else {
            yourAnswers.push('.')
        }
    })
    console.log(yourAnswers)
}



    return(
        <>
            <h2>Sudoku</h2>
            <div id="table">
                {table}
                <div id='numbers'>
                    <div id='num1'>1</div>
                    <div id='num2'>2</div>
                    <div id='num3'>3</div>
                    <div id='num4'>4</div>
                    <div id='num5'>5</div>
                    <div id='num6'>6</div>
                    <div id='num7'>7</div>
                    <div id='num8'>8</div>
                    <div id='num9'>9</div>
                </div>
            </div>

            <button onClick={check}>Check Answers</button>
        </>
    )
}

export default Sudoku