import React from 'react'

export default function ForgottenPassword() {
  return (
    <div>
        <span>Have you forgottten your password?</span>
        <div className='flex justify-center mt-5'>
            <div className='flex flex-col'>
                <div className='flex py-1.5'>
                        <div className='w-40 flex items-center'>
                            <span>Character name</span>
                        </div>
                        <input type='text' className='w-72 p-1 outline-none text-sm font-normal px-2 text-black placeholder:font-extralight text-sm' />
                    </div>
                    <button className='bg-[#0E426F] hover:bg-[#064780]  text-[#D0D2D3] font-bold p-3 rounded w-full mt-2'>
                        Request new password
                    </button>
                    <div className='flex justify-center text-sm mt-2 font-bold '>
                        <span className='text-[#0862A4] cursor-pointer hover:text-[#064780]'>Having trouble? Create a support ticket.</span>
                    </div>
            </div>
        </div>
    </div>
  )
}
