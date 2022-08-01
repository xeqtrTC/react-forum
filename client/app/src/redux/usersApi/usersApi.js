import { apiSlice } from "../api";



export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        userInfo: builder.query({
            query: (username) => `/api/users/userInfo/${username}`
        })
    })
})


export const { useUserInfoQuery } = userSlice