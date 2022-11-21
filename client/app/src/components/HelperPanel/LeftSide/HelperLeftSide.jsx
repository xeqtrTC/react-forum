import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'
import { BiUserCheck } from 'react-icons/bi'
import { Link } from 'react-router-dom';

import './HelperLeftSide.css';
import UseAuthHook from '../../Hooks/UseAuthHook';
export default function HelperLeftSide() {
    const { roles } = UseAuthHook();
    const active = true
  return (
    <div className='leftside-container'>
        <div className='leftside-second-container'>
            <div className='leftside-image'>
                <img src='https://i.ibb.co/DWMwkFC/cover.jpg' alt='photo' />
            </div>
            <div className='leftside-content'>
                <div className='leftside-content-first'>
                    <div className='leftside-first'>
                        <p>HELPER DASHBOARD</p>
                    </div>
                    <div className='leftside-under-first'>
                        <div className='activeAdmin'>
                            <MdOutlineDashboard /> <Link to='/helper'>Helper Dashboard</Link>
                        </div>
                    </div>
                </div>
                <div className='leftside-content-first'>
                    <div className='leftside-first'>
                        <p>VODJA HELPERA TOOLS</p>
                    </div>
                    <div className='leftside-under-first'>
                        <div className='leftside-under-first-info'>
                            <RiContactsLine /> <Link to='/helper/add'>Add helper</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/'>Remove helper</Link>
                        </div>
                        

                    </div>
                </div>
                {/* <div className='leftside-content-first'>
                    <div className='leftside-first'>
                        <p>POSTS</p>
                    </div>
                    <div className='leftside-under-first'>
                        <div className='leftside-under-first-info'>
                            <RiContactsLine /> <Link to='/'>List of posts</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/'>List of locked topics</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/'>Banned users</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/'>Not verificated users</Link>
                        </div>

                    </div>
                </div> */}
            </div>
            Your status is {roles}
        </div>
    </div>
  )
}

