import React, { useState, useEffect }from 'react'
import axios from 'axios'
import Post from './Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../fontAwsome'

const Posts = ({userId, notifySuccess, notifyError}) => {

    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [max, setMax] = useState(0);
    const limitInc = 10;

    useEffect(() =>{
        const fetch = async () =>{
            try{
                const results = await axios(`${process.env.REACT_APP_API}/posts?page=1&limit=${limit}`)
                setPosts(results.data.filteredPosts);
                setMax(results.data.max)
                console.log(results);
            }
            catch(err){
                console.error(err);
            }
        }
        fetch();
    },[limit])

    return (
        <div className="text-black posts flex flex-col mx-auto mt-10 mb-10">
            {posts.map(post => (
                <Post 
                    userId={userId}
                    data={post} key={post._id} 
                    notifySuccess={(msg)=>notifySuccess(msg)}  
                    notifyError={(msg)=>notifyError(msg)}
                />
            ))}
            {posts.length === max ? 
                null
            :
                <FontAwesomeIcon icon={['far','plus-square']} size="4x" className="mx-auto text-blue-400 my-10 cursor-pointer" onClick={()=>setLimit(limit+limitInc)}/>
            }
        </div>
    )
}

export default Posts
