import { apiSlice } from './api'
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { extendedApiSlice } from './slices/postSlice';
import io from 'socket.io-client';
import { resolveMotionValue } from 'framer-motion';

const categoryAdapter = createEntityAdapter({});

const initialState = categoryAdapter.getInitialState();

let socket;
function getSocket() {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL, {

    }) ;
  }
  return socket;
}

export const categorySlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/api/category/categoryList',
            transformResponse: reponseData => {
                const loadedcategories = reponseData.map(category => {
                    category.id = category.cid
                    return category
                });
                return categoryAdapter.setAll(initialState, loadedcategories)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'Category', id: 'CategoryList'},
                        ...result.ids.map(id => ({ type: 'Category', id}))
                    ]
                } else return [{ type: 'Category', id: 'CategoryList'}]
                // return result ? [...result.map(({ cid }) => ({ type: 'Category', id: cid })), 'Category'] : ['Category'];
            }
        }),
        getPostsPerCategory: builder.query({
            query: (category) => `/api/category/category/${category}`,
            transformResponse: responseData => {
                console.log('fasfasafsfsafsafasfsa', responseData);
                const loadedposts = responseData.map(post => {
                    post.id = post.postid
                    return post
                });
                return categoryAdapter.setAll(initialState, loadedposts)
            },
            providesTags: (result, error, arg) => {
                console.log('provided tags', result, arg);
                if(result?.ids) {
                    return [
                        { type: 'Title', id: 'TitleList'},
                        ...result.ids.map(id => ({ type: 'Title', id}))
                    ]
                } else return [{ type: 'Title', id: 'TitleList'}]
                // return result ? [...result.map(({ cid }) => ({ type: 'Category', id: cid })), 'Category'] : ['Category'];
            }
        }),
        getPostsPerTitle: builder.query({
            query: (title) => `/api/category/title/${title}`,
            transformResponse: responseData => {
                console.log(responseData);
                const loadedposts = responseData.map(post => {
                    post.id = post.replyid
                    return post
                }) 
                return categoryAdapter.setAll(initialState, loadedposts);
            },

            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [ 
                        {
                            type: 'PostTitle', id: 'PostTitleList',
                            ...result.ids.map(id => ({ type: 'PostTitle', id}))
                        }
                    ]
                } else return [{ type: 'PostTitle', id: 'PostTitleList'}]
                
                // return result ? [...result.map(({ reply_post }) => ({ type: 'Title', id: reply_post })), 'Title'] : ['Title'];

            }
        }),
        getInfoAboutUserPublic: builder.query({
            query: (username) => `/api/category/getInfoAboutUserPublic/${username}`
        }),
        getPostsPerUser: builder.query({
            query: () => `/api/category/getPostsPerUser/`,
            providesTags: (result, error, arg) => [
                result
                ? [
                    ...result.map(({ uid }) => ({ type: 'Username', id: uid })),
                    { type: 'Username', id: 'Usernameid' },
                  ]
                : [{ type: 'Username', id: 'Usernameid' }],
            ]
        }),
        getPublicPostsPerUser: builder.query({
            query: (username) => `/api/category/publicSearchUsersPosts/${username}`
        }),
        getSubCategories: builder.query({
            query: (category) => `/api/category/getsubcategories/${category}`,
            providesTags: ['SubForumQuery']
        }),
        postPostbyUser: builder.mutation({
            query: (body) => ({
                url: '/api/category/postbyuser',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PostTitle', arg: arg.id  }, ['Latestposts']
            ]
        }),
        postCategoryByUser: builder.mutation({
            query: (body) => ({
                url: '/api/category/postcategory',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Title', arg: arg.id  }
            ]
        }),
        getPostbyReplyid: builder.query({
            query: (replyid) => `/api/category/getPostbyReplyid/${replyid}`
        }),
        updateReplyContent: builder.mutation({
            query: (body) => ({
                url: '/api/category/updateReplyContent/',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PostTitle', arg: arg.id  }
            ]
        }),
        isLockedPost: builder.query({
            query: (title) => `/api/category/isLockedPost/${title}`,
            providesTags: ['PostTitle']
        }),
        lockTheThread: builder.mutation({
            query: (body) => ({
                url: '/api/category/lockTheThreadbyAdmin',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['PostTitle']
        }),
        unLockTheThread: builder.mutation({
            query: (body) => ({
                url: '/api/category/unlockTheThreadbyAdmin',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['PostTitle']
        }),
        getSubCategoriesPerCategory: builder.query({
            query: ({category, subtitle}) => `api/category/subforumpercategory/${category}/test/${subtitle}`,
            providesTags: ['SubForum']
        }),
        getAllCategoriesandSubcategories: builder.query({
            query: () => 'api/category/getcategoriesandsubcategories'
        }),
        getSubCategoriesAdmin: builder.query({
            query: () => `/api/category/getsubcategories`
        }),
        movePostToAnotherCategory: builder.mutation({
            query: (body) => ({
                url: '/api/category/movePostToAnotherCategory',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PostTitle',  arg: arg.id  }
            ]

        }),
        movePostToSubForum: builder.mutation({
            query: (body) => ({
                url: '/api/category/movePostToSubForum',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Title', arg: arg.id  }, ['SubForum']
            ], 
        }),
        getThemePerCategory: builder.query({
            query: (category) => `/api/category/themePerCategory/${category}`,
            providesTags: ['ThemesForCategory']
        }),
        getPostsPerTheme: builder.query({
            query: (category) => `/api/category/postsPerTheme/${category}`,
            providesTags: ['ThemesForCategory']

        }),
        getRepliesPerTheme: builder.query({
            query: (posttitle) => `/api/category/repliesPerTheme/${posttitle}`,
            providesTags: ['RepliesPerTheme']
        }),
        addSubForumPost: builder.mutation({
            query: (body) => ({
                url: '/api/category/addsubforum',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['SubForumQuery']
        }),
        addThemePerCategory: builder.mutation({
            query: (body) => ({
                url: '/api/category/addTheme',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['ThemesForCategory']
        }),
        addPostPerTheme: builder.mutation({
            query: (body) => ({
                url: '/api/category/addPostPerTheme',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['ThemesForCategory']

        }),
        removeTheme: builder.mutation({
            query: (body) => ({
                url: '/api/category/deleteTheme',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['ThemesForCategory']
        }),
        removeSubForum: builder.mutation({
            query: (body) => ({
                url: '/api/category/deleteSubForum',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['SubForumQuery']
        }),
        lastTwentyMessagesGlobal: builder.query({
            query: () => '/api/category/lastmessagesglobal',
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
                        socket.on('message', (data) => {
                            console.log(data)
                            updateCachedData((draft) => {
                                draft.push(data);
                             });                            //     })
                 })
                         socket.on('send_all_messages', (data) => {
                                    console.log(data)
                                    updateCachedData((draft) => {
                                        draft.push(data);
                                     });                            //     })
                         })

                         await cacheEntryRemoved

                         socket.off('connect');
                         socket.off('message')
                         socket.off('send_all_messages')

                    } catch {

                    }



                    
                    // cacheentryremoved will resolve when the cache sub is no longer active

                    // perfrom cleanup

                },
        //         transformResponse: reponseData => {
        //             console.log('data', reponseData);
        //             const loadedcategories = reponseData.map(item => {
        //                 item.id = item.messagesid
        //                 return item
        //             });
        //             return categoryAdapter.setAll(initialState, loadedcategories)
        //         },
        //         providesTags: (result, error, arg) => {
        //             if(result?.ids) {
        //                 return [
        //                     { type: 'MessageGlobal', id: 'MessageGlobalList'},
        //                     ...result.ids.map(id => ({ type: 'MessageGlobal', id}))
        //                 ]
        //             } else return [{ type: 'MessageGlobal', id: 'MessageGlobalList'}]
        // }
        // providesTags: (result, error, id) => [{ type: 'MessageGlobal', id }],
    }),
        insertMessageGlobal: builder.mutation({
            queryFn: (message) => {
                const socket = getSocket()
                return new Promise(resolve => {
                    socket.emit('send_message', message , () => {
                        resolve({ data: message})
                    })
                })
            }
            // async onQueryStarted({...message}, {dispatch, queryFulfilled}) {

            //     // updating cache

            //     const patchResult = dispatch(
            //         apiSlice.util.updateQueryData('lastTwentyMessagesGlobal', undefined, draft => {
            //             console.log('aeasesaeaeseas', draft, message);
            //             Object.assign(draft, message)
            //         })
                        
            //         )
            //         try {
            //             await queryFulfilled
            //         } catch {
            //             patchResult.undo();

            //         }


            // },
            // invalidatesTags: (result, error, arg) => [
            //     { type: 'MessageGlobal', arg: arg.id  }, ['MessageGlobal']
            // ], 
        }),
        getPinnedThemesPerCategory: builder.query({
            query: (subtitle) => `/api/category/getpinnedthemespercategory/${subtitle}`,
            providesTags: ['PinnedMessages']
        }),
        addPinnedThemesPerSubCategory: builder.mutation({
            query: (body) => ({
                url: '/api/category/addpinnedthemes',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['PinnedMessages']
        }),
        addAlreadyPinnedMessage: builder.mutation({
            query: (body) => ({
                url: '/api/category/addalreadypinnedmessage',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['ThemePinnedData']

        }),
        getUsersPrivateMessages: builder.query({
            query: () => '/api/category/getUsersPrivateMessages'
        }),
        addMessageRoom: builder.mutation({
            query: (body) => ({
                url: '/api/category/insertMessageRoom',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['MessageRooms']
        }),
        getMessagesRooms: builder.query({
            query: () => '/api/category/getMessageRooms',
            providesTags: ['MessageRooms']
        }),
        getMessagesPerRoomId: builder.query({
            query: (roomid) => `/api/category/getMessagesByRoomId/${roomid}`,
            async onCacheEntryAdded(
                roomid,
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
                        socket.on('receive_message_private', (data) => {
                            updateCachedData((draft) => {
                                draft.push(data);
                             });                            //     })
                 })
                    socket.on('message_test', (data) => {
                        updateCachedData((draft) => {
                            draft.push(data);
                        });                            //     })
         })

                         await cacheEntryRemoved
                         
                         socket.off('connect');
                         socket.off('receive_message_private')
                         socket.off('message_test')
                    } catch {

                    }
                   
                }
        }),
        getRoomIdSocket: builder.mutation({
            query: (roomid) => {
                const socket = getSocket()
                return new Promise(resolve => {
                    socket.emit('join_room', roomid , () => {
                        resolve({ data: roomid})
                    })
                })
            }
        }),
        insertMessageIntoRoom: builder.mutation({
            query: (body) => {
                const socket = getSocket();

                return new Promise(resolve => {
                    socket.emit('send_message_private', (body), () => {
                        resolve({ data: body })
                    })
                })
            }
        }),
        getLatestPosts: builder.query({
            query: () => '/api/category/getLatestPosts',
            providesTags: ['Latestposts']
        }),
        deleteReplyByAdmin: builder.mutation({
            query: (body) => ({
                url: '/api/category/deleteReplyByAdmin',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'PostTitle', arg: arg.id  }, ['PostTitle']
            ],
        }),
        deletePostByAdmin: builder.mutation({
            query: (body) => ({
                url: '/api/category/deletePostByAdmin',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['AdminPostList']
        }),
        getpinnedthemepercategoryreplies: builder.query({
            query: (subtitle) => `api/category/getpinnedthemepercategoryreplies/${subtitle}`,
            providesTags: ['ThemePinnedData']
        }),
        deleteContentPerPinnedMessage: builder.mutation({
            query: (body) => ({
                url: '/api/category/deleteContentPerPinnedMessage',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['ThemePinnedData', 'PinnedMessages']
        }),
        deletePinnedTheme: builder.mutation({
            query: (body) => ({
                url: '/api/category/deletePinnedTheme',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['PinnedMessages']
        }),
        insertPostInTheme: builder.mutation({
            query: (body) => ({
                url: '/api/category/insertPostInTheme',
                method: 'POST',
                body: body
            })
        }),
        deleteThemeReply: builder.mutation({
            query: (body) => ({
                url: '/api/category/deleteThemeReply',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['RepliesPerTheme', 'ThemesForCategory']
        }),
        updateReplyThemeContent: builder.mutation({
            query: (body) => ({
                url: '/api/category/updateReplyThemeContent',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['RepliesPerTheme']
        })

    }),

})

export const { 
    useGetLatestPostsQuery,
    useUpdateReplyContentMutation, 
    useGetPostbyReplyidQuery, 
    useGetPostsPerUserQuery,
    useGetCategoriesQuery, 
    useGetPostsPerCategoryQuery, 
    useGetPostsPerTitleQuery, 
    usePostPostbyUserMutation, 
    usePostCategoryByUserMutation, 
    useGetPublicPostsPerUserQuery,
    useLockTheThreadMutation,
    useUnLockTheThreadMutation,
    useGetSubCategoriesQuery,
    useIsLockedPostQuery,
    useGetSubCategoriesPerCategoryQuery,
    useLazyGetAllCategoriesandSubcategoriesQuery,
    useMovePostToAnotherCategoryMutation,
    useLazyGetSubCategoriesAdminQuery,
    useMovePostToSubForumMutation,
    useGetThemePerCategoryQuery,
    useGetPostsPerThemeQuery,
    useGetRepliesPerThemeQuery,
    useAddSubForumPostMutation,
    useAddThemePerCategoryMutation,
    useAddPostPerThemeMutation,
    useRemoveThemeMutation,
    useRemoveSubForumMutation,
    useLastTwentyMessagesGlobalQuery,
    useInsertMessageGlobalMutation,
    useGetPinnedThemesPerCategoryQuery,
    useAddPinnedThemesPerSubCategoryMutation,
    useAddAlreadyPinnedMessageMutation,
    useGetUsersPrivateMessagesQuery,
    useAddMessageRoomMutation,
    useGetMessagesRoomsQuery,
    useGetMessagesPerRoomIdQuery,
    useGetRoomIdSocketMutation,
    useInsertMessageIntoRoomMutation,
    useDeleteReplyByAdminMutation,
    useDeletePostByAdminMutation,
    useGetpinnedthemepercategoryrepliesQuery,
    useDeleteContentPerPinnedMessageMutation,
    useDeletePinnedThemeMutation,
    useInsertPostInThemeMutation,
    useDeleteThemeReplyMutation,
    useUpdateReplyThemeContentMutation
    } = categorySlice;

// returns the query result object
export const selectCategory = categorySlice.endpoints.getCategories.select();
export const selectMessage = categorySlice.endpoints.lastTwentyMessagesGlobal.select();

export const selectPostsPerCategory = categorySlice.endpoints.getPostsPerCategory.select();



// creates memoized selector


const selectPostsPerCategoryData = createSelector(
    selectPostsPerCategory,
    postspercategory => postspercategory.data
)
// console.log('create selector', selectPostsPerCategory, postspercategory => postspercategory.data)

const selectCategoryData = createSelector(
    selectCategory,
    category => category.data
)

const selectMessagesData = createSelector(
    selectMessage,
    message => message.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostsIds,
} = categoryAdapter.getSelectors()
  
// console.log('asdasdada', categoryAdapter.getSelectors(state => selectPostsPerCategoryData(state)))


export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
} = categoryAdapter.getSelectors(state => selectCategoryData(state) ?? initialState);

export const {
    selectAll: selectAllMessages,
    selectById: selectMessageById,
    selectIds: selectMessageIds
} = categoryAdapter.getSelectors(state => selectMessagesData(state) ?? initialState);

