import React, { useState, useReducer } from 'react'
import { MdArrowRight, MdOutlineArrowDropDown } from 'react-icons/md'


const reducer = (state, action) => {
    switch(action.type) {
        case 'flip_test':
            return { ...state, rulesOfServer: !state.rulesOfServer}
        case 'flip_another':
            return { ...state, howToJoinFaction: !state.howToJoinFaction}
        default: return state;
    }
}

const flip = () => ({
    type: 'flip_test'
})
const flipsecond = () => ({
    type: 'flip_another'
})

const initialState = {
    rulesOfServer: false,
    howToJoinFaction: false
}

export default function Faq() {
    const [state, dispatch] = useReducer(reducer, {initialState} )
   

    
    return (


    <div>
    <span className='text-lg'>Frequently Asked Questions</span>
    
    <div className='mt-4'>
        <div className='py-1'>
        <div className='bg-support-color flex p-2 hover:cursor:pointer' onClick={() => dispatch(flip())}>
            { state.rulesOfServer ? <MdOutlineArrowDropDown className='w-5 h-5 text-black'/> : <MdArrowRight className='w-5  text-black h-5'/> }
            <span className='ml-1 text-[#e6e6e6]'>asdasdasda</span>
        </div>
        {
           state.rulesOfServer && (
                <div className={`py-5 px-4`}
                >
                    <div>
                        <span className='text-[#cccccc]'>sadassdasa</span>
                        </div>
                </div>
            )
        }
        </div>

        <div>
        <div className='bg-support-color flex p-2 hover:cursor-pointer' onClick={() => dispatch(flipsecond())}>
            { state.howToJoinFaction ? <MdOutlineArrowDropDown className='w-5 h-5 text-black'/> : <MdArrowRight className='w-5  text-black h-5'/> }
            <span className='ml-1 text-[#e6e6e6]'>asdasdasda</span>
        </div>
        {
            state.howToJoinFaction && (
                <div className={`py-5 px-4`}
                >
                    <div>
                        <span className='text-[#cccccc]'>sadassdasa</span>
                        </div>
                </div>
            )
        }
        </div>
     </div>
    
    </div>
  )
}
