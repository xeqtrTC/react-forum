import React, { useState } from 'react'
import Header from '../Header/Header'
import { MdArrowRight, MdOutlineArrowDropDown } from 'react-icons/md'
import Faq from './Faq';


export default function Support() {
  return (
    <>
        <Header />
        <div className='h-screen bg-neutral-900'>
        <div className='pt-7'>
            <div className='w-3/5 my-0 mx-auto '>
                <div className='flex'>
                    <div className='w-1/4 text-white  rounded-t-md text-sm'>
                        <ul className='flex flex-col'>
                            <li className='px-5 py-3 bg-grey-some rounded-t-md hover:bg-grey-hovered cursor-pointer'>Faq</li>
                            <li className='px-5 py-3 bg-grey-some mt-0.5 hover:bg-grey-hovered cursor-pointer'>Create a support ticket</li>
                            <li className='px-5 py-3 bg-grey-some mt-0.5 hover:bg-grey-hovered cursor-pointer'>Helprs</li>

                            


                            




                        </ul>
                    </div>
                    <div className='w-full h-full ml-12 p-3 bg-grey-some leading-none rounded text-white	'>
                        <Faq />
                    </div>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}
