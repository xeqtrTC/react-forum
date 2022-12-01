import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';


import './ForumSubForumPage.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactQuillEditor from '../../ReactQuillEditor';

export default function AddAlreadyPinned({ valueForQuill, setValueForQuill, AddAlreadyPinnedMessageFunction, success, setAlreadyTextPinned, closeaddThemeAlreadyPosted, addThemeAlreadyPosted, pinnedThemeData, setCurrentSelectedValue}) {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    //   console.log(success);

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(
        rawContentState, 
      );

    //   useEffect(() => {
    //     setAlreadyTextPinned(markup)
    //   }, [markup])
    useEffect(() => {
        setCurrentSelectedValue(pinnedThemeData[0]?.pinned_title)
    }, [])
  return (
    <div className='onclickopen-container'>
                        <div className='addtheme-container'>
                            <form onSubmit={AddAlreadyPinnedMessageFunction}>
                            <div className='addsubforum-close'>
                                <AiOutlineCloseCircle onClick={closeaddThemeAlreadyPosted}/>
                            </div>
                            {
                                    success && (
                                        <div className='success-delete'>
                                            <span>{success}</span>
                                        </div>
                                    )
                            }
                            <div className='addtheme-input-container'>
                                <div className='addpost-input-container-name'>
                                    <span>List of themes for this category</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                        <select onClick={(e) => setCurrentSelectedValue(e.target.value)}>
                                        {
                                            pinnedThemeData?.map((item) => {
                                                const { pinned_title, pinned_id } = item
                                                return (
                                                    <option key={pinned_id} value={pinned_title}>{pinned_title}</option>

                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            

                            <div className='text-between'>
                                Text for the pinned message
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
                                <button>Add this to subforum</button>
                            </div>


                            </form>
                        </div>
                    </div>
  )
}
