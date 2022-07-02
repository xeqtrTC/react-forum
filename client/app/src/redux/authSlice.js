import { createSlice } from '@reduxjs/toolkit';


// createSlice je funkcija koja prihvata initialState, reducere..automatski generise kreatore akcije i tipovi akcije koje se nalaze u reduceru i state
                                                                  // error, isLoading, data etc....
// all comments are made by xeqtrTC

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload; // takes user and accessToken from state
            state.user = user; // destruction of state
            state.token = accessToken; // " " "
            console.log(accessToken);
            console.log(user);

        },
        logOut: (state, action) => {
            state.user = null; // sets state of user to null
            state.token = null; // " " " " " "
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = ( state ) => state.auth.user; // selects current user from state, auth.user is namedi in setCredentials
export const selectCurrentToken = ( state ) => state.auth.token; // "  " auth.token " "