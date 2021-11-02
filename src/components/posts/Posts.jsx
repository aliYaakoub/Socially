import React, { useState, useEffect }from 'react'
import axios from 'axios'
import Post from './Post';
import Loading from '../common/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../fontAwsome'

const Posts = ({isAdmin, username, userId, notifySuccess, notifyError}) => {

    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [max, setMax] = useState(0);
    const [isCancelled, setIsCancelled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const limitInc = 10;

    useEffect(() =>{
        setIsCancelled(false);
        if(!isCancelled){
            const fetch = async () =>{
                try{
                    const results = await axios(`${process.env.REACT_APP_API}/posts?page=1&limit=${limit}`)
                    setPosts(results.data.filteredPosts);
                    setMax(results.data.max);
                    setIsLoading(false)
                }
                catch(err){
                    console.error(err);
                }
            }
            fetch();
        }
        return () => {
            setIsCancelled(true);
        }
    },[limit, posts, isCancelled]);

    return (
        <div>
            {isLoading ?
                <div className="flex items-center justify-center w-full h-screen">
                    <Loading />
                </div>
                :
                <div className="text-black posts flex flex-col mx-auto mt-10 mb-10">
                    {posts.length === 0 ?
                        <h1 className='text-center text-2xl pt-20'>no posts to show</h1>
                        :
                        <div>
                            <h1 className='text-center text-2xl'>users posts</h1>
                            {posts.map(post => (
                                <Post
                                    data={post}
                                    key={post._id}
                                    userId={userId}
                                    isAdmin={isAdmin}
                                    username={username}
                                    notifyError={(msg)=>notifyError(msg)}
                                    notifySuccess={(msg)=>notifySuccess(msg)}
                                />
                            ))}
                        </div>
                    }
                    {posts.length === max ?
                        null
                    :
                        <FontAwesomeIcon icon={['far','plus-square']} size="4x" className="mx-auto text-blue-400 my-10 cursor-pointer" onClick={()=>setLimit(limit+limitInc)}/>
                    }
                </div>
            }
        </div>
    )
}

export default Posts
