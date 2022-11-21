import React from 'react'
import { useState } from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { useNavigate } from 'react-router-dom';
import { usePostCategoryByUserMutation } from '../../../redux/categoryApi';
import { useParams } from 'react-router-dom';





import { selectCurrentUser } from '../../../redux/authSlice';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import './PostingCategory.css';
import { useSelector } from 'react-redux';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';
import ReactQuillEditor from '../../ReactQuillEditor';
export default function PostingCategory() {
    const navigate = useNavigate();
    const [color, setColor] = useState(true)
    const username = useSelector(selectCurrentUser);
    console.log(username);
    const {category} = useParams()
    const [error, setError] = useState(null);
    const [test, setTest] = useState('');
    // const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [valueForQuill, setValueForQuill] = useState('');
    console.log(valueForQuill);
    const [postCategoryByUser] = usePostCategoryByUserMutation();
    const [titleValue, setTitleValue] = useState('');
    console.log(test);

    const onChangeValue = (e) => {
      setTitleValue(e.target.value)
    }
    // const onChangeValue = (e) => {
    //   setuserInfo({
    //     ...userInfo,
    //     [e.target.name]:e.target.value
    //   });
    // } 
    // let editorState = EditorState.createEmpty();
  // const [description, setDescription] = useState(editorState);
  // const onEditorStateChange = (editorState) => {
  //   setDescription(editorState);
  // }
  // const descriptionValue = userInfo.description?.value;
  // const titleValue = userInfo.title
  // console.log(descriptionValue);
  // console.log(titleValue);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionValue = valueForQuill;

    if(descriptionValue && titleValue) {
      try {
        console.log('ulazim')
        const post = await postCategoryByUser({username, descriptionValue, titleValue, category}).unwrap();
        console.log(post);  
        setTitleValue('');
        // setuserInfo('');
        navigate(`/forum/${category}`)
      } catch (error) {
        console.log(error);
        const { data } = error;
        setError(data?.message);
      }
    } else {
      setError('Fill all the fields')
    }


    

  }

  

  const embedVideoCallBack = (link) =>{
    if (link.indexOf("youtube") >= 0){
        link = link.replace("watch?v=","embed/");
        link = link.replace("/watch/", "/embed/");
        link = link.replace("youtu.be/","youtube.com/embed/");
    }
    return link
}


    return (

    <>
        <Header children={color} />
        <PhotoAfterHeader />
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
                    <input type="text" name="title" value={titleValue} onChange={onChangeValue}   placeholder="Title"  />
                </div>
                <div className='posting-textarea'>
                <div>
                  <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />
                {/* <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="classNameEditor"
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    embedded:{
                        embedCallback: embedVideoCallBack
                    }
                }}
                  mention={{
                    separator: ' ',
                    trigger: '@',
                    suggestions: [
                      { text: 'APPLE', value: 'apple', url: 'apple' },
                      { text: 'BANANA', value: 'banana', url: 'banana' },
                      { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                      { text: 'DURIAN', value: 'durian', url: 'durian' },
                      { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                      { text: 'FIG', value: 'fig', url: 'fig' },
                      { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                      { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                    ],
                    
                  }}
                /> */}
          {/* <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } /> */}
                </div>
                </div>
            </div>
            {/* <ReactQuill modules={modules} onChange={setTestaaa} theme='snow' /> */}
            <div className='posting-category-button'>
                <button>Post a new topic</button>
            </div>
        </div>
        </form>

        <Footer />
    </>

  )
}
