import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SelectedProfile = (props) => {

    const [data, setData] = useState([]);

    const username = props.match.params.username;

    useEffect(() =>{
        const fetch = async () => {
            const result = await axios(`${process.env.REACT_APP_API}/users/user?userN=${username}`);
            console.log(result.data);
            console.log(username, '5');
        }
        fetch();
    },[username]);

    return (
        <div>
            <h1 className="text-black">hello {username}</h1>
        </div>
    )
}

export default SelectedProfile
