import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api';

const initialState = createEntityAdapter({

})

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategory: builder.query({
            query: () => '/api/category/category'
        }),
    })
})

export const { usegetCategoryQuery, usegetPostsCategoryQuery } = extendedApiSlice;