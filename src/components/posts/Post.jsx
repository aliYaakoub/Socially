import React, { useState, useEffect } from 'react'
import axios from 'axios'
import emptyHeart from '../../img/empty-heart.png';
import fullHeart from '../../img/full-heart.png';

const Post = ({data, userId, notifyError, notifySuccess}) => {

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(data.likes);

    async function onLiked(){
        
        await axios.patch(`${process.env.REACT_APP_API}/posts/onlike?liked=${liked}&postid=${data._id}`)
        setLiked(!liked);
        notifySuccess('liked');
    }

    useEffect(()=>{
        const fetchLikes = async () => {
            const results = await axios.get(`${process.env.REACT_APP_API}/posts?postid=${data._id}`)
            console.log(results.data.post.likes);
            setLikes(results.data.post.likes)
            
        }
        fetchLikes();
    },[liked,data])

    // useEffect(()=>{
    //     const fetchLikes = async () => {
    //         const results = await axios.get(`${process.env.REACT_APP_API}/posts?postid=${data._id}`)
    //     }
    //     fetchLikes();
    // },[]);

    return (
        <div className="border border-black post my-5 rounded-xl flex flex-col overflow-hidden">
            <div className='p-5'>
                <h1 className="text-3xl pb-5">{data.username}</h1>
                <p className="text-xl">{data.content}</p>
            </div>
            <div className="w-full border border-black justify-self-end px-5">
                <div className="flex flex-row items-center">
                    <img src={liked ? fullHeart : emptyHeart} alt="" onClick={()=>onLiked()} className="cursor-pointer"/>
                    <p className="text-xl pl-2" >{likes}</p>
                </div>
            </div>
        </div>
    )
}

export default Post
