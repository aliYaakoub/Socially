import React, { useState, useEffect } from 'react'
import Post from '../posts/Post';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = ({username, userId, notifyError, notifySuccess}) => {

    const [posts, setPosts] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [avatar, setAvatar] = useState('');

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

    async function onSubmit(e){
        e.preventDefault();
        const data = {
            username: username,
            content: postContent
        }
        if(postContent.length < 5){
            return notifyError('post should be more that 5 characters long');
        }
        if(postContent.length > 1000){
            return notifyError('post can\'t be more than a 1000 characters long')
        }
        try{
            await axios.post(`${process.env.REACT_APP_API}/posts`,data);
            notifySuccess('your post was uploaded successfully',)
            setPostContent('')
        }
        catch(err){
            setPostContent('')
            notifyError('could not post , server error please try again later.')
        }

    }

    return (
        <div className='min-h-screen bg-gray-400 '>
            <Link to='/' className='fixed left-5 top-5 cursor-pointer z-50 text-white text-2xl transition-transform transform hover:scale-110'>&#8920; See All Posts</Link>
            
            <div className="relative flex items-center justify-center h-screen flex-col">
                <div className='flex flex-row m-10 text-3xl items-center bg-white overflow-hidden rounded-xl shadow'>
                    <div className="w-20">
                        <div dangerouslySetInnerHTML={{ __html: avatar }} />
                    </div>
                    <h1 className='mx-5'>{username}</h1>
                </div>
                <div className='bg-white w-10/12 md:8/12 lg:w-6/12 h-96 rounded shadow p-5 mb-16'>
                    <form className='w-full h-full flex flex-col' onSubmit={onSubmit}>
                        <h1 className='text-center mb-5 text-xl'>Type what ever you desire and post it</h1>
                        <textarea 
                            name="content" 
                            id="content" 
                            value={postContent}
                            onChange={(e)=>setPostContent(e.target.value)}
                            className=' resize-none w-full h-full rounded p-5 textarea'
                        />
                        <button className='bg-gray-400 h-16 rounded btn-active text-white w-2/4 mx-auto text-2xl mt-5 '>Post</button>
                    </form>
                </div>
                <div className="absolute bottom-2 animation">
                    <a href="#posts" className="animation text-white text-6xl">&#10095;</a>
                </div>
            </div>
            <div id="posts">
                {posts.length === 0 ?
                    <h1 className="text-white text-3xl text-center p-5">your posts will be shown down here.</h1>
                    :
                    <div className="text-black posts flex flex-col mx-auto pb-10 px-5">
                        <h1 className="text-white text-3xl text-center p-5">your posts : </h1>
                        {posts.map(post => (
                            <Post
                                poster={true}
                                userId={userId}
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

export default Profile
