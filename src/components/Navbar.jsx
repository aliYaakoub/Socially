import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({notifyInfo, username, setLoggedIn}) => {

    function logout(){
        notifyInfo('logged out');
        setLoggedIn(false)
    }

    return (
        <div className="fixed top-0 left-0 w-full h-20 shadow z-50">
            <div className='relative w-full h-full text-xl sm:text-2xl bg-gray-600 text-white flex items-center justify-end md:justify-center'>
                <h1 className="absolute left-5 text-blue-400 text-2xl sm:text-3xl">{username}</h1>
                <ul className="flex flex-row">
                    <li 
                        className="px-5 transform hover:scale-110 hover:text-blue-400 cursor-pointer transition-transform"
                    >
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li 
                        className="px-5 transform hover:scale-110 hover:text-blue-400 cursor-pointer transition-transform"
                        onClick={()=>logout()}
                    >
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
