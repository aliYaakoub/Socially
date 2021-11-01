import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Post from './posts/Post'
import axios from 'axios'

const SelectedProfile = ({notifySuccess, notifyError, match, userId}) => {

    const [posts, setPosts] = useState([]);
    const [avatar, setAvatar] = useState('');

    const username = match.params.username;

    useEffect(() => {
        const fetch = async () => {
            const results = await axios.get(`${process.env.REACT_APP_API}/posts/${username}`);
            setPosts(results.data);
        }
        fetch();
    },[username, posts]);

    useEffect(()=>{
        const fetch = async () => {
            const results = await axios.get(`https://avatars.dicebear.com/api/adventurer-neutral/${username}.svg`);
            setAvatar(results.data);
        }
        fetch();
    },[username]);

    return (
        <div className='min-h-screen bg-gray-400 '>
            <Link to='/' className='fixed left-5 top-5 cursor-pointer z-50 text-white text-2xl transition-transform transform hover:scale-110'>&#8920; See All Posts</Link>
            
            <div className="relative flex items-center justify-center flex-col">
                <div className='flex flex-row m-10 text-3xl items-center bg-white overflow-hidden rounded-xl shadow'>
                    <div className="w-20">
                        <div dangerouslySetInnerHTML={{ __html: avatar }} />
                    </div>
                    <h1 className='mx-5'>{username}</h1>
                </div>
            </div>
            <div id="posts">
                {posts.length === 0 ?
                    <h1 className="text-white text-3xl text-center p-5">this user have no posts yet</h1>
                    :
                    <div className="text-black posts flex flex-col mx-auto pb-10 px-5">
                        <h1 className="text-white text-3xl text-center p-5">all posts of this user: </h1>
                        {posts.map(post => (
                            <Post
                                userId={userId}
                                username={username}
                                data={post} key={post._id}
                                notifySuccess={(msg)=>notifySuccess(msg)}
                                notifyError={(msg)=>notifyError(msg)}
                            />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default SelectedProfile
