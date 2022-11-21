import React, { useState, useEffect } from 'react'
import { AiOutlineArrowRight, AiOutlineCloseCircle } from 'react-icons/ai';
import { useParams, Link } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { useAddAlreadyPinnedMessageMutation, useGetPinnedThemesPerCategoryQuery, useGetSubCategoriesPerCategoryQuery, useAddPinnedThemesPerSubCategoryMutation, useDeletePinnedThemeMutation } from '../../../redux/categoryApi';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';

import { format,  parseISO   } from 'date-fns'


import './ForumSubForumPage.css';
import LoadingBox from '../../LoadingBox/LoadingBox';
import { FaLock } from 'react-icons/fa';
import { TbBrandPagekit } from 'react-icons/tb';
import { GoThreeBars } from 'react-icons/go';
import AddPinnedMessage from './AddPinnedMessage';
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import AddAlreadyPinned from './AddAlreadyPinned';
import { RequireRoles } from '../../Hooks/RequireRoles';
import UseAuthHook from '../../Hooks/UseAuthHook';
import DeletePinnedThemes from './DeletePinnedThemes';
import '../ForumCategoryPage/ForumPage.css'

export default function ForumSubForumPage(subid) {
    console.log(subid);
    const { username, roles } = UseAuthHook();
    const { category, subtitle } = useParams();
    const [color, setColor] = useState(true);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [addthemepinnedforum, setaddthemepinnedforum] = useState(false);
    const [addThemeAlreadyPosted, setaddThemeAlreadyPosted] = useState(false);
    const [deletePinnedThemes, setDeletePinnedThemes] = useState(false);
    const [namePinned, setNamePinned] = useState('');
    const [success, setSuccess] = useState(null);
    const [errorAddTheme, setErrorAddTheme] = useState(null);
    const [currentSelectedValue, setCurrentSelectedValue] = useState('');
    const [valueForQuill,setValueForQuill] = useState('');

    // const [textPinned, setTextPinned] = useState('');

    
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
      console.log(success);

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(
        rawContentState, 
      );
    const { data, isLoading, isSuccess, isError, error} = useGetSubCategoriesPerCategoryQuery({category, subtitle});
    const { data: pinnedThemeData, isSuccess: isSuccessPineed} = useGetPinnedThemesPerCategoryQuery(subtitle)

    const [addPinnedThemesPerSubCategory] = useAddPinnedThemesPerSubCategoryMutation();
    const [AddAlreadyPinnedMessage] = useAddAlreadyPinnedMessageMutation();
    const [DeletePinnedTheme] = useDeletePinnedThemeMutation();
    console.log('aseasesaeasesa', pinnedThemeData);

    const openAddThemePinned = () => {
        setaddthemepinnedforum(true);
        setIsOpenMenu(false);
    }
    const closeAddThemeForum = () => {
        setaddthemepinnedforum(false);
        setIsOpenMenu(true);
    }
    const openaddThemeAlreadtPosted = () => {
        setaddThemeAlreadyPosted(true);
        setIsOpenMenu(false);
    }
    const closeaddThemeAlreadyPosted = () => {
        setaddThemeAlreadyPosted(false);
        setIsOpenMenu(false);
    }
    const openDeleteTheme = () => {
        setDeletePinnedThemes(true);
        setIsOpenMenu(false);
    }
    const closeDeleteTheme = () => {
        setDeletePinnedThemes(false);
        setIsOpenMenu(true);
    }
    const updateValue = (e) => {
        setNamePinned(e.target.value)
    }

console.log(data);

    const addPinnedThemesPerSubCategoryFunction = async (e) => {
        e.preventDefault();

        if(namePinned, valueForQuill) {
            const textPinned = valueForQuill;
            try {
                await addPinnedThemesPerSubCategory({namePinned, textPinned, subtitle}).unwrap();
                setValueForQuill('');
                // textPinned('');
                setNamePinned('');
                setSuccess('Dodali ste pinovanu poruku');
                setaddthemepinnedforum(false);
                
            } catch ( error ) {
                const { data } = error;
                setErrorAddTheme(data?.message)
                console.log('error', error);
            }
        }

        
    }

    const AddAlreadyPinnedMessageFunction = async (e) => {
        e.preventDefault();

        if(valueForQuill) {
            const alreadyTextPinned = valueForQuill;
            try {
                
                await AddAlreadyPinnedMessage({ currentSelectedValue, alreadyTextPinned, subtitle  })
                setSuccess(`Dodali ste pinovanu poruku u ${currentSelectedValue}`)
                setValueForQuill('');
                setaddThemeAlreadyPosted(false);


            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteTheme = async(pinTitle) => {
        console.log('pinTITKLE', pinTitle)
        try {
            await DeletePinnedTheme({ pinTitle }).unwrap();
        } catch (error) {
            console.log(error);
        }   
    }


    const userWithRequiredRoles = roles.includes(RequireRoles.Administrator) || roles.includes(RequireRoles.Director);

    let addthemepinnedforumButton = null;

    if(addthemepinnedforum) {
        addthemepinnedforumButton = (
            <AddPinnedMessage success={success} errorAddTheme={errorAddTheme} valueForQuill={valueForQuill} setValueForQuill={setValueForQuill} addPinnedThemesPerSubCategoryFunction={addPinnedThemesPerSubCategoryFunction}  closeAddThemeForum={closeAddThemeForum} updateValue={updateValue} namePinned={namePinned}/>

        )
    }

    let addThemeAlreadyPostedButton = null;
    
    if(addThemeAlreadyPosted) {
        addThemeAlreadyPostedButton = (
            <AddAlreadyPinned  AddAlreadyPinnedMessageFunction={AddAlreadyPinnedMessageFunction} valueForQuill={valueForQuill} setValueForQuill={setValueForQuill} closeaddThemeAlreadyPosted={closeaddThemeAlreadyPosted} pinnedThemeData={pinnedThemeData} setCurrentSelectedValue={setCurrentSelectedValue} />

        )
    }

    let deletePinnedThemesButton = null;

    if(deletePinnedThemes) {
        deletePinnedThemesButton = (
            <DeletePinnedThemes closeDeleteTheme={closeDeleteTheme} pinnedThemeData={pinnedThemeData} deleteTheme={deleteTheme}/>
        )
    }

    const buttonsCombined = (
        <>
        {addthemepinnedforumButton}
        {addThemeAlreadyPostedButton}
        {deletePinnedThemesButton}
        </>
    )

    let userWithRequiredRolesButton = null;

    if(userWithRequiredRoles) {
        userWithRequiredRolesButton = (
            <div className='openmenu'>
                        <GoThreeBars onClick={() => setIsOpenMenu(!isOpenMenu)}/>
                                        {
                                            isOpenMenu ? (
                                            <div className='openmenu-container'>
                                                <ul>
                                                    
                                                   
                                                    {/* <li onClick={addSubForumFunction}>Add subforum</li> */}
                                                    <li onClick={openAddThemePinned}>Add pinned messages</li>
                                                    {
                                                        pinnedThemeData.length > 0 ? (
                                                            <>
                                                            <li onClick={openaddThemeAlreadtPosted}>Add message inside pinned messages</li>
                                                            <li onClick={openDeleteTheme}>Delete pinned themes</li>
                                                            </>
                                                            ) : (
                                                            null
                                                        )
                                                    }

                                                </ul>
                                            </div>
                                            ) : null
                                        }
                                        </div>
        )
    }

    let pinnedThemeDataButton = null;

    if(pinnedThemeData?.length > 0) {
        pinnedThemeDataButton = (
            <div className='forum-page-posts'>
                        <div className='forum-page-topic'>
                            <p>Pinned messages</p>
                        </div>
                        <div className='forum-page-real-post'> 
                        
                        
                                            
                                            {
                                                pinnedThemeData?.map((sub) => {
                                                    const { pinned_title, pinned_username, pinned_id, pinned_date } = sub
                                                    return (
                                                        <div className='forumpage-div-test-subforum' key={pinned_id}>
                                                        <div className='forum-page-icon'>
                                                        
                                                        <TbBrandPagekit />
                                                        
                                                        </div>
                                                        <div className='forum-page-title'>
                                                            <div className='forum-page-title-link'>
                                                                <Link to={`/forum/${category}/subforum/${subtitle}/${pinned_title}`}> <span className='community-category-name'>{pinned_title} </span></Link> 
                                                                
                                                            </div>
                                                            <span className='forum-page-by'>by:</span> <Link to={`/forum/userprofile/${pinned_username}`}><span className='forum-page-user'>{pinned_username}</span></Link> <span className='forum-page-by'>{format(parseISO(pinned_date), "MMMM Qo, yyyy, H:m a")}</span>
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

                                                    )
                                                })
                                            }
                        </div>
                    </div> 
        )
    }

    const secondButtonsCombined = (
        <>
        {userWithRequiredRolesButton}
        {pinnedThemeDataButton}
        </>
    )
    
    let dataLengthButton = null;

    if(data?.length === 0) {
        dataLengthButton = (
            <p style={{padding: '0.5rem'}}>There isn't any posts yet.</p>
        )
    }

    useEffect(() => {
        if(success) {
        const timer = setTimeout(() => {
            setSuccess('');
            setaddthemepinnedforum(false);
        }, 2000)
        return () => clearTimeout(timer);
    }
      }, [success])

     

    let content;

    if(isLoading) content = <LoadingBox />

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
    if(isSuccess) {


        content = (
            <>
           {buttonsCombined}
            <Header children={color} />
                <PhotoAfterHeader />
                <div className='forum-page-first'>
                    <div className='forum-page-full'>
                    <span>{category}</span> <AiOutlineArrowRight /> <span className='spantitle'>{subtitle}</span> 
        
                    </div>
                </div>
                <div className='forum-page-second-container'>
                
                {secondButtonsCombined}
                <div className='forum-page-posts'>
                        <div className='forum-page-topic'>
                            <p>Topic</p>
                        </div>
                        {dataLengthButton}
                        <div className='forum-page-real-post'>

                        {
                        data?.map((item) => {
                                                const { category, content, idsubcategory, isLocked, postdate, postid, posttitle, postusername } = item;
                                                return (
                                                        <div className='forumpage-div-test-subforum' key={postid}>
                                                        <div className='forum-page-icon'>
                                                        {
                                                            isLocked === 1 ? <FaLock /> :  <TbBrandPagekit />
                                                        }
                                                        </div>
                                                        <div className='forum-page-title'>
                                                            <div className='forum-page-title-link'>
                                                                <Link to={`/forum/${category}/${subtitle}/${posttitle}`}> <span className='community-category-name'>{posttitle} </span></Link> 
                                                                
                                                            </div>
                                                            <span className='forum-page-by'>by:</span> <Link to={`/forum/userprofile/${postusername}`}><span className='forum-page-user'>{postusername}</span></Link> <span className='forum-page-by'>{format(parseISO(postdate), "MMMM Qo, yyyy, H:m a")}</span>
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
                                                )
                                            })}
                        </div>


                    </div>
                    {/* <div className='forum-page-posts'>
                        <div className='forum-page-topic'>
                            <p>Subforum</p>
                        </div>
                        <div className='forum-page-real-post'>
                        

                                            {
                                                data?.length === 0 && (
                                                    <div className='forumpage-div-subforum' >
                                                            
           
                                                        <div className='forum-page-subcategories-subforum-title'>
                                                            <div className='forum-page-title-link'>

                                                        <p className='community-category-name'>There isn't any posts here.</p>
                                                        
                                                        </div>
                                                        </div>
                                                        </div>
                                                )
                                            }
                                            {data?.map((item) => {
                                                const { category, content, idsubcategory, isLocked, postdate, postid, posttitle, postusername } = item;
                                                return (
                                                        <div className='forumpage-div-test' key={postid}>
                                                        <div className='forum-page-icon'>
                                                        {
                                                            isLocked === 1 ? <FaLock /> :  <TbBrandPagekit />
                                                        }
                                                        </div>
                                                        <div className='forum-page-title'>
                                                            <div className='forum-page-title-link'>
                                                                <Link to={`/forum/${category}/${subtitle}/${posttitle}`}> <p className='community-category-name'>{posttitle} </p></Link> 
                                                                
                                                            </div>
                                                            <span className='forum-page-by'>by:</span> <Link to={`/forum/userprofile/${postusername}`}><span className='forum-page-user'>{postusername}</span></Link> <span className='forum-page-by'>{format(parseISO(postdate), "MMMM Qo, yyyy, H:m a")}</span>
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
                                                )
                                            })}
                                            {
                                                data?.map((sub) => {
                                                    return (
                                                        <div className='forumpage-div-subforum' key={sub.postid}>
                                                            <div className='forum-page-icon'>
                                                                {sub.isLocked === 1 ? <FaLock /> :  <TbBrandPagekit /> }
                                                             </div>
           
                                <div className='forum-page-subcategories-subforum-title'>
                                    <div className='forum-page-title-link'>
                                                        <Link to={`/forum/${category}/${subtitle}/${sub.posttitle}`}> 

                                                        <p className='community-category-name'>{sub.posttitle}</p>
                                                        
                                                        </Link>  
                                                        </div>
                                                        </div>
                                                        </div>

                                                    )
                                                })
                                            }
                        </div>
                    </div>  */}
                </div>
                
            <Footer />
                        
        </>
        )

    }

  return content;
}
