import React from 'react';
import './ForumPage.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactQuillEditor from '../../ReactQuillEditor';



function AddThemeForum({props}) {
    const { addThemeForumFunctionPost, errorMessage, closeAddThemeFunction, setTitleOfTheme, TitleofTheme, PostForTheme, setPostForTheme, setValueForQuill, valueForQuill } = props; 
  return (
    <div className='onclickopen-container'>
                        <div className='addtheme-container'>
                        <form onSubmit={addThemeForumFunctionPost}>

                            <div className='addsubforum-close'>
                                <AiOutlineCloseCircle onClick={closeAddThemeFunction} />
                            </div>
                            {
                                errorMessage && <div className='error'>
                                <span>{errorMessage}</span>
                            </div>
                            }
                            <div className='addtheme-input-container'>
                                <div className='addtheme-input-container-name'>
                                    <span>Name of theme</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                    <input type='text' value={TitleofTheme} onChange={(e) => setTitleOfTheme(e.target.value)} />
                                </div>
                            </div>
                            <div className='addtheme-input-container'>
                                <div className='addtheme-input-container-name'>
                                    <span>Name of post</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                    <input type='text'  value={PostForTheme} onChange={(e) => setPostForTheme(e.target.value)}/>
                                </div>
                            </div>

                            <div className='text-between'>
                                Text for the pinned message
                            </div>

                            <div className='addtheme-editor-container'>
                            <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />
                            </div>
                            <div className='addsubforum-button'>
                                <button>Add this to subforum</button>
                            </div>


                            </form>

                        </div>
                    </div>
  )
}

export default AddThemeForum