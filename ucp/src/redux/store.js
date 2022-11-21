import { configureStore } from '@reduxjs/toolkit';

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