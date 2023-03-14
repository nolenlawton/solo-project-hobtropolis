import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form onSubmit={login}>
      <h3>Login</h3>

      {errors.loginMessage && (
        <h3 role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <div>
        <label htmlFor="username">
          Username <input type="text" name="username" required value={username} onChange={(event) => setUsername(event.target.value)}/>
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password <input type="password" name="password" required value={password} onChange={(event) => setPassword(event.target.value)}/>
        </label>
      </div>

      <div>
        <input className='login' type="submit" name="submit" value="Login" />
      </div>

    </form>
  );
}

export default LoginForm;
