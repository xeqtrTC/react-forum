import React, { useRef } from 'react'
import { useState } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { EditorState, convertToRaw} from 'draft-js';
import { useNavigate } from 'react-router-dom';
import { usePostCategoryByUserMutation } from '../../../redux/categoryApi';
import { useParams } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';


import { selectCurrentUser } from '../../../redux/authSlice';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import './PostingCategory.css';
import EditorConvertToJSON from './TextEditor';
import { useSelector } from 'react-redux';
export default function PostingCategory() {
    const navigate = useNavigate();
    const [color, setColor] = useState(true)
    const username = useSelector(selectCurrentUser);
    console.log(username);
    const {category} = useParams()
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [postCategoryByUser] = usePostCategoryByUserMutation();
    const [userInfo, setuserInfo] = useState({
      title: '',
    });
    const onChangeValue = (e) => {
      setuserInfo({
        ...userInfo,
        [e.target.name]:e.target.value
      });
    } 
    let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  }
  const descriptionValue = userInfo.description?.value;
  const titleValue = userInfo.title
  console.log(descriptionValue);
  console.log(titleValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(descriptionValue && titleValue) {
      try {
        console.log('ulazim')
        const post = await postCategoryByUser({username, descriptionValue, titleValue, category}).unwrap();
        console.log(post);  
        setuserInfo('');
        navigate(`/forum/${category}`)
      } catch (error) {
        console.log(error);
      }
    } else {
      setError('Fill all the fields')
    }


    

  }


    return (

    <>
        <Header children={color} />
        <div className='forum-screen-banner'>
            <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
        </div>
        <div className='forum-page-first'>
            <div className='forum-page-full'>
                <p>{category}</p>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='posting-container'>
        {
          error && <div  className='error-container' >
          <p>{error}</p>
        </div>
        }
            <div className='posting-belowcontainer'>
                <div className='posting-postnewtopic'>
                    <p>Post a new topic</p>
                </div>
                <div className='posting-subject'>
                    <span>Subject:</span>
                    <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}   placeholder="Title"  />
                </div>
                <div className='posting-textarea'>
                <div>
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
          <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
                </div>
                </div>
            </div>
            <div className='posting-category-button'>
                <button>Post a new topic</button>
            </div>
        </div>
        </form>

        <Footer />
    </>

  )
}
