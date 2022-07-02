import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  } from '../../redux/api';

import { motion , AnimatePresence } from 'framer-motion';


import './RegisterScreen.css';

export default function RegisterScreen() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [getUserRegistered] = 
    console.log(username, email, password);
   

    const SubmitHandler = async (e) => {
        e.preventDefault();
        await getUserRegistered({username, email, password})
        console.log(username);

        setUsername('')
        setEmail('');
        setPassword('');
    }
  
    return (
      <AnimatePresence>
    <motion.div className='register-container'
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    exit={{ opacity: 0}}
    >
        <div className='register-first'>
            <div className='register-inputs'>
                <form onSubmit={SubmitHandler}>
                <span>Create Account</span>
                <div className='register-inputs-info'>
                    <label htmlFor='username'>Username</label>
                    <input name='username' type='text' placeholder='Jake' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='register-inputs-info'>
                    <label htmlFor='email'>Email</label>
                    <input name='email' type='text' placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='register-inputs-info'>
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value) } />
                </div>
                <div className='register-inputs-info'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input name='confirmPassword' type='password' placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className='register-inputs-button'>
                    <button>Create account</button>
                </div>
                </form>

                <div className='register-inputs-login'>
                    <Link to='/login'>Login</Link>
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
