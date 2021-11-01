import React from 'react'
import axios from 'axios'

const UsersTable = ({data, notifyError, notifySuccess}) => {

    async function deleteUser(){
        try{
            const result = await axios.delete(`${process.env.REACT_APP_API}/users/deleteUser/${data._id}`);
            if(result.data.message === 'deleted'){
                notifySuccess('user deleted successfully')
            }
            else{
                notifyError(result.data.message)
            }
        }
        catch(err){
            console.error(err);
        }

    }

    return (
        <tr>
            <td>{data.username}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td onClick={()=>deleteUser()} className='bg-red-400 cursor-pointer'>delete</td>
        </tr>
    )
}

export default UsersTable
