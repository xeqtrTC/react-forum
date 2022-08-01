import { createSlice } from '@reduxjs/toolkit';


// createSlice je funkcija koja prihvata initialState, reducere..automatski generise kreatore akcije i tipovi akcije koje se nalaze u reduceru i state
                                                                  // error, isLoading, data etc....
// all comments are made by xeqtrTC
const test = (state, action) => {
    const { user } = action.payload;
    const { token } = action.payload;

}









const authSlice = createSlice({
    name: 'auth',
    initialState: { username: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload)
            const { username, accessToken } = action.payload; // takes user and accessToken from state
            console.log(username);
                state.username = username; // destruction of state
            state.token = accessToken; // " " "
            

        },
        logOut: (state, action) => {
            state.user = null; // sets state of user to null
            state.token = null; // " " " " " "
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = ( state ) => state.auth.username; // selects current user from state, auth.user is namedi in setCredentials
export const selectCurrentToken = ( state ) => state.auth.token; // "  " auth.token " "