import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LogoutButton from '../LogOutButton/LogOutButton'
import SelectGame from '../SelectGame/SelectGame';
import MasterMind from '../MasterMind/MasterMind'

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>

        <header className="App-header">

        <div className="adminHelp">

          <h1 className="admin">hobtropolis</h1>

        {user ?
          <LogoutButton /> : <></>
        } 

        </div>

        </header>

        <Switch>



          <Route exact path="/login">
            {user.id ?
              <Redirect to="/" />
              :
              <LoginPage />
            }
          </Route>

          <Route exact path="/registration">
            {user.id ?
              <Redirect to="/" />
              :
              <RegisterPage />
            }
          </Route>

          <Route exact path="/">
            {user.id ?
              <SelectGame />
              :
              <LoginPage />
            }
          </Route>

          <Route path='/masterMind' exact>
            <MasterMind />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
