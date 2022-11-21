import React from 'react'
import UseAuthHook from '../../Hooks/UseAuthHook';

import './Navbar.css';
export default function Navbar() {
  const { username, roles, imageResult } = UseAuthHook();
  return (
    <div className='navbar-container'>
        <div className='navbar-first'>
asd
        </div>
        <div className='navbar-last'>
        <div className='navbar-image'>
          <img src={`https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${imageResult}`} />
        </div>
          <div className='navbar-username'>
            <p>{username}</p>
          </div>
        </div>
    </div>
  )
}
