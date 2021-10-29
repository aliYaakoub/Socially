import React,{ useState } from 'react';
import Input from '../common/Input'
import axios from 'axios';

const Login = ({setUserId, setUsername, setLoggedIn, notifyError, notifySuccess, setPage}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit(e){
        e.preventDefault();
        try{
            const results = await axios(`${process.env.REACT_APP_API}/users/login?email=${email}&password=${password}`);
            if(results.data.message === 'welcome'){
                setLoggedIn(true);
                setUserId(results.data.userId);
                setUsername(results.data.username);
                notifySuccess('welcome')
            }
            else{
                notifyError('error in the server')
            }
        }
        catch(err){
            setPassword('')
            notifyError('incorrect email or password');
            console.log(err);
        }
    }

    return (
        <div className='container backdrop shadow'>
            <h1 className='text-2xl'>Please login</h1>
            <form onSubmit={(e)=>onSubmit(e)}>
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
                    Login
                </button>
              <p className="text">Don't have an account? <span onClick={()=>setPage('register')}>Register</span> </p>
            </form>
        </div>
    )
}

export default Login
