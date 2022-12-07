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
        // const token = getState().auth.token;

        // console.log(token)

        // if(token) {
        //     headers.set('authorization', `Bearer ${token}`)
        // }
        return headers
    },
    credentials: 'include'


})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions); // wrapped around baseQuery
    console.log(result)


    // if there is a problem, server returns 403, sends new refresh token
    console.log(api);
    if(result) {
        console.log('sending refresh token')
        // send refresh token to get new access token

        // send new refresh token
        const refreshResult = await baseQuery('/api/users/stateofuser', api, extraOptions)
        console.log(refreshResult);
        console.log(api);
        if(refreshResult?.data) {
            console.log(refreshResult?.data.username);
            const user  = refreshResult?.data.username
            console.log(refreshResult);
        // store the new token
            api.dispatch(setCredentials({ ...refreshResult?.data} ))
            // return the original query with new access token
            result = await baseQuery(args, api, extraOptions);
            console.log(args, api)
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
}

//  About tagTypes:
//      Category is for all categories, main forum page,
//      Title is for posts per category
//      Username for each username
//      PostTitle is for all posts inside title post..
//
//
//

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Latestposts', 'sForumAndThemes', 'RepliesPerTheme','ThemePinnedData','AdminPostList', 'NewsList','HelperQuery','UserInfo','MessageRooms','PinnedMessages','MessageGlobal', 'Category', 'Title', 'Username', 'PostTitle', 'SubForum', 'SubForumQuery', 'ThemesForCategory'],
    endpoints: builder => ({}),
})