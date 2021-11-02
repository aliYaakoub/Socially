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
    const [commentsHeigth, setCommentsHeigth] = useState('hidden');
    const [comments, setComments] = useState(data.comments);
    const [numberOfComments, setNumberOfComments] = useState(comments.length);
    const [commentToUpload, setCommentToUpload] = useState('');
    const [deleteBtnBg, setDeleteBtnBg] = useState('bg-white');
    const [isCancelled, setIsCancelled] = useState(true);
    const [likeLoading, setLikeLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [date] = useState(data.date.slice(0,10));

    async function onLiked(){
        if(!isCancelled){
            try{
                if(!likeLoading){
                    setLikeLoading(true);
                    await axios.patch(`${process.env.REACT_APP_API}/posts/onlike?postid=${data._id}&userid=${userId}`);
                    setLiked(!liked);
                    setLikeLoading(false);
                }
            }
            catch(err){
                console.error(err);
            }
        }
    }

    async function onComment(){
        if(commentsHeigth === 'hidden'){
            setCommentsHeigth('flex');
            setDeleteBtnBg('bg-gray-300')
        }
        else{
            setCommentsHeigth('hidden');
            setDeleteBtnBg('bg-white')
        }
    }

    async function uploadComment(){
        setIsPosting(true);
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
                    setIsPosting(false);
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
            <div className='relative post rounded-xl flex flex-col sm:flex-row justify-between z-10 bg-white overflow-hidden shadow'>
                <div  className='p-5 border-b sm:border-none border-blue-400 w-full'>
                    <Link to={`/selecteduser/${data.username}`} className=' flex-row w-full pr-28 items-center mb-5 cursor-pointer inline-flex'>
                        <div className=" border-2 border-blue-400 w-10 h-10 rounded-xl overflow-hidden bg-white">
                            <div dangerouslySetInnerHTML={{ __html: avatar }} />
                        </div>
                        <div className='flex flex-col justify-center mx-3 text-blue-400'>
                            <h1 className="text-2xl sm:text-3xl">{data.username}</h1>
                        </div>
                    </Link>
                    <p className="text-xl text-justify sm:pr-28">{data.content}</p>
                </div>
                <div className="sm:absolute sm:right-0 h-full sm:w-24 sm:flex-col flex flex-row  justify-around sm:grid-cols-1 w-full content-center items-center gap-2 pl-3 mx-5 sm:border-l-2 border-blue-300">
                        <div className="flex flex-row sm:grid mt-auto sm:grid-cols-2 justify-items-center content-center items-center gap-2 w-full">
                            <img src={liked ? fullHeart : emptyHeart} alt="" onClick={()=>onLiked()} className="cursor-pointer"/>
                            <p className="text-xl " >{likes}</p>
                        </div>
                        <div className="flex flex-row sm:grid sm:grid-cols-2 justify-items-center content-center items-center gap-2 w-full">
                            <FontAwesomeIcon icon={['far','comment']} onClick={()=>onComment()} size='2x' className="cursor-pointer " />
                            <p className="text-xl " >{comments.length}</p>
                        </div>
                        <div className="flex flex-col date sm:mt-auto sm:mb-3">
                            <p className='w-32 sm:w-full'>{date}</p>
                            {/* <p className='w-full'>{time}</p> */}
                        </div>
                </div>
            </div>
            <div className={`w-full ${commentsHeigth}  bg-gray-300 overflow-hidden pt-3 flex-col shadow transform -translate-y-3 z-0 rounded-b-xl`}>
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
                        placeholder='type your comment here  ...'
                        className="bg-black text-white w-full rounded-xl border-blue-400 px-5"
                    />
                    <button 
                        onClick={()=>uploadComment()}
                        className="px-5 py-2 bg-blue-400 rounded-xl ml-3"
                        disabled={isPosting ? true : false}
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
