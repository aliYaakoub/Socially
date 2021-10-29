import React, { useState, useEffect }from 'react'
import axios from 'axios'
import Post from './Post';

const Posts = ({username, userId, notifySuccess, notifyError}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        const fetch = async () =>{
            const results = await axios(`${process.env.REACT_APP_API}/posts`)
            setPosts(results.data);
        }
        fetch();
    },[])

    return (
        <div className="text-black posts flex flex-col mx-auto">
            <h1 className="text-center py-16 text-3xl"> username : {username}</h1>
            {posts.map(post => (
                <Post 
                    userId={userId}
                    data={post} key={post._id} 
                    notifySuccess={(msg)=>notifySuccess(msg)}  
                    notifyError={(msg)=>notifyError(msg)}
                />
            ))}
        </div>
    )
}

export default Posts
