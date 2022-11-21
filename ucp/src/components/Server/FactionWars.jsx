import React from 'react'

export default function FactionWars() {
  return (
    <div>
        <span className='text-lg'>Faction Wars</span>

        <div className='mt-5'>
            <div className='flex items-center py-1 px-1 hover:bg-white hover:text-black cursor-pointer'>
                <span className='w-[15%] text-sm'>
                    13/09/2022
                </span>
                <span className='w-[85%] '>
                    Lonons vs Tattaglia <span className='text-[#88c100] ml-3'>(Winner)</span>
                </span>
                <button className='bg-[#88c100] text-xs py-1 px-2 rounded font-bold'>FINISHED</button>
            </div>
            <div className='flex items-center py-1 px-1 hover:bg-white hover:text-black cursor-pointer'>
                <span className='w-[15%] text-sm'>
                    13/09/2022
                </span>
                <span className='w-[85%] '>
                    Lonons vs Tattaglia <span className='text-[#88c100] ml-3'>(Winner)</span>
                </span>
                <button className='bg-[#88c100] text-xs py-1 px-2 rounded font-bold'>FINISHED</button>
            </div>
        </div>
    </div>
  )
}
