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
    initialState: {  username: null, roles: null, imageResult: null  },
    reducers: {
        setCredentials: (state, action) => {
            console.log('actiooooooooon', action.payload)
            const { username, roles, imageResult } = action.payload;
            // console.log('userrrrrrrrrr', username);
            // const roleList = [
            //     {
            //         Administrator,
            //         CommunityManager,
            //         Director,
            //         HeadAdmin,
            //         Admin,
            //         VodjaHelpera,
            //         Helper, 
            //         VodjaPromotera,
            //         Promoter, 
            // org1lider, 
            // org2lider,
            // org3lider,
            // org4lider,
            // org5lider,
            // org6lider,
            // org7lider
            // }
            // ]
            // console.log('roles', roles)
            state.username = username; // destruction of state
            state.roles = roles
            state.imageResult = imageResult;
            
            // state.token = accessToken; // " " "
            

        },
        logOut: (state, action) => {
            state.user = null; // sets state of user to null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = ( state ) => state.auth.username; // selects current user from state, auth.user is namedi in setCredentials
export const selectCurrentToken = ( state ) => state.auth.token; // "  " auth.token " "
export const selectRolesOfCurrentUser = ( state ) => state.auth.roles; // "  " auth.token " "
export const selectImageOfCurrentUser = ( state ) => state.auth.imageResult; // "  " auth.token " "