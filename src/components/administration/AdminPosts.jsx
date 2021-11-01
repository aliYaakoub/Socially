import React, { useState, useEffect }from 'react'
import axios from 'axios'
import AdminPost from './AdminPost'

const AdminPosts = ({notifyError, notifySuccess}) => {

    const [posts, setPosts] = useState([]);
    const [isCancelled, setIsCancelled] = useState(true);

    useEffect(() =>{
        setIsCancelled(false);
        if(!isCancelled){
            const fetch = async () =>{
                try{
                    const results = await axios(`${process.env.REACT_APP_API}/adminPost`)
                    setPosts(results.data);
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
    },[posts, isCancelled]);

    return (
        <div className="text-black posts flex flex-col mx-auto mt-10 ">
            {posts.length === 0 ? 
                null
                :
                <div>
                    <h1 className="text-center text-2xl">admins posts</h1>
                    {posts.map(post => (
                        <AdminPost
                            data={post} 
                            key={post._id}
                            notifySuccess={(msg)=>notifySuccess(msg)}
                            notifyError={(msg)=>notifyError(msg)}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default AdminPosts
