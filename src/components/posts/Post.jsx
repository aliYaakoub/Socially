import React, { useState, useEffect } from 'react'
import axios from 'axios'
import emptyHeart from '../../img/empty-h.png';
import fullHeart from '../../img/full-h.png';

const Post = ({data, userId, notifyError, notifySuccess, poster=false}) => {

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(data.likes);
    const [avatar, setAvatar] = useState('');

    async function onLiked(){
        
        await axios.patch(`${process.env.REACT_APP_API}/posts/onlike?liked=${liked}&postid=${data._id}&userid=${userId}`);
        setLiked(!liked);
    }

    useEffect(()=>{
        setLikes(data.likes);
        if(data.userWhoLikedThis.find(item => item === userId)){
            setLiked(true);
        }
    },[data,userId]);

    useEffect(()=>{
        const fetchLikes = async () => {
            const results = await axios.get(`${process.env.REACT_APP_API}/posts/getlikes?postid=${data._id}`)
            setLikes(results.data.likes);
        }
        fetchLikes();
    },[data._id, liked])

    useEffect(()=>{
        const fetch = async () => {
            const results = await axios.get(`https://avatars.dicebear.com/api/adventurer-neutral/${data.username}.svg`);
            setAvatar(results.data);
        }
        fetch();
    },[data]);

    async function deletePost(){
        try{
            const result = await axios.delete(`${process.env.REACT_APP_API}/posts/${data._id}`);
            console.log(result);
            if(result.data.message === 'success'){
                notifySuccess('post deleted successfully')
            }
            else{
                notifyError(result.data.message);
            }
        }
        catch(err){
            console.error(err);
            notifyError('post already deleted');
        }
    }

    return (
        <div className='flex flex-col my-5'>
            <div className='relative post rounded-xl flex flex-col bg-white overflow-hidden shadow'>
                <div className='p-5 mr-28'>
                    <div className='flex flex-row items-center pb-5'>
                        <div className=" border-2 border-blue-400 w-10 rounded-xl overflow-hidden h-10 bg-white">
                            <div dangerouslySetInnerHTML={{ __html: avatar }} />
                        </div>
                        <h1 className="text-3xl mx-3 text-blue-400">{data.username}</h1>
                    </div>
                    <p className="text-xl text-justify">{data.content}</p>
                </div>
                <div className="absolute h-full right-0 w-16 sm:w-24 flex flex-col justify-center items-center mx-5 border-l-2 border-blue-300">
                    <div className="flex flex-row items-center">
                        <img src={liked ? fullHeart : emptyHeart} alt="" onClick={()=>onLiked()} className="cursor-pointer"/>
                        <p className="text-xl pl-2" >{likes}</p>
                    </div>
                </div>
            </div>
            {poster ? 
                <button 
                    onClick={()=>deletePost()}
                    className="text-red-600 bg-white w-32 rounded-b-xl pb-2 mx-auto hover:scale-105 transition-transform transform"
                >
                    Delete This Post
                </button>
                :
                null
            }
        </div>
    )
}

export default Post
