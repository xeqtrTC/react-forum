import React from 'react'

export default function BanList() {
  return (
    <div>
        <div className='flex justify-end border-b py-2 border-black'>
            <span className='flex items-center text-sm font-bold '>Search:</span>
            <input type='text' className='py-0.5 outline-0 text-black ml-2' />
        </div>
        <div>
        <table className='w-full text-left '>
            <tbody>
                                    <tr>
                                        <th className='w-[15%] py-2'>Date</th>
                                        <th className='w-1/5 py-2'>Player</th>
                                        <th className='w-[15%] py-2'>Admin</th>

                                        <th className='w-[40%] py-2'>Reason</th>
                                        <th className='w=[10%]py-2'>IP ban</th>



                                    </tr>
                                    <tr className='text-sm hover:bg-button-color text-sm'>
                                        <td>17.11.2022</td>
                                        <td>Jack_Corleone</td>
                                        <td>Paul_Henderson</td>
                                        <td>keeps talking shit</td>
                                        <td>Yes</td>



                                    </tr>
                                    </tbody>
                                </table>
        </div>
    </div>
  )
}
