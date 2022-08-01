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
        // logout: builder.query({
        //     query: () => '/api/users/logoutHandler'
        // }),
        register: builder.mutation({
            query: (username, password, email) => ({
                url: '/api/users/registerHandler',
                method: 'POST',
                body: username, password, email
            })
        })
        

       
    })
})


export const { useLoginMutation, useRegisterMutation } = authApiSlice;