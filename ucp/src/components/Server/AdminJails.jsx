import React from 'react'

export default function AdminJails() {
  return (
    <div>
        <table className='w-full text-left  '>
          <tbody>
                                    <tr>
                                        <th className='w-[15%] py-2'>Date</th>
                                        <th className='w-1/5 py-2'>Player</th>
                                        <th className='w-1/5 py-2'>Admin</th>
                                        <th className='w-[15%] py-2'>Duration</th>


                                        <th className='w-[30%] py-2'>Reason</th>



                                    </tr>
                                    <tr className='text-sm hover:bg-button-color text-sm'>
                                        <td>14.11.2022</td>
                                        <td>Chuj_Colazzo</td>
                                        <td>Paul Henderson</td>
                                        <td>Speedhack</td>
                                        <td>Yes</td>



                                    </tr>
                                    <tr className='text-sm hover:bg-button-color text-sm'>
                                        <td>14.11.2022</td>
                                        <td>Chuj_Colazzo</td>
                                        <td>Paul Henderson</td>
                                        <td>Speedhack</td>
                                        <td>Yes</td>



                                    </tr>
                                    </tbody>
                                </table>
    </div>
  )
}
