import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser} from 'react-icons/ai';
import { FiLock } from 'react-icons/fi'
import { motion , AnimatePresence } from 'framer-motion';
import { useLoginMutation } from '../../redux/authApi';
import { setCredentials } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';


import './LoginScreen.css';
export default function LoginScreen() {
    const userRef = useRef();
    const [user, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    console.log(user);
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ user, password}).unwrap();
            console.log(userData);
            dispatch(setCredentials({ ...userData, user}))
            setUsername('');
            setPassword('');
            navigate('/forum')
        } catch (error) {
            const { data } = error;
            console.log(data)
            if (data.message === "User doesn't exist") {
                console.log('ne radi .')
            }
            
            
            console.log(error);
        }
    }
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
                <form onSubmit={handleSubmit}>
                <div className='login-inputs'>
                <AiOutlineUser />
                <input name='username' type='text' value={user} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='login-inputs'>
                <FiLock />
                <input name='password' type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='login-inputs-button'>
                <button>Sign in</button>
                </div>
                </form>

                <div className='login-inputs-links'>
                    <Link to='/register'><p>Create account?</p></Link>
                    <p>Forgot your password?</p>
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
