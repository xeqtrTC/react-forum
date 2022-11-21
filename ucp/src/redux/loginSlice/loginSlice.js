import { apiSlice } from "../api";

export const loginSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginUcpUser: builder.mutation({
            query: (credentials) => ({
                url: 'api/ucp/users/loginUser',
                method: 'POST',
                body: {...credentials}
            })
        })
    })
})

export const { useLoginUcpUserMutation } = loginSlice