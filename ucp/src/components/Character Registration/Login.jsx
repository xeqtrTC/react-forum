import React, { useState } from 'react'
import { useLoginUcpUserMutation } from '../../redux/loginSlice/loginSlice';
import { useNavigate } from 'react-router-dom'

export default function Login({ third_flip, dispatch}) {

    const [characterName, setCharacterName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const changeCharacterName = (e) => {
        setCharacterName(e.target.value);
    }
    const changePasswordValue = (e) => {
        setPassword(e.target.value)
    }
    const [LoginUcpUser] = useLoginUcpUserMutation();

    const loginUserFunction = async(e) => {
        e.preventDefault();
        const username = characterName
        
        try {
            if(username && password) {
                await LoginUcpUser({username, password}).unwrap();
                setPassword('');
                setCharacterName('');
                navigate('/profile')
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <span className='text-sm'>Login to your character</span>
        <div className='flex justify-center'>
            <div className='flex-col'>
                <div className='p-1.5 rounded flex justify-center bg-neutral-900 '>
                    asd
                </div>
                <form onSubmit={loginUserFunction}>
            <div className='py-2 flex'>
                <div className='w-36 items-center flex font-bold'>
                    Character Name
                </div>
                <input type='text'  className='w-72 outline-0 text-black p-1.5 text-sm' onChange={changeCharacterName}/>
            </div>
            <div className='py-2 flex'>
                <div className='w-36 items-center flex font-bold'>
                    Password
                </div>
                <input type='password' className='w-72 outline-0 text-black p-1.5 text-sm' onChange={changePasswordValue} />
            </div>
            <button className='bg-[#0E426F] hover:bg-[#064780] p-3 rounded w-full mt-2'>
                Login
            </button>
            <div className='flex justify-center text-sm mt-2 font-bold '>
                <span className='text-[#0862A4] cursor-pointer hover:text-[#064780]' onClick={() => dispatch(third_flip())} >Forgot your password?</span>
            </div>
            </form>
        </div>
        
        </div>
    </div>
  )
}
