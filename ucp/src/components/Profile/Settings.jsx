import React from 'react'

export default function Settings() {
  return (
    <div className='flex justify-center'>
                            <div className='flex-col'>
                                <div className='py-3'>
                                    <div className='flex'>
                                        <div className='w-36 font-medium flex items-center'>
                                            <span>Email address:</span>
                                        </div>
                                        <div>
                                            <input type='text' className='w-80 py-1.5 px-3 outline-0 text-black text-sm rounded' />
                                        </div>
                                    </div>
                                    <span className='text-xs'>Used for lost password recovery. Important!</span>

                                </div>
                                <div className='py-3'>
                                    <div className='flex'>
                                        <div className='w-36 font-medium flex items-center'>
                                            <span>New password:</span>
                                        </div>
                                        <div>
                                            <input type='text' className='w-80 py-1.5 px-3 outline-0 text-black text-sm rounded' />
                                        </div>
                                    </div>
                                    <span className='text-xs'>Leave empty if you do not want to change it.</span>

                                </div>
                                <div className='py-3'>
                                    <div className='flex'>
                                        <div className='w-36 font-medium flex items-center'>
                                            <span>Current password:</span>
                                        </div>
                                        <div>
                                            <input type='text' className='w-80 py-1.5 px-3 outline-0 text-black text-sm rounded' />
                                        </div>
                                    </div>
                                    <span className='text-xs'>Required if chaning email or password.</span>

                                </div>
                                <button className='bg-button-color w-full p-3 rounded'>asd</button>
                                
                            
                            </div>
                            

                       </div>
  )
}
