import React, { useEffect, useState }from 'react'
import { useUpdatedPasswordForgotPasswordMutation, useVerifyForgotPasswordTokenQuery } from '../../../redux/usersApi/usersApi';
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ForgottenPassword.css'
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function ForgottenPassword() {
    const [color, setColor] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [success, setSuccess] = useState(null);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const { token } = useParams();
    console.log(disabled, 'disabled')
    const {data, isSuccess, isError} = useVerifyForgotPasswordTokenQuery(token)
    const [UpdatedPasswordForgotPassword] = useUpdatedPasswordForgotPasswordMutation();
    console.log(data, isSuccess, isError)
    
    const changeValueOfPassword = (e) => {
        setPassword(e.target.value)
    }
    const changeValueOfConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    console.log(password);

   
    console.log(validPassword);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword)


    }, [password, confirmPassword])

    // useEffect(() => {
    //     if(validPassword && validConfirmPassword) {
    //         setDisabled(true);
    //     }
    // }, [disabled, validPassword, validConfirmPassword])

    const updatePassword = async(e) => {
        e.preventDefault();
        setDisabled(false);

        try {
             const { data } = await UpdatedPasswordForgotPassword({token, password}).unwrap();
             console.log(data);
            setPassword('');
            setConfirmPassword('');
            setSuccess(true);
            // navigate('/login')
        } catch (error) {
            const { data } = error;
            setError(data.message)
            console.log(error);
        }
    }

    const isEveryBoolean = [validPassword, validConfirmPassword, disabled].every(Boolean)

    useEffect(() => {
        if(error) {
            const timer = setTimeout(() => {
                setError(false);
            }, [4000])
            return () => clearTimeout(timer);
        }
    }, [error])
    let content;

    if(isError) {
        content = (
            <>
            <Header children={color} />
                <div className='forgottenpassword-container'>
                <div className='forum-page-first'>
                        <div className='forum-page-full'>
                            <p>Reset password</p>
                        </div>
                    </div>
                    {/* <div>
                        <span>Unknown token, try again.</span>
                    </div> */}
                    <div className='forgotten-error'>
                        <p>Something went wrong, please try again.</p>
                    </div>
                </div>
    
            <Footer />
        </>
        )
    }
    if(isSuccess) {
        content = (
            <>
            <Header children={color} />
                <div className='forgottenpassword-container'>
                <div className='forum-page-first'>
                        <div className='forum-page-full'>
                            <p>Reset password</p>
                        </div>
                    </div>
                    {/* <div>
                        <span>Unknown token, try again.</span>
                    </div> */}
                    <div className='forgotten-password-second-container'>
                        <form onSubmit={updatePassword}>
                        <p className='password-below-p'>Enter your password below </p>
                        <div className='forgotten-password-cell'>
                            {
                                error && (
                                    <div className='error-forgotten'>
                                        {error}
                                    </div>
                                )
                            }
                            {
                                success && (
                                    <div className='success-forgotten'>
                                        <span>You have successfully updated your password, you can <Link to='/login'>login</Link> now</span>
                                    </div>
                                )
                            }
                            <span className='span-padding'>New password:</span>
                            <input type='password' name='password' value={password}  aria-invalid={validPassword ? 'false' : 'true'} onChange={changeValueOfPassword} />
                            <span className='forgotten-under-input'>
                                4 to 24 characters,
                               must include uppercase and lowercase letters,
                               must include a number and a special character,
                               special characters allowed: ! @ # $ %.
                               </span>
                        </div>
                        <div className='forgotten-password-cell'>
                            <span className='span-padding'>Confirm new password:</span>
                            <input type='password' name="confirmPassword" value={confirmPassword} onChange={changeValueOfConfirmPassword} />
                            <span className='forgotten-under-input'>
                               Both passwords must match.
                               </span>
                        </div>
                        <div>
                        <button disabled={!isEveryBoolean}>Reset password</button>

                        </div>
                        </form>
                    </div>
                </div>
    
            <Footer />
        </>
        )
    }
 return content;
}

export default ForgottenPassword