import { apiSlice } from "./api";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/users/loginHandler',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.query({
            query: () => '/api/users/logoutHandler'
        })

       
    })
})


export const { useLoginMutation, useLogoutQuery } = authApiSlice;