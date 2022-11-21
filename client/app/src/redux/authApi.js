import { apiSlice } from "./api";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        userState: builder.query({
            query: () => `/api/users/stateofuser`,
            providesTags: ['UserInfo'],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/api/users/unprotected/loginHandler',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['UserInfo']
             
            
            
        }),
        
        // logout: builder.query({
        //     query: () => '/api/users/logoutHandler'
        // }),
        register: builder.mutation({
            query: (username, password, email) => ({
                url: '/api/users/unprotected/registerHandler',
                method: 'POST',
                body: username, password, email
            })
        })
        

       
    })
})


export const { useUserStateQuery ,useLoginMutation, useRegisterMutation } = authApiSlice;