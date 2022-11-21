import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useUpdateReplyThemeContentMutation } from '../../../redux/categoryApi';
import ReactQuillEditor from '../../ReactQuillEditor';

export default function EditThemeReply({ editThemeReplyid, editThemeReplyContent, closeThemeFunction }) {

    const [valueForQuill, setValueForQuill] = useState('');
    
    useEffect(() => {
        setValueForQuill(editThemeReplyContent)
    }, [editThemeReplyContent])

    const [UpdateReplyThemeContent, { isLoading: isLoadingUpdating }] = useUpdateReplyThemeContentMutation();

    const updateReplyFunction = async(e) => {
        e.preventDefault();
        try {
            await UpdateReplyThemeContent({valueForQuill,editThemeReplyid })
            closeThemeFunction();
        } catch (error) {

        }
    }

    return (
    <div className='onclickopen-container'>
                <div className='onedit-container'>
                <form onSubmit={updateReplyFunction}>

                    <div className='onedit-close'>
                        <AiOutlineCloseCircle onClick={closeThemeFunction}  />
                    </div>
                    <div className='onedit-texteditor'>
                        <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />
                        
                    </div>
                    <div className='onedit-button'>
                        <button>{isLoadingUpdating ? 'Updating' : 'Update post'}</button>
                    </div>
                    </form>

                </div>
            </div>
  )
}
