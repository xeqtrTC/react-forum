import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../../redux/usersApi/usersApi';
import Footer from '../../Footer/Footer';
import Header from '../../header/Header'

import './AskForEmailForgotten.css'
const EMAIL_REGEX = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u

export default function AskForEmailForgotten() {
    const [color, setColor] = useState(true);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [ForgotPassword] = useForgotPasswordMutation();

    const changeValueOfEmail = (e) => {
        setEmail(e.target.value)
    }

    const sendEmail = async(e) => {
        e.preventDefault();
        try {
            if(email) {
                await ForgotPassword({email}).unwrap();
                setEmailSuccess(true);
                setEmail('');
            }

        } catch (error) {
            console.log(error);
        }
    }
    
    let emailSuccessButton = null;
    if(emailSuccess) {
        emailSuccessButton = (
            <div className='success-email'>
                <span>Check your email</span>
            </div>
        )
    }

    const combinedButtons = (
        <>
        {emailSuccessButton}
        </>
    )
    useEffect(() => {
        if(emailSuccess) {
            const timer = setTimeout(() => {
                setEmailSuccess(false);
            }, [4000])

            return () => clearTimeout(timer);
        }
    }, [emailSuccess])
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    const isEveryValid = [email, validEmail].every(Boolean);
  return (
    <>
        <Header children={color} />
        <div className='askforemail-container'>
                <div className='forum-page-first'>
                    <div className='forum-page-full'>
                        <p>Reset password</p>
                    </div>
                </div>
                <div className='askforemail-second-container'>
                <form onSubmit={sendEmail}>

                    {combinedButtons}
                    

                    <div className='forgotpassword-question'>
                            <span className='forgot-question'>
                                Forgot password?
                            </span>
                            <span className='text-forgot'>
                                Enter your email address and we will send you a link to reset your password.
                            </span>
                            <input type='email' value={email} onChange={changeValueOfEmail} />
                            <div className='askforemail-button'>
                                <button disabled={!isEveryValid}>Reset password</button>

                            </div>
                    </div>
                    </form>


                </div>
        </div>
        

        <Footer />

    </>
  )
}
