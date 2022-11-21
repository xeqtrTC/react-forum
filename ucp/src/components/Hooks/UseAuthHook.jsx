import React from 'react'
import { useInfoAboutUserQuery } from '../../redux/infoAboutUser/infoAboutUser'

const useAuthHook = () => {

    const { data, isLoading, isSuccess} = useInfoAboutUserQuery()
    if(isLoading) {
        return true;
    }

    if(isSuccess) {
        const { ucp_username } = data[0];

       
        return { ucp_username };
    }
    return { ucp_username: ''}

 
}

export default useAuthHook;
