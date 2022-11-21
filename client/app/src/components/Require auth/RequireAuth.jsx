import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, selectRolesOfCurrentUser } from '../../redux/authSlice';

import React from 'react'
import UseAuthHook from '../Hooks/UseAuthHook';



export function RequireAuth({ allowedRoles }) {
  const { roles, username } = UseAuthHook();

  const location = useLocation();

  console.log('allowed', allowedRoles);

  const content = (
    roles.some(role => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to='/404' state={{ from: location}} replace />


  )

    return content;

 
  

 

}

export const RequireAuthForLogin = ({ allowedRoles }) => {
  const {  username } = UseAuthHook();

  const location = useLocation();

    const content = (
      !username ? <Outlet /> : <Navigate to={-1} state={{from: location}} replace/>

    )

   return content;

  
    
}

export const RequireAuthForForumPages = ({ allowedRoles }) => {

  const { roles } = UseAuthHook();
  console.log(roles);
  
  let content;
    if(roles.length > 0) {
      content = (
        !roles?.some(role => allowedRoles.includes(role)) ? <Navigate to='/login' /> :  <Outlet />  
      )
    } else {
      content = <Navigate to='/login' />
    }
      

    return content;

}

