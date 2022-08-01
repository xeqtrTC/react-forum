import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from './authSlice';

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:5000',
//     credentials: 'include', //gets secured cookie
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token;

//         console.log(token)

//         if(token) {
//             headers.set('Authorization', `Bearer ${token}`)
//         }
//         return headers
//     }, 
//     credentials: "include"

// })
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;

        console.log(token)

        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
    credentials: "include"

})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions); // wrapped around baseQuery
    console.log(result)
    const user = api.getState().auth;
    console.log(user);

    // if there is a problem, server returns 403, sends new refresh token
    console.log(api);
    if(result?.error?.originalStatus === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token

        // send new refresh token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult);
        console.log(api);
        if(refreshResult?.data) {
            console.log(refreshResult?.data.username);
            const user  = refreshResult?.data.username
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user}))
            // return the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})