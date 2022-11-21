import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UseAuthHook from '../Hooks/UseAuthHook';

function RequireAuthForumPage({ allowedRoles }) {
    const { roles, username } = UseAuthHook();
    const location = useLocation();



    const content = (
        roles.some(role => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to='/login' />

    )

    return content;

    

}

export default RequireAuthForumPage