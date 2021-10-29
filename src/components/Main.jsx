import React from 'react'
import Posts from './posts/Posts'

const Main = ({notifyError, username, notifySuccess, userId}) => {
    return (
        <div>
            <Posts 
                notifyError={(msg)=>notifyError(msg)} 
                notifySuccess={(msg)=>notifySuccess(msg)}
                userId={userId}
                username={username}
            />
        </div>
    )
}

export default Main
