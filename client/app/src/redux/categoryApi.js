import { apiSlice } from './api';


export const categorySlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/api/category/categoryList',
        }),
        getPostsPerCategory: builder.query({
            query: (category) => `/api/category/category/${category}`,
            providesTags: ['Category']
        }),
        getPostsPerTitle: builder.query({
            query: (title) => `/api/category/title/${title}`,
            providesTags: ['Title']
        }),
        getPostsPerUser: builder.query({
            query: (username) => `/api/category/getPostsPerUser/${username}`,
            providesTags: ['Title']
        }),
        postPostbyUser: builder.mutation({
            query: (user, text, title) => ({
                url: '/api/category/postbyuser',
                method: 'POST',
                body: user, text, title
            }),
            invalidatesTags: ['Title']
        }),
        postCategoryByUser: builder.mutation({
            query: (username, descriptionValue, titleValue, category) => ({
                url: '/api/category/postcategory',
                method: 'POST',
                body: username, descriptionValue, titleValue, category
            }),
            invalidatesTags: ['Category']
        })
    })
})

export const { useGetPostsPerUserQuery ,useGetCategoriesQuery, useGetPostsPerCategoryQuery, useGetPostsPerTitleQuery, usePostPostbyUserMutation, usePostCategoryByUserMutation } = categorySlice;