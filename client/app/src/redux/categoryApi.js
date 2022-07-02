import { apiSlice } from './api';


export const categorySlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/api/category/categoryList',
        })
    })
})


export const { useGetCategoriesQuery } = categorySlice;