import React, { useState } from 'react'
import Users from './components/user/Users';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/Main'
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './components/user/Profile';


function App() {

  const notifyError = (msg) => toast.error(msg);
  const notifyInfo = (msg) => toast.info(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className="w-full">
      <ToastContainer />
      {loggedIn ? 
        <Switch>
          <Route path='/posts' exact>
            <Main 
              notifySuccess={notifySuccess}
              notifyError={notifyError}
              notifyInfo={notifyInfo}
              userId={userId}
              username={username}
              setLoggedIn={(value)=>setLoggedIn(value)}
            />
          </Route>
          <Route path='/profile'>
            <Profile
              username={username}
              userId={userId}
              notifySuccess={notifySuccess}
              notifyError={notifyError}
              notifyInfo={notifyInfo}
            />
          </Route>
          <Redirect from='/' to='/posts' />
        </Switch>
        :
        <Users 
          notifyError={(msg)=>notifyError(msg)} 
          notifySuccess={(msg)=>notifySuccess(msg)} 
          setLoggedIn={setLoggedIn} 
          setUserId={setUserId} 
          setUsername={setUsername}
        />  
      }
    </div>
  );
}

export default App;
