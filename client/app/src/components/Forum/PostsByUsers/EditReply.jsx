import React, { useState, useEffect } from 'react'
import ReactQuillEditor from '../../ReactQuillEditor';
import { AiOutlineCloseCircle } from 'react-icons/ai'

import './PostByUser.css';
import { useUpdateReplyContentMutation } from '../../../redux/categoryApi';

export default function EditReply({ reply_contentForEdit, editReplyClose, reply_id }) {
    console.log('acab', reply_contentForEdit)
    useEffect(() => {
        setValueForQuill(reply_contentForEdit);
    }, [reply_contentForEdit])
    const [valueForQuill, setValueForQuill] = useState('');



    const [UpdateReplyContent, { isLoading: isLoadingUpdating}] = useUpdateReplyContentMutation();

    const updateReplyFunction = async(e) => {
        e.preventDefault();
        const desc = valueForQuill;
        const replyid = reply_id;
       
        try {
            await UpdateReplyContent({desc, replyid})
            // alert('updejt')
            editReplyClose();
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     setValueForQuill(reply_contentForEdit)
    // }, [reply_contentForEdit])

  return (
    <div className='onclickopen-container'>
        <form onSubmit={updateReplyFunction}>
                <div className='onedit-container'>
                    <div className='onedit-close'>
                        <AiOutlineCloseCircle onClick={editReplyClose} />
                    </div>
                    <div className='onedit-texteditor'>
                        <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />
                        
                    </div>
                    <div className='onedit-button'>
                        <button>{isLoadingUpdating ? 'Updating' : 'Update post'}</button>
                    </div>
                </div>
            </form>
            </div>
  )
}
