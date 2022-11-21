import React, { useState, useEffect } from 'react'
import Header from '../../header/Header'
import LoadingBox from '../../LoadingBox/LoadingBox';
import Footer from '../../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams  } from 'react-router-dom';
import { selectCurrentUser} from '../../../redux/authSlice';
import { GoThreeBars } from 'react-icons/go'
import { AiFillLock } from 'react-icons/ai'
import { HiOutlineFolderRemove } from 'react-icons/hi'



import { AiOutlineCloseCircle,  AiOutlineArrowRight } from 'react-icons/ai'
import { useMovePostToSubForumMutation, useLazyGetSubCategoriesAdminQuery, useMovePostToAnotherCategoryMutation, useLazyGetAllCategoriesandSubcategoriesQuery, useGetPostsPerTitleQuery, usePostPostbyUserMutation, useLockTheThreadMutation, useUnLockTheThreadMutation, useIsLockedPostQuery } from '../../../redux/categoryApi';

import Pagination from '../Pagination/Pagination';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';
import PostsByUserPage from '../PostsByUsers/PostsByUserPage';
import ReactQuillEditor from '../../ReactQuillEditor';
import "react-quill/dist/quill.snow.css";
import UseAuthHook from '../../Hooks/UseAuthHook';
import EditReply from '../PostsByUsers/EditReply';
import { RequireRoles } from '../../Hooks/RequireRoles';


export default function ForumSubForumPagePosts({}) {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const { category, title } = useParams();
    const { roles, username } = UseAuthHook();
    const [text, setText] = useState('');
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);
    const [currentvalue, setcurrentvalue] = useState('');
    const [currentvalueSub, setcurrentvalueSub] = useState('');
    const [errorRate, setErrorRate] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

;


    const userWithRequiredRoles = roles?.includes(RequireRoles.Administrator) || roles?.includes(RequireRoles.CommunityManager) || roles?.includes(RequireRoles.Director) || roles?.includes(RequireRoles.HeadAdmin) || roles?.includes(RequireRoles.Admin)

    const [valueForQuill, setValueForQuill] = useState('');
    console.log('STATE', valueForQuill )
    const [lazyquery, setlazyquery] = useState({})
    const [lazyquerytwo, setlazyquerytwo] = useState({});
    const [onClickOpen, setOnClickOpen] = useState(false);
    const [onClickUnlock, setOnClickUnlock] = useState(false);
    const [onClickLazy, setOnClickLazy] = useState(false);
    const [onClickLazySub, setOnClickLazySub] = useState(false);
    const [onClickEditReply, setOnClickEditReply] = useState(false);

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isLocked, setIsLocked] = useState(0);
    const [postPostbyUser] = usePostPostbyUserMutation();
    const [movePostToAnotherCategory] = useMovePostToAnotherCategoryMutation();
    const [lockTheThread] = useLockTheThreadMutation();
    const [unLockTheThread] = useUnLockTheThreadMutation();
    const [trigger, result] = useLazyGetAllCategoriesandSubcategoriesQuery()
    const [triggerSecond] = useLazyGetSubCategoriesAdminQuery();
    const [movePostToSubForum] = useMovePostToSubForumMutation();
    const { data, isLoading, isSuccess, isError, error } = useGetPostsPerTitleQuery(title);
    const { data: isLockedPost, isSuccess: isSuccesLocked } = useIsLockedPostQuery(title)
    const [EditWidgetFormState,setEditWidgetFormState] = useState('');

    const [reply_contentForEdit, setReply_contentForEdit] = useState('');
    const [reply_id, setReply_id] = useState('');
  
    console.log(valueForQuill);

    const onClickLazyQuery = async () => {
        
        try {
            const dataLazyQuery = await trigger().unwrap();
            console.log(dataLazyQuery)
            const filter = dataLazyQuery.filter((item) => item.title !== category);
            setOnClickLazy(true)
            setlazyquery(filter)
            setIsOpenMenu(false)
        } catch (err) {
            console.log(err);
        }
    }

    
    useEffect(() => {
        if(onClickLazy) {
            setcurrentvalue(lazyquery[0].title)
        }
    },[onClickLazy])
    useEffect(() => {
        if(onClickLazySub ) {
            setcurrentvalueSub(lazyquerytwo[0].subtitle)
        }
    }, [onClickLazySub])

    const onClickLazyQueryTwo = async () => {
        
        try {
            const dataLazyQueryTwo = await triggerSecond().unwrap();
            console.log(dataLazyQueryTwo)
            setOnClickLazySub(true)
            setlazyquerytwo(dataLazyQueryTwo)
            setIsOpenMenu(false)
        } catch (err) {
            console.log(err);
        }
    }
    console.log('VALUE', currentvalueSub.split(" ")[0])

    const movePostToSubForumFunction = async (e) => {
        e.preventDefault();
        
            const splitted = currentvalueSub;

            if(splitted.length > 0) {
                try {
                    const data = await movePostToSubForum({splitted, title}).unwrap();
                    console.log('dataaaaaaaa', data);
                    const { category  } = data
                    setOnClickLazySub(false)
                    navigate(`/forum/${data}/subforum/${splitted}`)
                } catch (error) {
                    console.log(error);
                }
            } else {
                setErrorMessage("You didn't select subforum")
            }
        
    }

    const addQuote = (reply_content) => {

        setValueForQuill((value) => value + `<br><pre class="ql-syntax"  spellcheck="false">${reply_content}</pre></br>`)
        // setValueForQuill((value) => value + `<div style={{backgroundColor: 'red'}}>${reply_content}</div>` )
        // setValueForQuill((value) => value + `<p className='acabTest'> <blockquote>${reply_content}</blockquote></p>`)

    }
    
    const onClickLazyQueryOff = () => {
        setOnClickLazy(false);
        setIsOpenMenu(true)
    }

    const checkFilter =  (aeks) => {
        console.log('titleeeeeee', aeks);
        const test = lazyquery.filter(item => item.title !== aeks)
        console.log(test);
    }

    const setIsLockedMenu = () => {
        setOnClickOpen(true);
        setIsOpenMenu(false);
    }
    const setIsLockedMenuOff = () => {
        setOnClickOpen(false);
        setIsOpenMenu(true);
    }

    const setIsUnlockedMenu = () => {
        setOnClickUnlock(true);
        setIsOpenMenu(false)
    }
    const setIsUnlockedMenuOff = () => {
        setOnClickUnlock(false);
        setIsOpenMenu(false)
    }

    const setIsUnlockedMenuTwoOff = () => {
        setOnClickLazySub(false);
        setIsOpenMenu(true)
    }
    const onClickLazyOff = () => {
        setOnClickLazy(false)
        setIsOpenMenu(true)

    }

    const changeTextValue = (e) => {
        setText(e.target.value);
    }


   

    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexofFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = data?.slice(indexofFirstPost, indexOfLastPost);
    const PostbyUser = async (e) => {
        e.preventDefault();

        try {
            await postPostbyUser({ valueForQuill, title, category }).unwrap();
            // dispatch(data);
            // navigate(`/forum/${category}/${title}`)
            setValueForQuill('');




        } catch (error) {
            console.log('errrrrror', error)
            const { data } = error
            setErrorRate(data.message);
        }

    }

    const movePostToAnotherCategoryByChoice = async(e) => {
        e.preventDefault();


        try { 
            
            const movePost = await movePostToAnotherCategory({currentvalue, title}).unwrap();
            setOnClickLazy(false);
            navigate(`/forum/${currentvalue}`)
            console.log(movePost)

        } catch (error) {
            console.log(data?.error?.message)
        }
    } 

    const lockTheThreadbyAdmin = async (e) => {
        e.preventDefault();

        try {
            const lockThread = await lockTheThread( {title} ).unwrap();
            setOnClickOpen(false);
            console.log(lockThread)
        } catch (error) {
            console.log(error);
        }

    }

    const unLockTheThreadbyAdmin = async (e) => {
        e.preventDefault();

        try {
            const unlockThread = await unLockTheThread({ title }).unwrap();
            console.log(unlockThread);
            setOnClickUnlock(false)
        } catch (error) {
            console.log(error);
        }
    }


    const Paginate = (pageNumber) => setCurrentPage(pageNumber);
    // useEffect(() => {
    //     data
    // }, [postPostbyUser])
    
   
    // console.log(JSON.parse(user))
    // console.log(JSON.parse(currentPosts.reply_username));

    const [color, setColor] = useState(true)


    // PAGINATION
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(data?.ids?.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };

      useEffect(() => {
        if(errorRate) {
            const timer = setTimeout(() => {
                setErrorRate('');
            }, 4000)

            return () => clearTimeout(timer);
        }
      }, [errorRate])


    let content;

    let movePostToCategoryButton;
    if(onClickLazy) {
        movePostToCategoryButton = (
            <div className='onclickopen-container'>
                                        <div className='onClickOpen'> 
                                        <div className='addsubforum-close'>
                                            <AiOutlineCloseCircle onClick={onClickLazyQueryOff} />
                                        </div>
                                        <form onSubmit={movePostToAnotherCategoryByChoice}>
                                            <div className='select-option-container'>
                                            List of categories

                                        <select onClick={(e) => setcurrentvalue(e.target.value)}>

                                        {
                                            lazyquery?.map((sub) => {
                                                const aeks = sub.title
                                                const { cid } = sub
                                                return (
                                                        <option  value={aeks} key={cid}>{aeks}</option>
                                                )
                                            })
                                        }

                                        </select>
                                        </div>
                                        
                                        <div className='onclickopen-choose'>
                                                <button >Move post to another category</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
        )
    }

    let movePostToSubForumButton;

    if(onClickLazySub) {
        movePostToSubForumButton = (
            <div className='onclickopen-container'>
                                        <div className='onClickOpen'> 
                                        <div className='addsubforum-close'>
                                            <AiOutlineCloseCircle onClick={setIsUnlockedMenuTwoOff} />
                                        </div>
                                        <form onSubmit={movePostToSubForumFunction}>
                                        {
                                            errorMessage && (
                                                <div className='error'>
                                                <span>{errorMessage}</span>
                                                </div>
                                            )
                                        }
                                        <div className='select-option-container'>
                                        List of subforums

                                        <select onClick={(e) => setcurrentvalueSub(e.target.value)}>
                                        {
                                            lazyquerytwo?.map((sub) => {
                                                const { title, subtitle, subid} = sub
                                                return (
                                                        <option key={subid} >{subtitle}</option>
                                                )
                                            })
                                        }

                                        </select>

                                        </div>
                                        
                                        <div className='onclickopen-choose'>
                                                <button >Move this post to subforum</button>
                                            </div>
                                            </form>

                                    </div>
                                </div>
        )
    }

    let lockTopicButton;

    if(onClickOpen) {
        lockTopicButton = (
            <div className='onclickopen-container'>
                                        <div className='onClickOpen'> 
                                        <form onSubmit={lockTheThreadbyAdmin}>
                                        {
                                            errorMessage && (
                                                <div className='error'>
                                                <span>{errorMessage}</span>
                                                </div>
                                            )
                                        }

                                            <div className='onclickopen-closewindow'>
                                                <AiOutlineCloseCircle onClick={() => setOnClickOpen(false)} />
                                            </div>
                                            <div className='onclickopen-middle'>
                                                Are you sure you want to lock this thread?
                                            </div>
                                            <div className='onclickopen-choose'>
                                                <button>Yes</button>
                                            </div>
                                            </form>

                                    </div>
                                </div>
        )


    }

    const editReplyFunction = ({reply_content, replyid}) => {
        console.log('idddddd', replyid);
        setOnClickEditReply(true);
        setReply_contentForEdit(reply_content);
        setReply_id(replyid)
    }
    const editReplyClose = () => {
        setOnClickEditReply(false);
        setReply_contentForEdit('');
        setReply_id('');

    }

    console.log('reply', reply_contentForEdit);
    let editReplyButton;

    if(onClickEditReply) {
        editReplyButton = (
            <EditReply reply_contentForEdit={reply_contentForEdit} reply_id={reply_id} editReplyClose={editReplyClose} />
        )
    }

    let unlockTopicButton;

    if(onClickUnlock) (
        unlockTopicButton = (
            <div className='onclickopen-container'>
                       <div className='onClickOpen'> 
                           <div className='onclickopen-closewindow'>
                               <AiOutlineCloseCircle onClick={() => setOnClickUnlock(false)} />
                           </div>
                           <div className='onclickopen-middle'>
                               Are you sure you want to unlock this thread?
                           </div>
                           <div className='onclickopen-choose'>
                               <button onClick={unLockTheThreadbyAdmin}>Yes</button>
                           </div>

                   </div>
               </div>
        )
    )

    let requiredUsersButton;

    if(userWithRequiredRoles) {
        requiredUsersButton = (
            <div className='openmenu'>
                                        <GoThreeBars onClick={() => setIsOpenMenu(!isOpenMenu)}/>
                                        {
                                            isOpenMenu ? (
                                            <div className='openmenu-container'>
                                                <ul>
                                                    {

                                                        isLockedPost.isLocked === 1 ? <li onClick={setIsUnlockedMenu}><AiFillLock /> Unlock the post</li> : <li onClick={setIsLockedMenu}><AiFillLock /> Lock the post</li>

                                                    }
                                                   
                                                    <li onClick={onClickLazyQuery}><HiOutlineFolderRemove /> Move post to another category</li>
                                                    <li onClick={onClickLazyQueryTwo}><HiOutlineFolderRemove />Move post to ANY subforum</li>
                                                    <li>Lock the post</li>
                                                    <li>Lock the post</li>
                                                    <li>Lock the post</li>

                                                </ul>
                                            </div>
                                            ) : null
                                        }
                                        
                                      </div>
        )
    }
    const groupedButtons = (
        <>
        {unlockTopicButton}
        {lockTopicButton}
        {movePostToSubForumButton}
        {movePostToCategoryButton}
        {editReplyButton}
        </>
    )


    if(isLoading) content = <LoadingBox />;

    if(error) (
        

        content = (
            <>
            <Header children={color} />
           
            <div className='forum-screen-container'>
                      <PhotoAfterHeader />
                      <div className='forum-page-first'>
                          {/* <div className='forum-page-full'>
                              <span>{category}</span> <AiOutlineArrowRight /> <span className='spantitle'>{title}</span>
                          </div> */}
                      </div>
                        
                      <div className='forum-userby-posts-container'>
                          
                            
                        <div className='category-error-messsage'>
                            <p>{error?.data?.message}</p>

                        </div>
                      
                          
                            
                      </div>
                    
                    {/* {
                        roles[0].Administrator > 0 ? 
                        <div className='lock-the-post'>
                        {
                            isLockedPost.isLocked ? <button onClick={() => setOnClickUnlock(true)}>Unlock this page</button> : <button onClick={() => setOnClickOpen(!onClickOpen)}>Lock this topic</button>
                        }
                        
                     
                        </div>

                        :

                        null
                    } */}
                  </div>
                  <Footer />
                  </>
        )
    )


    if(isSuccess && isSuccesLocked) {

        const { ids } = data
        const displayUsers = ids.slice(pagesVisited, pagesVisited + usersPerPage)
          
        console.log(displayUsers)
        


        const forumPostsPerPost = displayUsers?.length ? displayUsers?.map(userId => <PostsByUserPage key={userId} userWithRequiredRoles={userWithRequiredRoles} editReplyFunction={editReplyFunction} onClickEditReply={onClickEditReply} addQuote={addQuote} user={user} userId={userId} title={title} category={category} isLocked={isLockedPost} />) : null
        
        content = (
            <>
            {groupedButtons}
            <Header children={color} />
           
                    <div className='forum-screen-container'>
                              <PhotoAfterHeader />
                              <div className='forum-page-first'>
                                  <div className='forum-page-full'>
                                      <span>{category}</span> <AiOutlineArrowRight /> <span className='spantitle'>{title}</span>
                                  </div>
                              </div>
                                
                              <div className='forum-userby-posts-container'>
                                  <div className='postbyuser-button'>
                                      {/* {
                                        isLocked ? null : <button>Post a reply</button>
                                      } */}
                                      {requiredUsersButton}
                                  </div>
                                    <div className='pagination-container-searchperpost'>
                                        <Pagination pageCount={pageCount} changePage={changePage} />                                   
                                    </div>

                                    
                                 {
                                    forumPostsPerPost
                                 }
                                   
                                    
                              </div>
                            <div className='post-reply'>
                                {
                                    isLockedPost.isLocked === 1 ? <div className='locked-container'><p>This page is locked.</p> </div> : 
                                    <form onSubmit={PostbyUser}>
                                        
                                    <div className='post-reply-input'>
                                        {
                                            errorRate && (
                                                <div className='post-reply-error'>
                                                    {errorRate}
                                                </div>
                                            )
                                        }
                                        <div className='post-reply-first-input'>
                                            <input disabled type='text' placeholder={`${title}`} />
                                        </div>
                                        <div className='post-reply-second-input'>
                                            {editReplyButton ? null : <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />}
                                        </div>
                                    </div>   
                                    <div className='post-reply-button'>
                                        <button>Submit reply</button>         
                                    </div>



                                </form>
                                }
                               
                            </div>
                            {/* {
                                roles[0].Administrator > 0 ? 
                                <div className='lock-the-post'>
                                {
                                    isLockedPost.isLocked ? <button onClick={() => setOnClickUnlock(true)}>Unlock this page</button> : <button onClick={() => setOnClickOpen(!onClickOpen)}>Lock this topic</button>
                                }
                                
                             
                                </div>

                                :

                                null
                            } */}
                          </div>
                          <Footer />
                          </>
              
    
        )
    }













  return content
}
