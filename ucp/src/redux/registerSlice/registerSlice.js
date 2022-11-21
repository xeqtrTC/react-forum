import { apiSlice } from "../api";


export const registerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        registeruser: builder.mutation({
           query: (body) => ({
            url: '/api/ucp/users/registerUser',
            method: 'POST',
            body: body
           })
        })
        
    })
})

export const { useRegisteruserMutation } = registerSlice