import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UseAuthHook from '../Hooks/UseAuthHook';

function RequireForLogin({ allowedRoles }) {
    const { roles, username } = UseAuthHook();
    const location = useLocation();

    console.log('allowed', allowedRoles)

    const content = (
        !username ? <Outlet /> : <Navigate to={-1} state={{from: location}} replace/>

    )

    return content;

    
}

export default RequireForLogin