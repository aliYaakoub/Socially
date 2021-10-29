import React, { useState } from 'react'
import Users from './components/user/Users';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/Main'


function App() {

  const notifyError = (msg) => toast.error(msg);
  // const notify = (msg) => toast(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className="w-full">
      <ToastContainer />
      {loggedIn ? 
        <Main 
          notifySuccess={notifySuccess}
          notifyError={notifyError}
          userId={userId}
          username={username}
        />
        :
        <Users 
          notifyError={(msg)=>notifyError(msg)} 
          notifySuccess={(msg)=>notifySuccess(msg)} 
          setLoggedIn={(value)=>setLoggedIn(value)} 
          setUserId={(value)=>setUserId(value)} 
          setUsername={setUsername}
        />  
      }
    </div>
  );
}

export default App;
