import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LogoutButton from '../LogOutButton/LogOutButton'
import SelectGame from '../SelectGame/SelectGame';
import MasterMind from '../MasterMind/MasterMind';
import CastleMoonlight from '../CastleMoonlight/CastleMoonlight';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import ProfilePicture from '../ProfilePicture/ProfilePicture';


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

          {/* home and logout buttons if logged in */}

          {user.id ?
              <>
                <Link to='/' className='home'>Home</Link>
                <LogoutButton user={user} />
              </>
              : <></>
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
              <Redirect to="/login" />
            }
          </Route>

          <Route path='/masterMind' exact>
          {user.id ?
              <MasterMind />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route path='/castleMoonlight' exact>
          {user.id ?
              <CastleMoonlight />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route path='/leaderBoard' exact>
          {user.id ?
              <LeaderBoard />
              :
              <Redirect to="/login" />
            }
          </Route>

          <Route path='/profilePicture' exact>
          {user.id ?
              <ProfilePicture />
              :
              <Redirect to="/login" />
            }
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
