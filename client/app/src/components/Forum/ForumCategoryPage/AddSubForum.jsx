import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function AddSubForum({props}) {
    const { addSubForumFunctionPost, errorAddSub, closeAddSubForumFunction, user, setTitleValueFunction, setSubDescValueFunction } = props;
  return (
    <div className='onclickopen-container'>
                        <div className='addsubforum-popup-container'>
                        <form onSubmit={addSubForumFunctionPost}>

                        <div className='addsubforum-close'>
                                    <AiOutlineCloseCircle onClick={closeAddSubForumFunction} />
                                </div>
                                {
                                    errorAddSub && (
                                        <div className='addsubforum-error-messsage'>{errorAddSub}</div>
                                    )
                                }
                            <div className='addsubforum-popup'>
                                
                                <div className='addsubforum-input-container'>
                                    <div className='addsubforum-input'>
                                        <div className='addsubforum-input-info'>
                                            <span className='input-info-span'>Title of subforum</span>
                                        </div>
                                    <div className='addsubforum-input-holder'>
                                        <input type='text' placeholder='Title' ref={user} onChange={setTitleValueFunction}/>

                                    </div>
                                    </div>
                                    <div className='addsubforum-input'>
                                        <div className='addsubforum-input-info'>
                                            <span className='input-info-span'>Description for subforum</span>
                                        </div>
                                    <div className='addsubforum-input-holder'>
                                        <input type='text' placeholder='Description' onChange={setSubDescValueFunction}/>

                                    </div>
                                    
                                    
                                </div>
                                
                                </div>
                                
                            </div>
                            <div className='addsubforum-button'>
                                        <button>Add this to subforum</button>
                                    </div>
                                    </form>       

                        </div>   
                    </div>
  )
}
