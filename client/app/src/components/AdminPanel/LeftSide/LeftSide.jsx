import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'
import { BiUserCheck } from 'react-icons/bi'
import { Link } from 'react-router-dom';

import './LeftSide.css';
import UseAuthHook from '../../Hooks/UseAuthHook';
export default function LeftSide() {
    const { roles } = UseAuthHook();
    const active = true

    const web = "<p className='webDeveloper'>WEB</p>"

    const userWithRequiredRoles = roles.includes(web);

  return (
    <div className='leftside-container'>
        <div className='leftside-second-container'>
            <div className='leftside-image'>
                <img src='https://i.ibb.co/DWMwkFC/cover.jpg' alt='photo' />
            </div>
            <div className='leftside-content'>
                <div className='leftside-content-first'>
                    <div className='leftside-first'>
                        <p>DASHBOARD</p>
                    </div>
                    <div className='leftside-under-first'>
                        <div className='activeAdmin'>
                            <MdOutlineDashboard /> <Link to='/admin'>Dashboard</Link>
                        </div>
                    </div>
                </div>
                <div className='leftside-content-first'>
                    <div className='leftside-first'>
                        <p>WEB tools</p>
                    </div>
                    <div className='leftside-under-first'>
                        
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/bannedhistorylist'>History of banned users</Link>
                        </div>
                        
                        
                        {
                            userWithRequiredRoles && (
                                <>
                                
                                    <div className='leftside-under-first-info'>
                                        <BiUserCheck /> <Link to='/admin/overwatchposts'>Overwatch posts</Link>
                                    </div>
                                    <div className='leftside-under-first-info'>
                                        <BiUserCheck /> <Link to='/admin/overwatchusers'>Overwatch users</Link>
                                    </div>
                                    <div className='leftside-under-first-info'>
                                        <BiUserCheck /> <Link to='/admin/sessionlist'>Session list</Link>
                                    </div>
                                      
                                      </>
                            )
                        }
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/news'>Add news</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/removenews'>Remove news</Link>
                        </div>

                    </div>
                </div>
                <div className='leftside-content-first'>
                    <div className='leftside-first'>
                        <p>USERS</p>
                    </div>
                    <div className='leftside-under-first'>
                        <div className='leftside-under-first-info'>
                            <RiContactsLine /> <Link to='/admin/userslist'>List of users</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/'>Not activated accounts</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/bannedusers'>Banned users</Link>
                        </div>
                        
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/notverificatedusers'>Not verificated users</Link>
                        </div>
                        <div className='leftside-under-first-info'>
                            <BiUserCheck /> <Link to='/admin/accountapproves'>List of accounts to be approved</Link>
                        </div>
                        
                        

                    </div>
                </div>
                <div className='leftside-content-first'>
                    <div className='leftside-first'>
                        <p>POSTS</p>
                    </div>
                    <div className='leftside-under-first'>
                        <div className='leftside-under-first-info'>
                            <RiContactsLine /> <Link to='/admin/topiclist'>List of posts</Link>
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
                </div>
            </div>
            Your status is {roles}
        </div>
    </div>
  )
}

