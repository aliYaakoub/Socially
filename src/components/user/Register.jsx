import React, { useState } from 'react';
import Input from '../common/Input';
import axios from 'axios';

const Register = (props) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit(e){
        e.preventDefault();
        if(name.length < 5){
            return props.notifyError('name must be at least 5');
        }
        else if(name.length > 20)      {
            return props.notifyError('name is too large');
        }
        else if(username.length < 5)      {
            return props.notifyError('username must be at least 5');
        }
        else if(username.length > 15)      {
            return props.notifyError('username is too large');
        }
        else if(password.length < 5)      {
            return props.notifyError('password must be at least 5');
        }
        else if(password.length > 50)      {
            return props.notifyError('password must be less than 50 characters');
        }
        const results = await axios.post(`${process.env.REACT_APP_API}/users/register?name=${name}&username=${username}&email=${email}&password=${password}`);
        // console.log(results);
        if(results.data.message === 'success'){
            props.notifySuccess('registered successfully');
            props.setPage('login');
        }
        else{
            setEmail('');
            setPassword('');
            props.notifyError(results.data.message);
        }
    }

    return (
        <div className='container backdrop shadow'>
            <h1 className='text-2xl'>Please login</h1>
            <form onSubmit={(e)=>onSubmit(e)}>
                <Input 
                    label={name.length>0? '':'Name : '}
                    name='name' 
                    type="text" 
                    value={name} 
                    required={true}
                    onChange={(e)=>setName(e.target.value)}
                />
                <Input 
                    label={username.length>0? '':'Username : '}
                    name='username' 
                    type="text" 
                    value={username} 
                    required={true}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <Input 
                    label={email.length>0? '':'Email : '}
                    name='email' 
                    type="email" 
                    value={email} 
                    required={true}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <Input 
                    label={password.length>0? '':'Password : '}
                    name='password' 
                    type="password" 
                    value={password} 
                    required={true}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button 
                    className="btn text-black" 
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
