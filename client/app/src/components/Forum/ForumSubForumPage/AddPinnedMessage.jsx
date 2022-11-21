import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";


import './ForumSubForumPage.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactQuillEditor from '../../ReactQuillEditor';

export default function AddPinnedMessage({ valueForQuill, setValueForQuill, errorAddTheme,success, addPinnedThemesPerSubCategoryFunction, closeAddThemeForum, updateValue, setTextPinned, namePinned }) {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
      console.log(success);
      

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(
        rawContentState, 
      );
      
  return (
    <div className='onclickopen-container'>
                        <div className='addtheme-container'>
                        <form onSubmit={addPinnedThemesPerSubCategoryFunction} >

                            <div className='addsubforum-close'>
                                <AiOutlineCloseCircle onClick={closeAddThemeForum} />
                            </div>

                            {
                                    success && (
                                        <div className='success-delete'>
                                            <span>{success}</span>
                                        </div>
                                    )
                            }

                            
                            {
                                    errorAddTheme && (
                                        <div className='addsubforum-error-messsage'>{errorAddTheme}</div>
                                    )
                                }

                            <div className='addtheme-input-container'>
                                <div className='addtheme-input-container-name'>
                                    <span>Name of pinned message</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                    <input type='text' value={namePinned} onChange={updateValue}/>
                                </div>
                            </div>

                            <div className='text-between'>
                                Text for the post
                            </div>

                            <div className='addtheme-editor-container'>
                            <ReactQuillEditor valueForQuill={valueForQuill} setValueForQuill={setValueForQuill}/>
                            {/* <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="classNameEditor"
                                onEditorStateChange={setEditorState}
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
                                />
                            <textarea style={{display:'none'}} disabled  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
                            </div>
                            <div className='addsubforum-button'>
                                <button>Add this to subforuma</button>
                            </div>


                            </form>

                        </div>
                    </div>
  )
}
