import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton({user}) {
  const dispatch = useDispatch();

  return (
    <span>
      <div id='user'>
        {user.username}
      </div>
      <div id='logout' onClick={() => dispatch({ type: 'LOGOUT' })}>
        Log Out 
      </div>
    </span>
  );
}

export default LogOutButton;
