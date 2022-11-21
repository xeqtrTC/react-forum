import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import UseAuthHook from '../Hooks/UseAuthHook'

function RequireUndoLogin() {

    const { username } = UseAuthHook();


    const content = (
        username ? <Navigate to={'/forum'} replace  /> : <Outlet />
    )

  return content;
}

export default RequireUndoLogin