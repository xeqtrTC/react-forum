import React, { useState, useRef } from 'react';
import './ForumPage.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactQuillEditor from '../../ReactQuillEditor';

export default function AddPost({ props  }) {
    const { closePostFunction, setValueForQuill,  valueForQuill, themeData, setCurrentSelectedTheme, addPostName, handleInputAddThemePerPost, addPostPerThemePost } = props;
  return (
    <div className='onclickopen-container'>
                        <div className='addtheme-container'>
                            <form onSubmit={addPostPerThemePost}>
                            <div className='addsubforum-close'>
                                <AiOutlineCloseCircle onClick={closePostFunction}/>
                            </div>
                            <div className='addtheme-input-container'>
                                <div className='addpost-input-container-name'>
                                    <span>List of themes for this category</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                        <select onClick={(e) => setCurrentSelectedTheme(e.target.value)}>
                                        {
                                            themeData?.map((item) => {
                                                const { theme_name, themeid } = item
                                                console.log('item', item)
                                                return (
                                                    <option value={theme_name} key={themeid}>{theme_name}</option>

                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            
                            <div className='addtheme-input-container'>
                                <div className='addpost-input-container-name'>
                                    <span>Name of post</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                    <input type='text' value={addPostName} onChange={handleInputAddThemePerPost}/>
                                </div>
                            </div>

                            <div className='text-between'>
                                Text for the post
                            </div>

                            <div className='addtheme-editor-container'>
                            <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />
                            {/* <textarea style={{display:'none'}} disabled  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
                            </div>
                            <div className='addsubforum-button'>
                                <button>Add this to subforum</button>
                            </div>


                            </form>
                        </div>
                    </div>
  )
}
