import walt from '../art/walt.png'
import jon from '../art/jon.png'
import peach from '../art/peach.jpg'
import gary from '../art/gary.jpg'
import LOU from '../art/lastOfUs.jpg'
import winston from '../art/winston.jpg'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProfilePicture () {
    const user = useSelector(store => store.user )
    const [picture, setPicture] = useState(user.pfp)
    const dispatch = useDispatch()
    const history = useHistory()

    // update profile pictures
    const savePicture = () => {
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
                <img onClick={() => setPicture(walt)} className={picture === walt ? "imageSelection selected" : "imageSelection"} src={walt} />
                <img onClick={() => setPicture(gary)} className={picture === gary ? "imageSelection selected" : "imageSelection"} src={gary} />
                <img onClick={() => setPicture(LOU)} className={picture === LOU ? "imageSelection selected" : "imageSelection"} src={LOU} />
        </div>

        <div className="pictureSelection">
            <img onClick={() => setPicture(jon)} className={picture === jon ? "imageSelection selected" : "imageSelection"} src={jon} />
            <img onClick={() => setPicture(peach)} className={picture === peach ? "imageSelection selected" : "imageSelection"} src={peach} />
            <img onClick={() => setPicture(winston)} className={picture === winston ? "imageSelection selected" : "imageSelection"} src={winston} />
        </div>

        <div id='save'><button onClick={savePicture}>Save</button></div>
    </>
    )
}

export default ProfilePicture