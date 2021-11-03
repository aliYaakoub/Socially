import React,{ useState, useEffect } from 'react';
import Input from '../common/Input'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../fontAwsome';

const Login = ({setUserId, setIsAdmin, setUsername, setLoggedIn, notifyError, notifySuccess, setPage}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCancelled, setIsCancelled] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(e){
        e.preventDefault();
        setIsLoading(true);
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
                setIsLoading(false);
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
        <div>
            <div className='container relative shadow'>
                {isLoading ? <h1 className='text-2xl'>Loading ...</h1> : <h1 className='text-2xl'>Please login</h1>}
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
            <div className="sm:absolute bottom-10 transform justify-around flex flex-row w-full footer ">
                <div className="text-white text-center flex flex-row items-center">
                    <FontAwesomeIcon icon={['fas','code']} size='1x' />
                    <p className="ml-3 font-bold">By Ali Yaakoub</p>
                </div>
                <a href="https://github.com/aliYaakoub/Socially" target='_blank' rel="noreferrer"className="text-white flex flex-row items-center">
                    <FontAwesomeIcon icon={['fab','github']} size="2x" />
                    <p className="ml-3 font-bold underline">See on Github</p>
                </a>
            </div>
        </div>
    )
}

export default Login
