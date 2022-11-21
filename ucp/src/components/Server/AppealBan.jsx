import React from 'react'

export default function AppealBan() {
  return (
    <div>
        <span className='text-lg'>Appeal a ban</span>
            <div className='flex flex-col py-1 px-10 mt-5'>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Character name:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Ip address:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Date of ban:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Banned by:</span>
                    <input type='text' placeholder='Who banned you?' className='ml-4 w-full p-2.5 outline-0  rounded text-black text-sm placeholder: px-5 text-xs'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold  text-sm text-right'>Reason:</span>
                    <input type='text' placeholder='Why were you banned?' className='ml-4 w-full p-2.5 outline-0  rounded text-black text-sm placeholder: px-5 text-xs'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Ip banned:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex items-center py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Screenshot:</span>
                    <input type='text' className='ml-4 w-full p-2 outline-0 rounded text-black text-sm placeholder: px-5'/>
                </div>
                <div className='flex  py-2'>
                    <span className='w-40 font-bold text-sm text-right'>Explanation:</span>
                    <textarea placeholder='You are required to briefly describe what happend and why you were banned.' className='ml-4 h-28  w-full p-2.5 outline-0 rounded text-black text-sm placeholder: px-5 text-xs'/>
                </div>
               

            </div>
            <button className='bg-[#0E426F] hover:bg-[#064780]  text-[#D0D2D3] text-sm font-bold p-2.5 rounded w-full'>Submit appeal</button>
    </div>
  )
}
