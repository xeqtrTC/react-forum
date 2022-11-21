import React from 'react'
import Header from '../Header/Header'

export default function Homescreen() {
  return (
    <>
    <Header />
        <div className='bg-neutral-900 h-screen ' >
            <div className='flex flex-col w-3/5 my-0 mx-auto '>
                <div className='pt-7'>
                    <div className='bg-grey-some p-4 rounded-md  mb-6 text-white' >
                        <div className='flex justify-between'>
                            <div>title</div>
                            <div>date</div>
                        </div>
                        <div className='pt-1'>
                            asdadas
                            
                        </div>
                    </div>
                    <div className='bg-grey-some p-4 mb-3.5 rounded-md  text-white' >
                        <div className='flex justify-between'>
                            <div>title</div>
                            <div>date</div>
                        </div>
                        <div className='pt-1'>
                            asdadas
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
      </>
  )
}
