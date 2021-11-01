import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AdminPost = ({poster, data, notifyError, notifySuccess}) => {

    const [isCancelled, setIsCancelled] = useState(true);

    async function deletePost(){
        if(!isCancelled){
            try{
                const result = await axios.delete(`${process.env.REACT_APP_API}/adminPost/${data._id}`);
                if(result.data.message === 'deleted'){
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

    useEffect(()=>{
        setIsCancelled(false);
        return () => {
            setIsCancelled(true);
        }
    },[setIsCancelled])

    return (
        <div className='flex flex-col my-5'>
            <div className='relative post rounded-xl flex flex-col z-10 bg-blue-400 overflow-hidden shadow'>
                <div  className='p-5 text-white'>
                    <h1 className="text-2xl sm:text-3xl mx-3 mb-5 text-center">{data.username}</h1>
                    <p className="text-xl text-center">{data.content}</p>
                </div>
            </div>
            {poster ? 
                <button 
                    onClick={()=>deletePost()}
                    className={`text-red-600 z-10 bg-blue-400 w-32 rounded-b-xl pb-2 mx-auto hover:scale-105 transition-transform transform `}
                >
                    Delete This Post
                </button>
                :
                null
            }
        </div>
    )
}

export default AdminPost
