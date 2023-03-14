import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <h2>
        <LoginForm />
      
        <p>don't have an account?</p>
        <button type="button" onClick={() => {history.push('/registration')}}>
          Register
        </button>
      </h2>
    </div>
  );
}

export default LoginPage;
