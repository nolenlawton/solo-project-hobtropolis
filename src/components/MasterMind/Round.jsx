function Round ({handleOnDragOver, handleOnDrop,  hints, id}) {  

    let roundHints = hints[id]

    return (
        <div className='masterMindRow'>
            <div 
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
                className='masterMindGuess'
                id='guess1'
            ></div>
            <div 
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
                className='masterMindGuess'
                id='guess2'
            ></div>
            <div
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver} 
                className='masterMindGuess'
                id='guess3'
            ></div>
            <div 
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
                className='masterMindGuess'
                id='guess4'
            ></div>

            {/* why does the 'className' need to be in an object */}
            <div className='masterMindHints'>
                <div className='masterMindTopHints'>
                    <div id='hint1' className={roundHints ? `hint ${roundHints.hint1}` : 'hint'}></div>
                    <div id='hint2' className={roundHints ? `hint ${roundHints.hint2}` : 'hint'}></div>
                </div>
                <div className='masterMindBottomHints'>
                    <div id='hint3' className={roundHints ? `hint ${roundHints.hint3}` : 'hint'}></div>
                    <div id='hint4' className={roundHints ? `hint ${roundHints.hint4}` : 'hint'}></div>
                </div>
            </div>
        </div>
    )
}

export default Round