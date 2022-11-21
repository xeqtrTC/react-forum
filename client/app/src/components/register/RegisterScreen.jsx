import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/authApi';
import { motion , AnimatePresence } from 'framer-motion';
import './RegisterScreen.css';
import PasswordStrength from './PasswordStrength.jsx';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u

export default function RegisterScreen() {
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('')
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    console.log(validName);
    console.log(username);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('')
    const [validPassword, setvalidPassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);
    console.log(userFocus);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setvalidConfirmPassword] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);
  
    const [error, setError] = useState('');
    const [register] = useRegisterMutation();
    const [pass, setpass] = useState('');
    

    const isEveryInputFilled = [username, email, password, confirmPassword].every(Boolean)
    const isEveryInputValid = [validName, validPassword, validEmail, validConfirmPassword].every(Boolean)
    console.log(isEveryInputValid)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USERNAME_REGEX.test(username);
        const v2 = PASSWORD_REGEX.test(password); // if user somehow bypasses JS, catches him
        const v3 = EMAIL_REGEX.test(email)
        if (!v1 || !v2 || !v3) {
            setError('Please fill all fields');
            return;
        }
        try {
            await register({username, email, password}).unwrap(); // unwrap() for destruction of error message
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // navigate('/nice', {state: {email}})
        } catch (error) {
            const { data } = error;
            if(data.message === 'Username already in use.') {
                setError('Username already in use')
            } else if ( data.message === 'Email already in use.') { 
                setError('Email already in use')
            } else if ( data.message === 'Please check your email and verificate your account') {
                setpass('Please check your email and verificate your account')
            }
        }
    }


    useEffect(() => {
        userRef.current.focus()
    }, [])
   
    useEffect(() => {
        setValidName(USERNAME_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setvalidPassword(PASSWORD_REGEX.test(password));
        setvalidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setError('');
    }, [username, password, confirmPassword])




    return (
        <>
        <div className='register-first'>
            <div className='register-inputs'>
                <form onSubmit={handleSubmit}  >
                <span>Create Account</span>
                
                {
                    error && <div  className='error-container' >
                        <p>{error}</p>
                    </div>
                }
                {
                    pass && <div className='pass-container'>
                        <p>{pass}</p>
                    </div>
                }
               
                <div className='register-inputs-info'>

                    <label htmlFor='username'>Username</label>
                    <input name='username' onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} aria-invalid={validName ? 'false' : 'true' } value={username} ref={userRef} type='text' placeholder='Jake' onChange={(e) => setUsername(e.target.value)} />

                    <div  className={userFocus && username && !validName ? 'dont-hide': 'hide'}
                       
                    >
                        <ul className='ul-list'>

                            <li>4 to 24 characters.</li>
                            <li>Must start with a letter.</li>

                        </ul>
                    </div>


                </div>
                <div className='register-inputs-info'>
                    <label htmlFor='email'>Email</label>
                    <input name='email' onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} aria-invalid={validEmail ? 'false' : 'true' } value={email}  type='email' placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} />
                    
                    <div className={emailFocus && email && !validEmail ? 'dont-hide': 'hide'}>
                        <ul className='ul-list'>

                            <li>Please enter valid email.</li>
                            <li>If there is any problem, please contact our support.</li>
                            
                        </ul>
                    </div>
                
                </div>
                <div className='register-inputs-info'>
                    <label htmlFor='password'>Password</label>
                    <input name='password' value={password} onFocus={() => setpasswordFocus(true)} onBlur={() => setpasswordFocus(false)}  aria-invalid={validPassword ? 'false' : 'true'} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value) } />
                    {
                        password.length > 0 && <PasswordStrength password={password}/>
                    }
                    <div className={passwordFocus && password && !validPassword ? 'dont-hide-password': 'hide'}>
                        
                        <ul className='ul-list'>

                            <li>4 to 24 characters.</li>
                            <li>Must include uppercase and lowercase letters.</li>
                            <li>Must include a number and a special character.</li>
                            <li>Special characters allowed: ! @ # $ %</li>

                        </ul>
                    
                    </div>
                </div>
                <div className='register-inputs-info'>

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input name='confirmPassword' aria-invalid={validConfirmPassword ? 'false' : 'true'} onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)}  type='password' placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)} />
                    
                    <div className={matchFocus && !validConfirmPassword ? 'dont-hide': 'hide'}>
                        
                        <ul className='ul-list'>

                            <li>Confirm password do not match password.</li>
                             
                        </ul>
                    
                    </div>

                </div>
                <div className='register-inputs-button'>
                    <button disabled={!isEveryInputValid} style={{ color: `${!isEveryInputValid ? "white" : 'white'}`, cursor: `${!isEveryInputValid ? "not-allowed" : 'pointer'}`}}>Create account</button>
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
        </>
  )
}
