import React, { useCallback, useRef } from 'react'
import { useState } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import { Navigate, useNavigate } from 'react-router-dom';
import { usePostCategoryByUserMutation, useGetPostbyReplyidQuery, useUpdateReplyContentMutation } from '../../../redux/categoryApi';
import { useParams } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';


import { selectCurrentUser } from '../../../redux/authSlice';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import { useSelector } from 'react-redux';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';
import { useEffect } from 'react';
import LoadingBox from '../../LoadingBox/LoadingBox';
import RichEditor from './RichEditor';
import { AiOutlineArrowRight } from 'react-icons/ai';
import UseAuthHook from '../../Hooks/UseAuthHook';



// const getInitialState = (defaultValue) => {
//     if (defaultValue) {
//       const blocksFromHtml = htmlToDraft(defaultValue)
//       const { contentBlocks, entityMap } = blocksFromHtml
//       const contentState = ContentState.createFromBlockArray(
//         contentBlocks,
//         entityMap
//       )
//       return EditorState.createWithContent(contentState)
//     } else {
//       return EditorState.createEmpty()
//     }
//   }







export default function EditUserPost() {
    const navigate = useNavigate();
    const [color, setColor] = useState(true)
    const {category, title, replyid} = useParams()
    const { username } = UseAuthHook();
    const editorReference = useRef();
    // useEffect(() => {
    //     editorReference.current.focusEditor();
    // }, [editorReference]);
  

    const [error, setError] = useState(null);
    const [text, setText] = useState('');
    const { data, isLoading, isError, isSuccess, error: errorData } = useGetPostbyReplyidQuery(replyid)
    console.log(data);
    const [isuservalid, setisuservalid] = useState(null);
    const [updateReplyContent] = useUpdateReplyContentMutation();
    const [desc, setdesc] = useState('');

    // useEffect(() => {
    //     if(username === data[0]?.reply_username) {
    //         setisuservalid(true);
    //     } else {
    //         setisuservalid(false)
    //     }
    // }, [data, isuservalid])
    // useEffect(() => {
    //     if(isuservalid === false) {
    //         console.log('ne treba vam ovaj')
    //     }
    // }, [isuservalid])
    console.log(isuservalid)
    const [postCategoryByUser] = usePostCategoryByUserMutation();

    
    console.log(isError);
    console.log(errorData);
    
   
    
    // const [editorState, setEditorState] = useState(() => {
    //     const blocksFromHTML = convertFromHTML('fas')
    //       const contentState = ContentState.createFromBlockArray(
    //         blocksFromHTML.contentBlocks,
    //         blocksFromHTML.entityMap
    //       )
      
    //       return EditorState.createWithContent(contentState)
    //     }
//       )

//   const onEditorStateChange = (editorState) => {
//     setEditorState(editorState);
//   }

    const updateReplyContentOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const { updateReplyContentInfo } = await updateReplyContent({ desc, replyid }).unwrap();
            console.log(updateReplyContentInfo);
            navigate(`/forum/${category}/${title}`)
        } catch (error) {
            console.log(error);
        }
    }
console.log(desc);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(descriptionValue && titleValue) {
//       try {
//         console.log('ulazim')
//         const post = await postCategoryByUser({username, descriptionValue, titleValue, category}).unwrap();
//         console.log(post);  
//         setuserInfo('');
//         navigate(`/forum/${category}`)
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       setError('Fill all the fields')
//     }


    

//   }

    let content;

    if(isLoading ) {
        content = <LoadingBox />
    }

    if(errorData) {
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
                    <p>{errorData?.data?.message}</p>

                    </div>

                </div>
            </div>
        </div>
        <Footer />
        </>
        )
    }

    if(isSuccess) {

        const {reply_username, reply_category } = data[0];


        content = (
            reply_username === username ? (
                <>
                <Header children={color} />
            <PhotoAfterHeader />
            <div className='forum-page-first'>
                <div className='forum-page-full'>
                    <span>{category}</span> <AiOutlineArrowRight /> <span className='spantitle'>{title}</span> <AiOutlineArrowRight /> Edit post
                </div>
            </div>
            {/* <form onSubmit={handleSubmit}> */}
            <div className='posting-container'>
            {
              error && <div  className='error-container' >
              <p>{error}</p>
            </div>
            }
                {
                    isLoading ? (
                        <LoadingBox />
                    ) : (
                        <form onSubmit={updateReplyContentOnSubmit}>
                        <div className='posting-belowcontainer'>
                    <div className='posting-postnewtopic'>
                        <p>Post a new topic</p>
                    </div>
                    <div className='posting-subject'>
                        <span>Subject:</span>
                        <input type="text" name="title" value={data[0].reply_post} disabled  />
                    </div>
                    <div className='posting-textarea'>
                    <div>
                        <RichEditor replycontent={data[0].reply_content} setdesc={setdesc}/>
                        </div>
                        </div>
                    </div>
                    <div className='posting-category-button'>
                        <button>Edit post</button>
                    </div>
                    </form>
                    )
                }
                
            </div>
            {/* </form> */}
    
            <Footer />
        </>
    
            ) : (
                <Navigate to={`/forum/${reply_category}`} />
            )
        ) 
    }
    
    return content;
  
}
