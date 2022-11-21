import React from 'react';

import { DataGrid } from '@mui/x-data-grid';


import './ForumPage.css';

import { AiOutlineCloseCircle } from 'react-icons/ai';


export default function RemoveThemeOrSubForum({ props }) {

    const { openThemeGrid, rowsSub, columns, rowsTheme, columnsTheme,setOpenThemeGrid, addPostPerThemePost, closeRemoveTorS, success, errorMessage, setOpenSubGrid, openSubGrid } = props;
    
  

  
    return (
    <div className='onclickopen-container'>
                        <div className='addtheme-container'>
                            <form onSubmit={addPostPerThemePost}>
                            <div className='addsubforum-close'>
                                <AiOutlineCloseCircle onClick={closeRemoveTorS}/>
                            </div>
                           
                                <div className='removeThemeorSub-container'>

                                    <div className='removeThemeorSub-warnings'>
                                        <p>REMINDER: IF YOU REMOVE ONE SUBFORUM OR THEME IT WILL REMOVE ANY POST THAT BELONGS TO THAT SUBFORUM OR THEME</p>
                                        <p>If it's necessary to keep any post from deleted subforum/theme contact developer.</p>
                                    </div>
                                
                                {
                                    success && (
                                        <div className='success-delete'>
                                    <span>{success}</span>
                                </div>
                                    )
                                }
                                {
                                    errorMessage && <div className='error'>
                                    <span>{errorMessage}</span>
                                </div>
                                }
                                <div className='removeThemeOrSub-buttons'>
                                <div className='removeThemeOrSub-button-holder'>


                                        <button onClick={() => setOpenSubGrid(!openSubGrid)}>{openSubGrid ? <span>Close list of subforums</span> : <span>Open list of subforums</span>}</button>
                                </div>
                                <div className='removeThemeOrSub-gridlist-holder'>
                                {
                                    openSubGrid && (
                                        <div className='remove-grid'>

                                <DataGrid
                                            rows={rowsSub}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                pageSize: 10,
                                                },
                                        }}
                                    
                                    disableSelectionOnClick
                                    />
                                    </div>

                                    )
                                }
                                </div>
                                <div className='removeThemeOrSub-button-holder'>

                                <button onClick={() => setOpenThemeGrid(!openThemeGrid)}>{openThemeGrid ? <span>Close list of themes</span> : <span>Open list of themes</span>}</button>
                                </div>
                                <div className='removeThemeOrSub-gridlist-holder'>

                            {
                                openThemeGrid && (
                                    <div className='remove-grid'>

                                        <DataGrid
                                                rows={rowsTheme}
                                                columns={columnsTheme}
                                                initialState={{
                                                    pagination: {
                                                    pageSize: 10,
                                                    },
                                                }}
                                                
                                                disableSelectionOnClick
                                                />
                                    </div>
                                )
                            }
                            </div>
                        </div>
                            
                            
                            </div>

                           
                            
                            {/* <div className='addsubforum-button'>
                                <button>Add this to subforum</button>
                            </div> */}


                            </form>
                        </div>
                    </div>
  )
}
