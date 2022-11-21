import { apiSlice } from "../api";
import io from 'socket.io-client';


let socket;
function getSocket() {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL, {

    }) ;
  }
  return socket;
}

export const userSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        userInfo: builder.query({
            query: () => `/api/users/userInfo/`,
            providesTags: ['Username']
        }),
        userInfoPublic: builder.query({
            query: (username) => `/api/users/publicGetInfoAboutUser/${username}`
        }),
       
        updateSteamtagorLocation: builder.mutation({
            query: (body) => ({
                url: '/api/users/usersUpdate/updateLocationandSteamtag',
                method: 'POST',
                body: body,
        
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Username', arg: arg.id  }
            ]        
        }),
        updateImage: builder.mutation({
            query: (body) => ({
                url: `/api/users/usersUpdate/updateImage`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Username', arg: arg.id  }
            ]   
        }),
        updateEmailOrPassword: builder.mutation({
            query: (body) => ({
                url: '/api/users//usersUpdate/updateEmailorPassword',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Username', arg: arg.id  }
            ]           
        }),
        tokenQueryForEmailVerification: builder.query({
            query: (token) => `/api/users/verifyEmail/${token}`
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/api/users/logout`,
                method: 'POST',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    console.log('queryfilled', data)
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        usersList: builder.query({
            query: () => '/api/users/getUsersList'
        }),
        postList: builder.query({
            query: () => '/api/users/getPostsList',
            providesTags: ['AdminPostList']
        }),
        getUserById: builder.query({
            query: (id) => `/api/users/getUserById/${id}`,
            providesTags: ['UserInfo']
        }),
        getcountAdminDashboard: builder.query({
            query: (id) => '/api/users/countAdminDashboard'
        }),
        getlistOfAccountsToBeApproved: builder.query({
            query: () => '/api/users/listOfAccountsToBeApproved'

        }),
        verifyUserAccountByAdmin: builder.mutation({
            query: (body) => ({
                url: `/api/users/verifyUserAccountByAdmin/`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['UserInfo']
        }),
        updateUserAccountByAdmin: builder.mutation({
            query: (body) => ({
                url: '/api/users/updateUserAccountByAdmin',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['UserInfo']

        }),
        updateRoleForUser: builder.mutation({
            query: (body) => ({
                url: '/api/users/updateRoleForUser',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['UserInfo']

        }),
        removeRoleForUser: builder.mutation({
            query: (body) => ({
                url: '/api/users/removeRoleForUser',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['UserInfo']
        }),
        leaderOfHelperQuery: builder.query({
            query: () => '/api/users/leaderOfHelperQuery'
        }),
        addHelperQueryListUsers: builder.query({
            query: () => '/api/users/addHelperQueryListUsers',
            providesTags: ['HelperQuery']
        }),
        addHelperUser: builder.mutation({
            query: (body) => ({
                url: '/api/users/addHelperUser',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['HelperQuery']
        }),
        getOverWatchPosts: builder.query({
            query: () => '/api/users/getOverWatchPosts'
        }),
        getOverWatchUsers: builder.query({
            query: () => '/api/users/getOverWatchUsers'
        }),
        infoAboutUserSocket: builder.query({
            query: () => '/api/users/stateofuser',
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved  },
                ) {
                    const socket = getSocket()
                    // console.log(updateCachedData, cacheDataLoaded);
                    try {
                        await cacheDataLoaded;

                        socket.on('connect', () => {                        
                            console.log('works', socket.id)
                         
                        });

                        // socket.on('send_all_messages', (messages) => {
                        //     updateCachedData((draft) => {
                        //         draft.messages.splice(0, draft.length, ...messages);
                        //       });
                        // })  
                        socket.on('info_aboutuser', (data) => {
                            updateCachedData((draft) => {
                                draft.push(data);
                             });                            //     })
                         })
                    

                         await cacheEntryRemoved
                         
                         socket.off('connect');
                         socket.off('info_aboutuser')
                    } catch {

                    }
                   
                }
        }),
        newsList: builder.query({
            query: () => '/api/users/newsList',
            providesTags: ['NewsList']
        }),
        addNews: builder.mutation({
            query: (body) => ({
                url: '/api/users/addNews',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['NewsList']

        }),
        
        deleteNews: builder.mutation({
            query: (body) => ({
                url: '/api/users/deleteNews',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['NewsList']
        }),
        getNewsByTitle: builder.query({
            query: (n_title) => `/api/users/getNewsByTitle/${n_title}`
        }),
        banUserFunction: builder.mutation({
            query: (body) => ({
                url: '/api/users/banUserFunction',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['UserInfo']

        }),
        unbanUserFunction: builder.mutation({
            query: (body) => ({
                url: '/api/users/unbanUserFunction',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['UserInfo']

        }),
        getBannedUsersList: builder.query({
            query: () => '/api/users/getBannedUsersList'
        }),
        getBannedHistoryList: builder.query({
            query: () => '/api/users/getBannedHistoryList'
        }),
        whoCurrentlyGotSession: builder.query({
            query: () => '/api/users/whoCurrentlyGotSession'
        })
    })

    
})


export const { useWhoCurrentlyGotSessionQuery ,useGetBannedHistoryListQuery ,useGetBannedUsersListQuery ,useUnbanUserFunctionMutation ,useBanUserFunctionMutation ,useGetNewsByTitleQuery,useDeleteNewsMutation,useNewsListQuery,useAddNewsMutation ,useGetOverWatchPostsQuery,useGetOverWatchUsersQuery ,useInfoAboutUserSocketQuery ,useAddHelperUserMutation ,useAddHelperQueryListUsersQuery ,useLeaderOfHelperQueryQuery, useRemoveRoleForUserMutation ,useUpdateRoleForUserMutation ,useUpdateUserAccountByAdminMutation,useVerifyUserAccountByAdminMutation ,useGetlistOfAccountsToBeApprovedQuery ,useGetcountAdminDashboardQuery ,useGetUsersPrivateMessagesQuery, useGetUserByIdQuery,usePostListQuery ,useUsersListQuery ,useLogoutMutation ,useUserInfoPublicQuery  , useTokenQueryForEmailVerificationQuery ,useUpdateImageMutation, useUpdateEmailOrPasswordMutation ,useUpdateSteamtagorLocationMutation, useUserInfoQuery } = userSlice