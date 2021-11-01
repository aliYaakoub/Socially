import React,{ useState, useEffect } from 'react';
import Input from '../common/Input'
import axios from 'axios';

const Login = ({setUserId, setIsAdmin, setUsername, setLoggedIn, notifyError, notifySuccess, setPage}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCancelled, setIsCancelled] = useState(true);

    async function onSubmit(e){
        e.preventDefault();
        if(!isCancelled){
            try{
                const results = await axios(`${process.env.REACT_APP_API}/users/login?email=${email}&password=${password}`);
                if(results.data.message === 'welcome'){
                    setUserId(results.data.userId);
                    setUsername(results.data.username);
                    notifySuccess('welcome')
                    setIsAdmin(results.data.isAdmin);
                    setLoggedIn(true);
                }
                else{
                    notifyError(results.data.message)
                }
            }
            catch(err){
                setPassword('')
                notifyError('error in the server');
                console.log(err);
            }
        }
    }

    useEffect(()=>{
        setIsCancelled(false);
        return () =>{
            setIsCancelled(true);
        }
    },[isCancelled])

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
