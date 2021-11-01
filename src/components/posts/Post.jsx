import React, { useState, useEffect } from 'react'
import axios from 'axios'
import emptyHeart from '../../img/empty-h.png';
import fullHeart from '../../img/full-h.png';
import { Link } from 'react-router-dom';
import Comment from '../common/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../fontAwsome';

const Post = ({username, isAdmin, data, userId, notifyError, notifySuccess, poster=false}) => {

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(data.likes);
    const [avatar, setAvatar] = useState('');
    const [commentsHeigth, setCommentsHeigth] = useState('0');
    const [comments, setComments] = useState(data.comments);
    const [numberOfComments, setNumberOfComments] = useState(comments.length);
    const [commentToUpload, setCommentToUpload] = useState('');
    const [deleteBtnBg, setDeleteBtnBg] = useState('bg-white');
    const [isCancelled, setIsCancelled] = useState(true);

    async function onLiked(){
        if(!isCancelled){
            try{
                await axios.patch(`${process.env.REACT_APP_API}/posts/onlike?postid=${data._id}&userid=${userId}`);
                setLiked(!liked);
            }
            catch(err){
                console.error(err);
            }
        }
    }

    async function onComment(){
        if(commentsHeigth === '0'){
            setCommentsHeigth('auto');
            setDeleteBtnBg('bg-gray-300')
        }
        else{
            setCommentsHeigth('0');
            setDeleteBtnBg('bg-white')
        }
    }

    async function uploadComment(){
        if(!isCancelled){
            if(commentToUpload.length > 200){
                notifyError('comment is too large to upload ...');
            }
            else{
                try{
                    const result = await axios.post(`${process.env.REACT_APP_API}/posts/comment?postid=${data._id}&QueryUsername=${username}`,{ comment: commentToUpload});
                    if(result.data.message === 'success'){
                        notifySuccess('comment uploaded .');
                        setCommentToUpload('');
                    }
                    else {
                        notifyError(result.data.message);
                    }
                }
                catch(err){
                    notifyError('server error');
                    console.error(err);
                }
            }
            setNumberOfComments(numberOfComments+1);
        }
    }

    useEffect(()=>{
        setIsCancelled(false);
        if(!isCancelled){
            try{
                setLikes(data.likes);
                if(data.userWhoLikedThis.find(item => item === userId)){
                    setLiked(true);
                }
            }
            catch(err){
                console.error(err);
            }
        }
        return () => {
            setIsCancelled(true);
        }
    },[setLikes,data,userId, isCancelled]);

    useEffect(()=>{
        setIsCancelled(false);
        if(!isCancelled){
            const fetchLikes = async () => {
                try{
                    const results = await axios.get(`${process.env.REACT_APP_API}/posts/getlikes?postid=${data._id}`)
                    if(results.data.message === 'found'){
                        setLikes(results.data.data.likes)
                    }
                }
                catch(err){
                    console.error(err);
                }
            }
            fetchLikes();
        }
        return () => {
            setIsCancelled(true);
        }
    },[data,liked, isCancelled])

    useEffect(()=>{
        setIsCancelled(false);
        if(!isCancelled){
            const fetchComments = async () => {
                try{
                    const results = await axios.get(`${process.env.REACT_APP_API}/posts/getcomments?postid=${data._id}`)
                    if(results.data.message === "found"){
                        setComments(results.data.data.comments);
                    }
                }
                catch(err){
                    console.error(err);
                }
            }
            fetchComments();
        }
        return () => {
            setIsCancelled(true);
        }
    },[data,isCancelled])

    useEffect(()=>{
        setIsCancelled(false);
        if(!isCancelled){
            const fetch = async () => {
                const results = await axios.get(`https://avatars.dicebear.com/api/adventurer-neutral/${data.username}.svg`);
                setAvatar(results.data);
            }
            fetch();
        }
        return () => {
            setIsCancelled(true);
        }
    },[data, isCancelled]);

    async function deletePost(){
        if(!isCancelled){
            try{
                const result = await axios.delete(`${process.env.REACT_APP_API}/posts/${data._id}`);
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
    }

    return (
        <div className='flex flex-col my-5'>
            <div className='relative post rounded-xl flex flex-col z-10 bg-white overflow-hidden shadow'>
                <div  className='p-5 '>
                    <Link to={`/selecteduser/${data.username}`} className=' flex-row items-center mb-5 cursor-pointer inline-flex'>
                        <div className=" border-2 border-blue-400 w-10 h-10 rounded-xl overflow-hidden bg-white">
                            <div dangerouslySetInnerHTML={{ __html: avatar }} />
                        </div>
                        <h1 className="text-2xl sm:text-3xl mx-3 text-blue-400">{data.username}</h1>
                    </Link>
                    <p className="text-xl text-justify">{data.content}</p>
                </div>
                <div className="absolute h-full right-0 w-16 sm:w-24 grid grid-cols-2 content-center items-center gap-2 pl-3 justify-items-center mx-5 border-l-2 border-blue-300">
                        <img src={liked ? fullHeart : emptyHeart} alt="" onClick={()=>onLiked()} className="cursor-pointer"/>
                        <p className="text-xl " >{likes}</p>
                        <FontAwesomeIcon icon={['far','comment']} onClick={()=>onComment()} size={window.innerWidth<640 ? '1x' : '2x'} className="cursor-pointer" />
                        <p className="text-xl " >{comments.length}</p>
                </div>
            </div>
            <div className={`w-full h-${commentsHeigth}  bg-gray-300 overflow-hidden pt-3 flex flex-col shadow transform -translate-y-3 z-0 rounded-b-xl`}>
                {comments.length === 0 ? 
                    <h1 className='w-full text-center text-xl sm:text-2xl'>no comments yet</h1>
                    :
                    <div>
                        {comments.map(comment=>(
                            <Comment
                                key={comment._id}
                                comment={comment}
                            />
                        ))}
                    </div>
                }
                <div className='w-full flex flex-row p-2'>
                    <input 
                        type="text" 
                        name="comment" 
                        value={commentToUpload} 
                        onChange={(e)=>setCommentToUpload(e.target.value)}
                        placeholder='type what you feel ...'
                        className="bg-black text-white w-full rounded-xl border-blue-400 px-5"
                    />
                    <button 
                        onClick={()=>uploadComment()}
                        className="px-5 py-2 bg-blue-400 rounded-xl ml-3"
                    >
                        Submit
                    </button>
                </div>
            </div>
            {poster || isAdmin ? 
                <button 
                    onClick={()=>deletePost()}
                    className={`text-red-600 z-10 ${deleteBtnBg} w-32 rounded-b-xl pb-2 mx-auto hover:scale-105 transition-transform transform -translate-y-3`}
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
