import React, { useEffect } from 'react'
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactQuillEditor from '../../ReactQuillEditor';

export default function AddPostForPerTheme({ props}) {
    const { closeAddPostInTheme, setValueForQuill, addThemeInPostFunction, valueForQuill, themeData, postsOfThemeData, setThemeNameToAdd, ThemeNameToAdd, setCurrentValueThemeToAdd } = props;
    const [itemList, setItemList] = useState([]);

    const filterItem = () => {
        const filteredItem = postsOfThemeData.filter((item) => item.theme_name === ThemeNameToAdd)
        console.log('acabaaaaaaaab', filteredItem)
        setItemList(filteredItem);
    }
    useEffect(() => {
        setThemeNameToAdd(themeData[0].theme_name)
    }, [])
    useEffect(() => {
        if(itemList.length > 0) {
            setCurrentValueThemeToAdd(itemList[0].theme_posttitle)
        }
    }, [itemList, setCurrentValueThemeToAdd])
    
    useEffect(() => {
        filterItem()
    }, [ThemeNameToAdd])
    
    return (
    <div className='onclickopen-container'>
                        <div className='addtheme-container'>
                            <form onSubmit={addThemeInPostFunction}>
                            <div className='addsubforum-close'>
                                <AiOutlineCloseCircle onClick={closeAddPostInTheme}/>
                            </div>
                            <div className='addtheme-input-container'>
                                <div className='addpost-input-container-name'>
                                    <span>List of themes for this category</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                        <select onClick={(e) => setThemeNameToAdd(e.target.value)}>
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
                                    <span>List of posts for selected theme</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                        <select onClick={(e) => setCurrentValueThemeToAdd(e.target.value)} >
                                        {
                                            itemList?.map((item) => {
                                                const { theme_posttitle, theme_postid } = item
                                                console.log('item', item)
                                                return (
                                                    <option  key={theme_postid}>{theme_posttitle}</option>

                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            
                            {/* <div className='addtheme-input-container'>
                                <div className='addpost-input-container-name'>
                                    <span>Name of post</span>
                                </div>
                                <div className='addtheme-input-container-input'>
                                    <input type='text' value={addPostName} onChange={handleInputAddThemePerPost}/>
                                </div>
                            </div> */}

                            <div className='text-between'>
                                Text for the post
                            </div>

                            <div className='addtheme-editor-container'>
                            <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />
                            {/* <textarea style={{display:'none'}} disabled  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
                            </div>
                            <div className='addsubforum-button'>
                                <button>Add this to theme post</button>
                            </div>


                            </form>
                        </div>
                    </div>
  )
}
