import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import UseAuthHook from './UseAuthHook';

function RequireAuth({ allowedRoles }) {
    const location = useLocation();

    const { roles } = UseAuthHook();

    const content = (
        roles.some(role => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />
    )
    return content
}


export default RequireAuth