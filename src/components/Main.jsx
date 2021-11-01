import React from 'react'
import Posts from './posts/Posts'
import Navbar from './Navbar'
import AdminPosts from './administration/AdminPosts'

const Main = ({notifyError, isAdmin, notifyInfo, username, notifySuccess, userId, setLoggedIn}) => {
    return (
        <div>
            <Navbar 
                username={username} 
                setLoggedIn={setLoggedIn} 
                notifyInfo={notifyInfo}
            />
            <div className="mx-5 md:mx-10 mt-24">
                <AdminPosts />
                <Posts
                    notifyError={(msg)=>notifyError(msg)}
                    notifySuccess={(msg)=>notifySuccess(msg)}
                    userId={userId}
                    username={username}
                    isAdmin={isAdmin}
                />
            </div>
        </div>
    )
}

export default Main
