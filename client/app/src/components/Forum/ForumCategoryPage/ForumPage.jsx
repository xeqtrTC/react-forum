import React, { useState, useRef, useMemo } from 'react';
import Header from '../../header/Header';
import { useParams, Link } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import { useSForumAndThemesQuery, useRemoveSubForumMutation, useRemoveThemeMutation, useAddPostPerThemeMutation, useAddThemePerCategoryMutation, useAddSubForumPostMutation, useGetPostsPerThemeQuery, useGetThemePerCategoryQuery, selectPostById, selectPostsPerCategory, useGetPostsPerCategoryQuery, useGetSubCategoriesQuery, useInsertPostInThemeMutation } from '../../../redux/categoryApi';
import LoadingBox from '../../LoadingBox/LoadingBox';
import { EditorState, convertToRaw} from 'draft-js';

import { format,  parseISO,   } from 'date-fns'

import './ForumPage.css';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';
import ForumPagePosts from './ForumPagePosts';
import { GoThreeBars } from 'react-icons/go';
import { MdDeleteForever } from 'react-icons/md'
import { GrEdit } from 'react-icons/gr'
import { useEffect } from 'react';
import UseAuthHook from '../../Hooks/UseAuthHook';
import AddSubForum from './AddSubForum';
import AddPost from './AddPost';
import AddThemeForum from './AddThemeForum';
import RemoveThemeOrSubForum from './RemoveThemeOrSubForum';
import { RequireRoles } from '../../Hooks/RequireRoles';
import AddPostForPerTheme from './AddPostForPerTheme';
export default function ForumPage() {
    const params = useParams();
    const [posts, setposts] = useState({})
    const emptyArray = []
    const user = useRef();
    const { username, roles } = UseAuthHook();
    const {category} = params;
    // const { myPost, isLoading, isSuccess, error } = useGetPostsPerCategoryQuery(category, { 
    //     selectFromResult: ({ data }) => ({ myPost: data && selectPostById(data, data.ids) })
    //   })
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [addsubforum, setaddsubforum] = useState(false);
    const [addthemeforum, setaddthemeforum] = useState(false);
    const [addpost, setaddpost] = useState(false);
    const [removeTorS, setRemoveTorS] = useState(false); 
    const [openSubGrid, setOpenSubGrid] = useState(false)
    const [openThemeGrid, setOpenThemeGrid] = useState(false);
    const [deletePosts, setDeletePosts] = useState(false);
    const [errorAddSub, setErrorAddSub] = useState(null);
    const [addPostInTheme, setAddPostInTheme] = useState(false);
    const [valueForQuill, setValueForQuill] = useState('');
     const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    const rawContentState = convertToRaw(editorState.getCurrentContent());
  

    const [SubDescription, setSubDescription] = useState('');

    const [TitleOfSubForum, setTitleOfSubForum] = useState('');

    const [TitleofTheme, setTitleOfTheme] = useState('');

    const [PostForTheme, setPostForTheme] = useState('');

    const [addPostName, setAddPostName] = useState('');

    const [ThemeNameToAdd, setThemeNameToAdd] = useState('');
    const [currentValueThemeNameToAdd, setCurrentValueThemeToAdd] = useState('');

    const [success, setSuccess] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    const [currentSelectedTheme, setCurrentSelectedTheme] = useState('');
    
    const { data, isSuccess, error, isLoading } = useGetPostsPerCategoryQuery(category);
    const {data: secondData, isSuccess: secondIsSuccess } = useSForumAndThemesQuery(category);
    // const {data: subData, error: subError, isLoading: subIsLoading, isSuccess: isSuccessSub} = useGetSubCategoriesQuery(category)
    // const {data: themeData, error: themeError, isLoading: themeIsloading, isSuccess: isSuccessTheme} = useGetThemePerCategoryQuery(category);
    // const {data: postsOfThemeData, error: postsOfThemeDataError, isSuccess: isSuccessPostTheme} = useGetPostsPerThemeQuery(category);
        // const { themeData } = secondData;

        console.log('dataEASESA', secondData);


    const memoizedData = useMemo(() => data, [data])
    const restOfData = useMemo(() => secondData, [secondData])
    // const themeMemoizedData = useMemo(() => themeData, [themeData])
    // const postsOfThemeMemoizedData = useMemo(() => postsOfThemeData, [postsOfThemeData]);
    // console.log('ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB', memoizedData)


    const [addSubForumPost] = useAddSubForumPostMutation();
    const [addThemePerCategory] = useAddThemePerCategoryMutation();
    const [addPostPerTheme] = useAddPostPerThemeMutation()
    const [removeTheme] = useRemoveThemeMutation();
    const [removeSubForum] = useRemoveSubForumMutation();
    const [InsertPostInTheme] = useInsertPostInThemeMutation();
    console.log('DATAAAAAAAAAAAAAAAAAAAA', data);
    const [color, setColor] = useState(true)
        
    // console.log(roles.map((item) => {
    //     return item === 'Administrator' ? 'test' : 'ne'
    // }));


    const userWithRequiredRoles = roles.includes(RequireRoles.Administrator) || roles.includes(RequireRoles.Director) || roles.includes(RequireRoles.CommunityManager);


    

    const rowsSub = secondData?.subData?.map((item) => {
        const { subid, subdate, subdescription, subtitle, subuser } = item;
        return {
            id: subid,
            subTitle: subtitle,
            subdescription, subdescription,
            subUser: subuser,
            subDate: subdate
        }
    })

    const rowsTheme = secondData?.themeData?.map((item) => {
        const { themeid, theme_name, theme_user, theme_date} = item;
        return {
            id: themeid,
            themeName: theme_name,
            themeUser: theme_user,
            themeDate: theme_date
        }
    })

   
      
   

    const addSubForumFunction = () => {
        setaddsubforum(true);
        setIsOpenMenu(false);
    }
    const addThemeFunction = () => {
        setaddthemeforum(true);
        setIsOpenMenu(false);
    }
    const addPostFunction = () => {
        setaddpost(true);
        setIsOpenMenu(false);
    }
    const removeThemeorSub = () => {
        setRemoveTorS(true);
        setIsOpenMenu(false);
    }
    const closeAddSubForumFunction = () => {
        setaddsubforum(false);
        setIsOpenMenu(true);
        setErrorMessage('');
    }
    const closeAddThemeFunction = () => {
        setaddthemeforum(false);
        setIsOpenMenu(true);
        setValueForQuill('');
        setErrorMessage('');

    }
    const closePostFunction = () => {
        setaddpost(false);
        setIsOpenMenu(true);
    }
    const closeRemoveTorS = () => {
        setRemoveTorS(false);
        setOpenSubGrid(false);
        setOpenThemeGrid(false);
        setErrorMessage('');
        setIsOpenMenu(true);
    }
    const openRemovePosts = () => {
        setDeletePosts(true);
        setIsOpenMenu(false);
    }
    const openAddPostInTheme = () => {
        setAddPostInTheme(true);
        setIsOpenMenu(false);
    }
    const closeAddPostInTheme = () => {
        setAddPostInTheme(false);
        setIsOpenMenu(true);
        setValueForQuill('');
        setErrorMessage('');


    }
    const handleInputAddThemePerPost = (e) => {
        setAddPostName(e.target.value)
    }

    useEffect(() => {
        if(addsubforum) {
            user.current.focus();
        }
    },[addsubforum, user])

    const addSubForumFunctionPost = async (e) => {
        e.preventDefault();

        if(TitleOfSubForum, SubDescription) {
            try {
                await addSubForumPost({category, TitleOfSubForum, SubDescription}).unwrap();
                setaddsubforum(false);
                setIsOpenMenu(false);
            } catch (error) {
                console.log('error', error)

                const { data } = error; 
                console.log('error acab', data.message)
                setErrorAddSub(data.message)
            }
    
        }

        
    }

    const addThemeForumFunctionPost = async (e) => {
        e.preventDefault();

        if(TitleofTheme, PostForTheme, valueForQuill) {
            const markup = valueForQuill;
            try {
                await addThemePerCategory({ TitleofTheme, PostForTheme, markup, category}).unwrap();
                setaddthemeforum(false);
                setTitleOfTheme('');
                setPostForTheme('');
                setValueForQuill('');
            } catch (error) {
                const { data } = error;
                setErrorMessage(data?.message)
                console.log('errrrrrrrrrrrrrrrrrror', error);
            }
        }

        

    }

    const addPostPerThemePost = async (e) => {
        e.preventDefault();

        if(addPostName, currentSelectedTheme, valueForQuill) {
            const markup = valueForQuill;
            try {
                await addPostPerTheme({category, addPostName, currentSelectedTheme, markup}).unwrap();
                
                setaddpost(false)
                setAddPostName('');
            } catch ( error ) {
                console.log(error);
            }
        }

        
    }

    const removeThemePost = async (themeName) => {

        try {
            await removeTheme({ category, themeName }).unwrap();
            setSuccess(`You deleted ${themeName} theme`)
        } catch (error) {
            console.log(error);
        }
    }

    const removeSubForumPost = async (id, subTitle) => {
         
        try  {
            const {data} = await removeSubForum({ id, category }).unwrap();
            console.log('errrrrrrrrror', data);
            setSuccess(`You deleted ${subTitle} subforum`)
        } catch ( err ) {
            const { data } = err
            setErrorMessage(data?.message);
        }
    } 

    const addThemeInPostFunction = async (e) => {
        e.preventDefault();
        try {
            if(ThemeNameToAdd, currentValueThemeNameToAdd, valueForQuill) {
                await InsertPostInTheme({ThemeNameToAdd, currentValueThemeNameToAdd, category, valueForQuill }).unwrap();
                setAddPostInTheme(false);
                setValueForQuill('');
            }
        } catch (error) {
            console.log(error);
        }
    }
    


    const columnsTheme = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'themeName', headerName: 'Theme Name', width: 200},
        { field: 'themeUser', headerName: 'User who added theme', width: 200},
        { field: 'themeDate', type:'dateTime', headerName: 'Date', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
            <>
                <GrEdit  className='editButtonGrid'/>
                <MdDeleteForever  className='deleteButtonGrid' onClick={() => removeThemePost(params.row.themeName)}/>
            </>
        
            )
        }
      ]
      

       const columns = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'subTitle', headerName: 'Sub title', width: 200},
        { field: 'subdescription', headerName: 'Sub Description', width: 200},
        { field: 'subUser', headerName: 'User who added sub', width: 150},
        { field: 'subDate', type:'dateTime', headerName: 'Date', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
            <>
                <MdDeleteForever  className='deleteButtonGrid' onClick={() => removeSubForumPost(params.id, params.row.subTitle)}/>
            </>
        
            )
        }
      ]

      const columnsPosts = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'postTitle', headerName: 'Title of post', width: 200},
        { field: 'postUsername', headerName: 'Who posted', width: 200},
        { field: 'postDate', type:'dateTime', headerName: 'When posted', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
            <>
                <MdDeleteForever  className='deleteButtonGrid' onClick={() => removeSubForumPost(params.id, params.row.subTitle)}/>
            </>
        
            )
        }
      ]


      useEffect(() => {
        if(success) {
        const timer = setTimeout(() => {
            setSuccess('');
        }, 2000)
        return () => clearTimeout(timer);
    }
      }, [success])


      useEffect(() => {
        if(addpost) {
            setCurrentSelectedTheme(secondData?.themeData[0].theme_name)
        }
    },[addpost, secondData?.themeData])
   

    console.log(posts);
    let content;
    console.log('error', error);
    if(isLoading) content = <LoadingBox />;

    if(error) (
        content = (
        <>
        <Header children={color} /><div className='forum-page-container'>
            <PhotoAfterHeader />
            <div className='forum-page-first'>
                
            </div>


            <div className='forum-page-second-container'>
                
                

                




                <div className='forum-page-posts'>
                    {/* <div className='forum-page-topic'>
                        <p>Topic</p>
                        <p>Last post</p>
                    </div>
                    {data?.length === 0 && <p>There isn't any posts yet.</p>}
                    <div className='forum-page-real-post'>

                        {forumPagePostsIds}

                    </div> */}
                    <div className='category-error-messsage'>
                    <p>{error?.data?.message}</p>

                    </div>

                </div>
            </div>
        </div>
        <Footer />
        </>
        )
    )

    const setTitleValueFunction = (e) => {
        setTitleOfSubForum(e.target.value);
    }
    const setSubDescValueFunction = (e) => {
        setSubDescription(e.target.value);
    }

    let addSubForumButton = null;

    if(addsubforum) {
        addSubForumButton = (
            <AddSubForum props={{addSubForumFunctionPost,errorAddSub, closeAddSubForumFunction, setSubDescValueFunction,setTitleValueFunction, user }}   />

        )
    }

    let addThemeForumButton = null;

    if(addthemeforum) {
        addThemeForumButton = (
            <AddThemeForum  props={{setValueForQuill, addThemeForumFunctionPost, errorMessage ,valueForQuill, TitleofTheme, PostForTheme, closeAddThemeFunction, setTitleOfTheme, setPostForTheme}}     />

        )
    }

    let addpostButton = null;

    if(addpost) {
        const {themeData } = secondData;
        addpostButton = (
            <AddPost props={{themeData, setValueForQuill, valueForQuill, addPostName, currentSelectedTheme,setCurrentSelectedTheme, handleInputAddThemePerPost, addPostPerThemePost, closePostFunction}}  />

        )
    }

    let removeTorSButton = null;

    if(removeTorS) {
        removeTorSButton = (
            <RemoveThemeOrSubForum props={{rowsTheme, columnsTheme, setOpenThemeGrid, addPostPerThemePost, closeRemoveTorS, success, errorMessage, setOpenSubGrid, openSubGrid, columns, rowsSub, openThemeGrid }}  />
        )
    }
    // console.log('TESTTTTTTTTTTTT', postsOfThemeData)
    let addPostInThemeButton;
    if(addPostInTheme) {
        const {themeData, postsOfThemeData } = secondData;

        addPostInThemeButton = (
        <AddPostForPerTheme props={{closeAddPostInTheme, addThemeInPostFunction, setCurrentValueThemeToAdd, setValueForQuill, valueForQuill, themeData, postsOfThemeData, setThemeNameToAdd, ThemeNameToAdd}} />
        )
    }

    let userWithRequiredRolesButton = null;

    if(userWithRequiredRoles) {
        userWithRequiredRolesButton = (
            <div className='openmenu'>
                            <GoThreeBars onClick={() => setIsOpenMenu(!isOpenMenu)}/>
                                        {
                                            isOpenMenu ? (
                                            <div className='openmenu-container'>
                                                <ul>
                                                    
                                                   
                                                    <li onClick={addSubForumFunction}>Add subforum</li>
                                                    <li onClick={addThemeFunction}>Add themes</li>
                                                    {

                                                        secondData?.themeData?.length > 0 ? (
                                                            <>
                                                            <li onClick={addPostFunction}>Add posts for themes</li>
                                                            <li onClick={openAddPostInTheme}>Add posts in theme</li>
                                                            </>
                                                        ) : null

                                                    }
                                                    {
                                                        secondData?.themeData.length > 0 || secondData?.subData.length > 0 ? (
                                                            <li onClick={removeThemeorSub}>Delete themes or subforums</li>
                                                        ) : null
                                                    } 
                                                </ul>
                                            </div>
                                            ) : null
                                        }
                                        </div>        
        )
    }

    let subDataLengthButton = null;

    if( secondData?.subData?.length > 0 ) {
        subDataLengthButton = (
            <div className='forum-page-posts'>
                            <div className='forum-page-topic'>
                                <p>Subforum</p>
                            </div>
                        <div className='forum-page-real-post'>
                            {
                        secondData?.subData?.map((sub) => {
                            const { subid, subdate, subuser, subtitle, subdescription } = sub
                        return (
                            <div key={subid}>
                            <div  className='forumpage-div-test' >
                            <div className='forum-page-icon'>
                            
                            </div>
                            <div className='forum-page-title'>
                                <div className='forum-page-title-link'>
                                    <Link to={`/forum/${category}/subforum/${subtitle}`} > <p className='community-category-name'>{subtitle}</p></Link> 
                                </div>
                                <span className='forum-page-by'>{subdescription}</span>
                                {/* <span className='forum-page-by'>by:</span> <Link to={`/forum/userprofile/${subuser}`}><span className='forum-page-user'>{subuser}</span></Link> <span className='forum-page-by'>{format(parseISO(subdate), "MMMM Qo, yyyy, H:m a")}</span> */}
                            </div>
                            <div className='forum-screen-last-post'>
                                <div className='forum-screen-last-post-p'>
                                <p>Re: tatata</p>
                                </div>
                                <div className='forum-screen-last-post-span'>
                                    <p className='last-post-p'>by: </p> <span className='last-post-span-black'>xeqtrTC</span> <span className='last-post-p'>04.22.2022 14:42</span>
                                </div>

                            </div>
                            </div>
                            </div>
                           
                        )
                    }) 
                }
                    </div>
                    </div> 
        )
    }

    let themeDataButton = null;

    if(secondData?.themeData?.length > 0)  {
        themeDataButton = (
            secondData?.themeData.map((item) => {
                console.log('itemi', item)
                return (
                    <div className='forum-page-posts' key={item.themeid}>
            <div className='forum-page-topic'>
                <p>{item.theme_name}</p>
            </div>
        <div className='forum-page-real-post'>
            {
                secondData?.postsOfThemeData?.map((sub) => {
                    const { theme_name, theme_postid, theme_postisLocked, theme_postusername , theme_posttitle, theme_postdate } = sub
                   
                    return (
          
                                theme_name === item.theme_name && 
                                
                                    <div key={theme_postid}>
                                        <div className='forumpage-div-test' >
                                            <div className='forum-page-icon'>
                                            
                                            </div>
                                            <div className='forum-page-title'>
                                                <div className='forum-page-title-link'>
                                                <Link to={`/forum/${category}/page/${theme_posttitle}`} > <p className='community-category-name'>{theme_posttitle}</p></Link> 
                                                </div>
                                                <span className='forum-page-by'>by:</span> <Link to={`/forum/userprofile/${theme_postusername}`}><span className='forum-page-user'>{theme_postusername}</span></Link> <span className='forum-page-by'>{format(parseISO(theme_postdate), "MMMM Qo, yyyy, H:m a")}</span>
                                            </div>
                                            <div className='forum-screen-last-post'>
                                                <div className='forum-screen-last-post-p'>
                                                <p>Re: tatata</p>
                                                </div>
                                                <div className='forum-screen-last-post-span'>
                                                    <p className='last-post-p'>by: </p> <span className='last-post-span-black'>xeqtrTC</span> <span className='last-post-p'>04.22.2022 14:42</span>
                                                </div>

                                            </div>
                                            </div>
                                    </div>

                            
                            
                    )
                })
            }
            
    </div>
    </div> 
                )
            })
        )
    }
    const buttonsCombined = (
        <>
        {addpostButton}
        {removeTorSButton}
        {addSubForumButton}
        {addThemeForumButton}
        {addPostInThemeButton}
        </>
    )
    const moreButtonsCombined = (
        <>
        {userWithRequiredRolesButton}
        {subDataLengthButton}
        {themeDataButton}
        </>
        
    )

    if(isSuccess && secondIsSuccess) {

        const { ids } = data;
        console.log('ids', ids);
        const forumPagePostsIds = ids?.length ? ids?.map(userId => <ForumPagePosts  userId={userId} category={category} key={userId} />) : null; 



        

        content = (
            <>

            {buttonsCombined}
                
            <Header children={color} />
            <div className='forum-page-container'>
                <PhotoAfterHeader />
                <div className='forum-page-first'>
                    <div className='forum-page-full'>
                        <p>{category}</p>
                    </div>
                </div>
                
                
                <div className='forum-page-second-container'>
                   
                {moreButtonsCombined}      

                    <div className='postbyuser-button'>
                        <Link to={`/forum/posting/${category}`}><button>Post a reply</button></Link>
                    </div>

                    

                    <div className='forum-page-posts'>
                        <div className='forum-page-topic'>
                            <p>Topic</p>
                            <p>Last post</p>
                        </div>
                        {data?.length === 0 && <p>There isn't any posts yet.</p>}
                        <div className='forum-page-real-post'>

                            {forumPagePostsIds}

                        </div>


                    </div>
                </div>
            </div>
            <Footer />
            </>
        )
    }

  return content;
}
