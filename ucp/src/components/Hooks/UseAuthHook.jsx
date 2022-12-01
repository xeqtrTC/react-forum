import React from 'react'
import { useInfoAboutUserQuery } from '../../redux/infoAboutUser/infoAboutUser'


function UseAuthHookUCP() {
    const { data, isSuccess, isLoading } = useInfoAboutUserQuery();
    console.log(data);
    if(isLoading) {
        return true
    }

    if(isSuccess) {
        

        const { ucp_username } = data

       

        return {
            ucp_username
        }

    }

    return { ucp_username: '', }

}

export default UseAuthHookUCP;
