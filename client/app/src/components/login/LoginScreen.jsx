import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi'
import { motion , AnimatePresence } from 'framer-motion';
import { useLoginMutation, useUserStateQuery } from '../../redux/authApi';
import { setCredentials } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';



import './LoginScreen.css';
export default function LoginScreen() {
    const userRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [input, setInput] = useState(false);
    const [error, setError] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();


   

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if(username && password) {
            try {
                await login({ username, password}).unwrap();;
                // console.log('asesaesaesaesae', userData);
                // dispatch(setCredentials({ ...userData}))
                setUsername('');
                setPassword('');
                navigate('/forum')
            } catch (error) {
                const { data } = error;
                // console.log(data)
                // setError(data)
                
                setError(data.message ? data.message : data)
                
                console.log(error);
            }
        } else {
            // setError('We need username and passsword to continue')
        }
    }
    // useEffect(() => {
    //     userRef.current.focus();
    // })
  return (
    <AnimatePresence>
    <motion.div className='login-container'
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    exit={{ opacity: 0}}
    >
        <div className='login-first-container'>
            <div className='login-icons'>
                <span className='signin'>Sign in</span>
                {
                    error && <div  className='error-container' >
                        <p>{error}</p>
                    </div>
                }
                <form onSubmit={handleSubmit}>
                <div className='login-inputs'>
                <AiOutlineUser />
                <input name='username' type='text' value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} ref={userRef} />
                </div>
                <div className='login-inputs'>
                <FiLock />
                <input name='password' type={input ? 'text' : 'password'} value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                
                {
                    input ? <AiFillEyeInvisible className='text-password'  onClick={() => setInput(!input)} /> : <AiFillEye className='text-password' onClick={() => setInput(!input)}/> 
                }

                </div>
                <div className='login-inputs-button'>
                <button>Sign in</button>
                </div>
                </form>

                <div className='login-inputs-links'>
                    <Link to='/register'><p>Create account?</p></Link>
                    <Link to='/resetpassword'><p>Forgot your password?</p></Link>

                </div>
            </div>
            
        </div>
        <div className='footer-login'>
            <div className='footer-login-first'>
                <ul>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Support</li>
                </ul>
            </div>
            <div className='footer-login-second'>
                Copyright &copy; 2022 xeqtrTC
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
  )
}
