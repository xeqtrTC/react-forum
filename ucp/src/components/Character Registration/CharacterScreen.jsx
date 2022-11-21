import React from 'react'
import { useReducer } from 'react'
import Header from '../Header/Header'
import ForgottenPassword from './ForgottenPassword'
import Login from './Login'
import Register from './Register'

const reducer = (state, action) => {
    switch(action.type) {
        case 'login_state':
            return { login_state: true};
        case 'register_state':
            return { register_state: true }
        case 'forgotten_state':
            return { forgotten_state: true}
        default: return state;
    }
}

const initialState = {
    login_state: true,
    register_state: false,
    forgotten_state: false
}

const first_flip = () => ({
    type: 'login_state'
})
const second_flip = () => ({
    type: 'register_state'
}) 
const third_flip = () => ({
    type: 'forgotten_state'
})
export default function CharacterScreen() {
    const [state, dispatch] = useReducer(reducer, { initialState })

    let loginStateButton = null;

    if(state?.login_state || state?.initialState?.login_state) {
        loginStateButton = (
            <Login dispatch={dispatch} third_flip={third_flip} />
        )
    }

    let registerStateButton = null;

    if(state.register_state) {
        registerStateButton = (
            <Register />
        )
    }

    let forgottenStateButton = null;

    if(state.forgotten_state) {
        forgottenStateButton = (
            <ForgottenPassword />
        )
    }
    const combinedButtons = (
        <>
        {loginStateButton}
        {registerStateButton}
        {forgottenStateButton}
        </>
    )

  return (
    <>
         <Header />
        <div className='h-screen bg-neutral-900'>
        <div className='pt-7'>
            <div className='w-3/5 my-0 mx-auto '>
                <div className='flex'>
                    <div className='w-1/4 text-white  rounded-t-md text-sm'>
                        <ul className='flex flex-col'>
                            <li className={`px-5 py-3 ${state?.login_state || state?.initialState?.login_state ? 'bg-grey-hovered' : 'bg-grey-some'}  bg-grey-some rounded-t-md hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(first_flip())}>Login</li>
                            <li className={`px-5 py-3 ${state.register_state ? 'bg-grey-hovered' : 'bg-grey-some'}  bg-grey-some mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(second_flip())}>Register</li>
                            <li className={`px-5 py-3 ${state.forgotten_state ? 'bg-grey-hovered' : 'bg-grey-some'}  bg-grey-some mt-0.5 hover:bg-grey-hovered cursor-pointer`} onClick={() => dispatch(third_flip())}>Forgotten password</li>

                            


                            




                        </ul>
                    </div>
                    <div className='w-full h-full ml-12 p-3 bg-grey-some leading-none rounded text-white	'>
                        {combinedButtons}
                    </div>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}
