import React, { useState, useEffect } from 'react'
import axios from 'axios'
import emptyHeart from '../../img/empty-h.png';
import fullHeart from '../../img/full-h.png';

const Post = ({data, userId, notifyError, notifySuccess, background}) => {

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(data.likes);

    async function onLiked(){
        
        await axios.patch(`${process.env.REACT_APP_API}/posts/onlike?liked=${liked}&postid=${data._id}&userid=${userId}`);
        setLiked(!liked);
    }

    useEffect(()=>{
        const fetchLikes = async () => {
            const results = await axios.get(`${process.env.REACT_APP_API}/posts?postid=${data._id}`)
            setLikes(results.data[0].likes)
            if(results.data[0].userWhoLikedThis.find(item => item === userId)){
                setLiked(true);
            }
        }
        fetchLikes();
    },[liked,data,userId]);

    return (
        <div className={background==='white' ? 'relative post my-5 rounded-xl flex flex-col bg-white overflow-hidden shadow':`relative post my-5 rounded-xl flex flex-col  overflow-hidden shadow`}>
            <div className='p-5 mr-28'>
                <h1 className="text-3xl pb-5 text-blue-400">{data.username}</h1>
                <p className="text-xl text-justify">{data.content}</p>
            </div>
            <div className="absolute h-full right-0 w-16 sm:w-24 flex flex-col justify-center items-center mx-5 border-l-2 border-blue-300">
                <div className="flex flex-row items-center">
                    <img src={liked ? fullHeart : emptyHeart} alt="" onClick={()=>onLiked()} className="cursor-pointer"/>
                    <p className="text-xl pl-2" >{likes}</p>
                </div>
            </div>
        </div>
    )
}

export default Post
