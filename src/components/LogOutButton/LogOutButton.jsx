import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LogOutButton({user}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const changePicture = () => {
    history.push('/profilePicture')
  }

  return (

    <span>
      {/* profile picture */}
      <div>
        <img onClick={changePicture} id='pfp' src={user.pfp} />
      </div>

      {/* username and logout */}
      <div>
        <div id='user'>
          {user.username}
        </div>
        <div id='logout' onClick={() => dispatch({ type: 'LOGOUT' })}>
          Log Out 
        </div>
      </div>
    </span>
  );
}

export default LogOutButton;
