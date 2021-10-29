import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const Users = ({setUserId, setUsername, setLoggedIn, notifyError, notifySuccess}) => {

    const [page, setPage] = useState('login');

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen background text-black py-20">
                {page === 'login' ?
                    <Login 
                        setLoggedIn={setLoggedIn} 
                        notifyError={notifyError} 
                        notifySuccess={notifySuccess} 
                        setPage={(msg)=>setPage(msg)}
                        setUserId={setUserId}
                        setUsername={setUsername}
                    />
                    :
                    <Register 
                        notifyError={notifyError} 
                        setPage={(msg)=>setPage(msg)} 
                    />
                }
        </div>
    )
}

export default Users;