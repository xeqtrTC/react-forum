import { configureStore } from '@reduxjs/toolkit';
import { usegetCategoryQuery } from './slices/postSlice';
import { setupListeners } from "@reduxjs/toolkit/query"

import { apiSlice } from './api';
import authReducer  from './authSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:  apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})


export default store;