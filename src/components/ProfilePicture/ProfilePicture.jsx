import walt from '../art/walt.png'
import jon from '../art/jon.png'
import peach from '../art/peach.jpg'
import gary from '../art/gary.jpg'
import LOU from '../art/lastOfUs.jpg'
import winston from '../art/winston.jpg'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ProfilePicture () {
    const [picture, setPicture] = useState()
    const dispatch = useDispatch()
    const history = useHistory()

    const savePicture = () => {
        console.log(picture)
        dispatch({
            type: 'UPDATE_PICTURE',
            payload: picture
        })
        history.push('/')
    }



    return (
    <>
        <h2>Select Profile Picture</h2>

        <div className="pictureSelection">
                <img onClick={() => setPicture(walt)} className="imageSelection" src={walt} />
                <img onClick={() => setPicture(gary)} className="imageSelection" src={gary} />
                <img onClick={() => setPicture(LOU)} className="imageSelection" src={LOU} />
        </div>

        <div className="pictureSelection">
            <img onClick={() => setPicture(jon)} className="imageSelection" src={jon} />
            <img onClick={() => setPicture(peach)} className="imageSelection" src={peach} />
            <img onClick={() => setPicture(winston)} className="imageSelection" src={winston} />
        </div>

        <div id='save'><button onClick={savePicture}>Save</button></div>
    </>
    )
}

export default ProfilePicture