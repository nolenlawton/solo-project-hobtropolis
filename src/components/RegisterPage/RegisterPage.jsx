import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <h2>
        <RegisterForm />

        <p>already have an account?</p>
        <button type="button" onClick={() => {history.push('/login')}}>
          Login
        </button>
      </h2>
    </div>
  );
}

export default RegisterPage;
