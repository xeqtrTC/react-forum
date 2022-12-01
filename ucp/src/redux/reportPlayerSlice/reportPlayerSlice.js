import { apiSlice } from "../api";

export const reportPlayerSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        reportPlayerUCP: builder.mutation({
            query: (body) => ({
                url: 'api/ucp/users/reportPlayer',
                method: 'POST',
                body: body
            })
        })
    })
})

export const { useReportPlayerUCPMutation } = reportPlayerSlice