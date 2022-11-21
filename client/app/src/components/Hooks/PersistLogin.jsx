import React from 'react'
import { Outlet } from 'react-router-dom';
import UseAuthHook from './UseAuthHook'


const PersistLogin = () => {
    const { roles } = UseAuthHook();


    let content;

    if(roles) {
        content = <Outlet />
    }



  return content;
}

export default PersistLogin