import { useUserStateQuery,  } from '../../redux/authApi';

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