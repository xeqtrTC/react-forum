import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../redux/authSlice';

import React from 'react'

function WithoutAuth() {
    const token = useSelector(selectCurrentToken)
    const location = useLocation();
    console.log(token);
    console.log(Outlet);
    console.log(location.pathname);
  return (
    token ? <Navigate to='/' /> : <Outlet /> 
  )
}

export default WithoutAuth