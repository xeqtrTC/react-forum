import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from './authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include', //gets secured cookie
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;

        console.log(token)

        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions); // wrapped around baseQuery
    console.log(result)
    // if there is a problem, server returns 403, sends new refresh token
    if(result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token

        // send new refresh token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if(refreshResult?.data) {
            const user = api.getState().auth.user;
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
    baseQuery: baseQuery,
    endpoints: builder => ({})
})