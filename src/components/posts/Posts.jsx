import React, { useState, useEffect }from 'react'
import axios from 'axios'
import Post from './Post';
import Loading from '../common/Loading'
import lodash from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../fontAwsome'

const Posts = ({isAdmin, username, userId, notifySuccess, notifyError}) => {

    const [posts, setPosts] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [sortBy, setSortBy] = useState('date');
    const [order, setOrder] = useState('asc')
    const [limit, setLimit] = useState(10);
    const [max, setMax] = useState(0);
    const [isCancelled, setIsCancelled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const limitInc = 10;
    const filtered = sorted.slice(0 , 1 * limit);

    useEffect(() =>{
        setIsCancelled(false);
        if(!isCancelled){
            const fetch = async () =>{
                try{
                    const results = await axios(`${process.env.REACT_APP_API}/posts`)
                    setPosts(results.data);
                    setMax(posts.length);
                    setIsLoading(false)
                }
                catch(err){
                    console.error(err);
                    setIsLoading(false)
                }
            }
            fetch();
        }
        return () => {
            setIsCancelled(true);
        }
    },[limit, posts, isCancelled, order, sortBy]);

    useEffect(()=>{
        if(!isCancelled){
            setSorted(lodash.orderBy(posts, [sortBy], [order]))
        }
    },[sortBy, order, isCancelled, posts])

    function setDateSorting() {
        setSortBy('date');
        if(order === 'desc') setOrder('asc');
        else if (order === 'asc') setOrder('desc');
    }

    function setLikesSorting() {
        setSortBy('likes');
        if(order === 'desc') setOrder('asc');
        else if (order === 'asc') setOrder('desc');
    }

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
                            <div className='flex flex-row items-center justify-between md:px-10'>
                                <h1 className='text-center md:text-2xl'>users posts</h1>
                                <div className='flex flex-row float-right'>
                                    <p className='px-2 md:text-xl cursor-pointer'>sort By : </p>
                                    <p className='px-2 md:text-xl cursor-pointer' onClick={()=>setDateSorting()} >date {sortBy==='date' && <FontAwesomeIcon icon={order === 'asc' ? ['fas', 'sort-up']: ['fas','sort-down']}/>}</p>
                                    <p className='px-2 md:text-xl cursor-pointer' onClick={()=>setLikesSorting()} >likes {sortBy==='likes' && <FontAwesomeIcon icon={order === 'asc' ? ['fas', 'sort-up']: ['fas','sort-down']}/>}</p>
                                </div>
                            </div>
                            {filtered.map(post => (
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
                    {filtered.length === max ?
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
