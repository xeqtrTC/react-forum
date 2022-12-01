import React from 'react'
import { Link } from 'react-router-dom'
import { useInfoAboutUserQuery } from '../../redux/infoAboutUser/infoAboutUser'
import UseAuthHookUCP from '../Hooks/UseAuthHook'

export default function Header() {
    const { ucp_username } = UseAuthHookUCP();

    console.log(ucp_username)

  return (
    <>
    <div className='bg-neutral-900 py-7'>
        <div className='w-3/5 my-0 mx-auto flex justify-between'>
            <div>
                asda
            </div>
            <div className='text-white'>
                <ul className='flex'>
                    <li className='px-4 '><Link to='/' className='hover:border-b-2 border-black'>News</Link></li>
                    <li className='px-4 '><Link to='/server' className='hover:border-b-2 border-black'>Server</Link></li>
                    <li className='px-4 '><Link to='/support' className='hover:border-b-2 border-black'>Support</Link></li>
                    {
                        ucp_username ? (
                            <li className='px-4 '><Link to='/profile' className='hover:border-b-2 border-black'>Raffaele barbier</Link></li>

                        ) : (
                            <li className='px-4 '><Link to='/login' className='hover:border-b-2 border-black'>Login / Register</Link></li>

                        )
                    }


                </ul>
            </div>
        </div>

    </div>
    <img src='https://wallpaperaccess.com/full/707055.jpg' alt='photo' className='object-cover	h-24 w-full'/>
    <div className='bg-grey-some h-3.5 border-t border-black'>

    </div>
                </>

)
}
