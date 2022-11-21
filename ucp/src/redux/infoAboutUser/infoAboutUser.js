import { apiSlice } from "../api";


export const infoAboutUserSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        infoAboutUser: builder.query({
            query: () => '/api/ucp/users/infoAboutUser'
        })
    })
})

export const { useInfoAboutUserQuery} = infoAboutUserSlice