import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../redux/authSlice';

import React from 'react'

function RequireAuth() {
  console.log(Outlet);
    const token = useSelector(selectCurrentToken)
    const location = useLocation();
  return (
    token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth