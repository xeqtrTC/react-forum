import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useRegisteruserMutation } from '../../redux/registerSlice/registerSlice'

const regexV1 = /^[a-zA-Z]+\s[a-zA-Z]+$/g;
const regexv2 = /[A-Z][a-z]+_[A-Z][a-z]+/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u

export default function Register() {
    const [Registeruser, { isLoading: isLoadingRegister }] = useRegisteruserMutation()

    const [validCharacter, setValidUsername] = useState(false);

    const [validPasswordFocus, setValidPasswordFocus] = useState(false);
    const [validPassword, setvalidPassword] = useState(false);

    const [validConfirmPasswordFocus, setValidConfirmPasswordFocus] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const [validEmailFocus, setValidEmailFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(false);

    const [errorRegister, setErrorRegister] = useState(null);

    

    const [registerStates, setRegisterStates] = useState({
        characterName: '',
        password: '',
        confirmPassword: '',
        emailAddress: '',
        referral: ''
    })
    const handleChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;
        const value = e.target.value;
        setRegisterStates(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const everyBoolean = [validCharacter, validPassword, validConfirmPassword, validEmail].every(Boolean)


    console.log('daa', registerStates.characterName)
    console.log('eeeeeeeeh', regexv2.test(registerStates.characterName))
    const registerUserFunction = async(e) => {

        e.preventDefault();
            try {
                if(everyBoolean) {
                    await Registeruser({registerStates}).unwrap();
                    setRegisterStates({
                        characterName: '',
                        password: '',
                        confirmPassword: '',
                        emailAddress: '',
                        referral: '',
                    })
                }
                setErrorRegister('');
            } catch (error) {
                const { data } = error;
                console.log(data);

                setErrorRegister(data?.message)
            }
        }
        
    
    


    let invalidPasswordButton = null;

    if(validPasswordFocus && registerStates.password && !validPassword) {
        invalidPasswordButton = (
            <div className='flex'>
                        <div className='w-44'>
    
                        </div>
                        <div className='mt-2'>
                            <ul className='text-xs text-[#cccccc] font-normal'> 
                                <li>4 to 24 characters.</li>
                                <li>Must include uppercase and lowercase letters.</li>
                                <li>Must include a number and a special character.</li>
                                <li>Special characters allowed: ! @ # $ %</li>
                            </ul>
                        </div>
                    </div> 
        )
    }
    console.log('acabbbbb', validConfirmPassword)
    let invalidConfirmPasswordButton = null;
    if(validConfirmPasswordFocus && !validConfirmPassword) {
        invalidConfirmPasswordButton =  (
            <div className='flex'>
                        <div className='w-44'>
    
                        </div>
                        <div className='mt-2'>
                            <ul className='text-xs text-[#cccccc] font-normal'> 
                                <li>Confirm password do not match password.</li>

                            </ul>
                        </div>
                    </div>
        )
    }

    let invalidEmailButton = null;

    if(validEmailFocus && registerStates.emailAddress && !validEmail) {
        invalidEmailButton = (
            <div className='flex'>
                        <div className='w-44'>
    
                        </div>
                        <div className='mt-2'>
                            <ul className='text-xs text-[#cccccc] font-normal'> 
                                <li>Please enter valid email.</li>
                                <li>If there is any problem, please contact our support.</li>
                            </ul>
                        </div>
                    </div>
        )
    }
    
    let errorMessageButton = null;
    console.log('aaaaaaaaaaa', errorRegister)
    if(errorRegister) {
        errorMessageButton = (
            <div className='flex justify-center w-3/5 mt-2 p-1.5 rounded m-auto bg-black'>
                {errorRegister}
            </div>
        )
    }

    console.log(errorRegister, 'aaaaaaaaaa')


    useEffect(() => {
        setValidUsername(regexv2.test(registerStates.characterName))
    }, [registerStates.characterName])
    useEffect(() => {
        setvalidPassword(PASSWORD_REGEX.test(registerStates.password))
        setValidConfirmPassword(registerStates.password === registerStates.confirmPassword)
    }, [registerStates.password, registerStates.confirmPassword])
   
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(registerStates.emailAddress))
    }, [registerStates.emailAddress])

    console.log('everi', everyBoolean)
  return (
    <div>
        <div className='flex flex-col'>
            <span className='text-lg'>Create a new character</span>
            <span className='text-sm text-[#cccccc]'>Registering is easy and takes no longer than 2 minutes. We will send you a confirmation e-mail to activate your account - after that you will be able to connect to the server.</span>
        </div>
        
        {errorMessageButton}
        <div className='flex justify-center mt-5'>
            <form onSubmit={registerUserFunction}>
            <div className='flex flex-col font-bold outline-none'>
                <div className='flex py-1.5'>
                    <div className='w-44 flex items-center'>
                        <span>Character name*</span>
                    </div>

                    <input type='text' name='characterName' value={registerStates.characterName} onChange={handleChange} placeholder='FirstName_LastName' className={`w-72 p-1.5 border-2 ${validCharacter ? 'border-[#064780]' : null } outline-none text-sm font-normal px-2 text-black  bg-white	placeholder: text-xs`} />
                </div>
                <div className='py-1.5'>
                    <div className='flex'>
                        <div className='w-44 flex items-center'>
                            <span>Password*</span>
                        </div>
                        <input type='password' onFocus={() => setValidPasswordFocus(true)} onBlur={() => setValidPasswordFocus(false)}  name='password' value={registerStates.password} onChange={handleChange} className={`w-72 p-1.5 border-2 ${validPassword ? 'border-[#064780]' : null}  outline-none text-sm font-normal px-2 text-black placeholder: text-xs`} />
            
                    </div>
                    {invalidPasswordButton}
                {/* <div className='flex'>
                    <div className='w-44'>

                    </div>
                    <div className='mt-2'>
                        <ul className='text-xs text-[#cccccc] font-normal'> 
                            <li>4 to 24 characters.</li>
                            <li>Must include uppercase and lowercase letters.</li>
                            <li>Must include a number and a special character.</li>
                            <li>Special characters allowed: ! @ # $ %</li>
                        </ul>
                    </div>
                </div>         */}
                    
                </div>
                <div className='py-1.5'>
                    <div className='flex'>
                    <div className='w-44 flex items-center'>
                        <span>Confirm password*</span>
                    </div>
                        <input type='password' name='confirmPassword' onFocus={() => setValidConfirmPasswordFocus(true)} onBlur={() => setValidConfirmPasswordFocus(false)} value={registerStates.confirmPassword} onChange={handleChange} className={`w-72 border-2 ${validConfirmPassword && registerStates.password.length > 0 ? 'border-[#064780]' : null} p-1.5 outline-none text-sm font-normal px-2 text-black placeholder: text-xs`} />
                    </div>
                    {invalidConfirmPasswordButton}
                     
                </div> 
                <div className='py-1.5'>
                    <div className='flex'>
                        <div className='w-44 flex items-center'>
                            <span>Email address*</span>
                        </div>
                        <input type='text' name='emailAddress' onFocus={() => setValidEmailFocus(true)} onBlur={() => setValidEmailFocus(false)} value={registerStates.emailAddress} onChange={handleChange} className={`w-72 p-1.5 border-2 ${validEmail ? 'border-[#064780]' : null } outline-none text-sm font-normal px-2 text-black placeholder:text-xs`} />
                    </div>
                        {invalidEmailButton}
                </div>
                <div className='flex py-1.5'>
                    <div className='w-44 flex items-center'>
                        <span>Referral</span>
                    </div>
                    <input type='text' name='referral' value={registerStates.referral} onChange={handleChange} placeholder='Leave this field empty if you are unsure.' className='w-72 p-1.5 border-2 outline-none text-sm font-normal px-2 text-black placeholder: text-xs ' />
                </div>
                <div className='flex justify-center text-sm mt-3 font-bold '>
                <button disabled={everyBoolean === false} className={`bg-[#0862A4] text-[#D0D2D3] w-full p-2  rounded cursor-pointer hover:bg-[#064780] disabled:cursor-not-allowed` }>{isLoadingRegister ? <div className='flex justify-center'><svg className="animate-spin h-5 w-5 mr-3 bg-white flex justify-center" viewBox="0 0 24 24" /></div>: 'Register your character'}</button>
                </div>
                
            </div>
            </form>
        </div>
    </div>
  )
}
