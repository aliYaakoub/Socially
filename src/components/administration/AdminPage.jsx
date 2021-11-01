import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminPost from './AdminPost';
import UsersTable from './UsersTable';

const AdminPage = ({username, notifyError, notifySuccess}) => {

    const [posts, setPosts] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [isCancelled, setIsCancelled] = useState(true);

    useEffect(() => {
        setIsCancelled(false);
        if (!isCancelled){
            const fetch = async () => {
                const results = await axios.get(`${process.env.REACT_APP_API}/adminPost`);
                setPosts(results.data);
            }
            fetch();
        }
        return () => {
            setIsCancelled(true);
        }
    },[username, posts, isCancelled]);

    useEffect(()=>{
        setIsCancelled(false);
        if(!isCancelled){
            const fetchAllUsers = async () =>{
                try{
                    const results = await axios(`${process.env.REACT_APP_API}/users`);
                    if(results.data.message === 'success'){
                        setAllUsers(results.data.data);
                    }
                    else{
                        notifyError(results.data.message);
                    }
                }
                catch(err){
                    console.error(err);
                }
            }
            fetchAllUsers();
        }
        return () => {
            setIsCancelled(true);
        }
    },[isCancelled, notifyError , allUsers])

    async function onSubmit(e){
        e.preventDefault();
        if(!isCancelled){
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
                await axios.post(`${process.env.REACT_APP_API}/adminPost`,data);
                setPostContent('')
                notifySuccess('your post was uploaded successfully',)
            }
            catch(err){
                setPostContent('')
                notifyError('could not post , server error please try again later.')
            }
        }
    }

    return (
        <div>
            <div className='min-h-screen bg-gray-400 '>
                <Link to='/' className='fixed left-5 top-5 cursor-pointer z-50 text-white text-2xl transition-transform transform hover:scale-110'>&#8920; See All Posts</Link>
                
                <div className="relative flex items-center justify-center h-screen flex-col">
                    <div className='flex flex-row m-10 text-3xl items-center bg-white overflow-hidden rounded-xl shadow'>
                        <h1 className='my-5 mx-7'>{username}</h1>
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
                                <AdminPost
                                    poster={true}
                                    data={post} 
                                    key={post._id}
                                    notifySuccess={(msg)=>notifySuccess(msg)}
                                    notifyError={(msg)=>notifyError(msg)}
                                />
                            ))}
                        </div>
                    }
                </div>
                <div className='mx-20 pb-20'>
                    <table className='usersTable bg-white w-full text-center text-2xl p-5'>
                        <thead>
                            <tr>
                                <th>username</th>
                                <th>name</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(user =>(
                                <UsersTable 
                                    data={user} 
                                    key={user._id} 
                                    notifyError={notifyError} 
                                    notifySuccess={notifySuccess} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
