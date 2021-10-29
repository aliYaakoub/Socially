import React from 'react'
import Posts from './posts/Posts'
import Navbar from './Navbar'

const Main = ({notifyError, notifyInfo, username, notifySuccess, userId, setLoggedIn}) => {
    return (
        <div>
            <Navbar 
                username={username} 
                setLoggedIn={setLoggedIn} 
                notifyInfo={notifyInfo}
            />
            <div className="mx-5 md:mx-10 mt-24">
                <Posts
                    notifyError={(msg)=>notifyError(msg)}
                    notifySuccess={(msg)=>notifySuccess(msg)}
                    userId={userId}
                    username={username}
                />
            </div>
        </div>
    )
}

export default Main
