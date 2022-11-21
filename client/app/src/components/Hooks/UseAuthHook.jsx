import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useUserStateQuery,  } from '../../redux/authApi';
import { selectCurrentUser, selectImageOfCurrentUser, selectRolesOfCurrentUser, setCredentials } from '../../redux/authSlice';
import { useInfoAboutUserSocketQuery } from '../../redux/usersApi/usersApi';

function UseAuthHook() {
    const { data, isSuccess, isLoading } = useUserStateQuery();

    if(isLoading) {
        return true
    }

    if(isSuccess) {
        

        const { username, roles, imageResult } = data

       

        return {
            username, roles, imageResult
        }

    }

    return { username: '', roles: []}

}

export default UseAuthHook