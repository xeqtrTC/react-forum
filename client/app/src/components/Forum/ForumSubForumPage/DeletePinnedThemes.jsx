import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GrEdit } from 'react-icons/gr'
import { MdDeleteForever } from 'react-icons/md'
import './ForumSubForumPage.css'
export default function DeletePinnedThemes({ pinnedThemeData, deleteTheme, closeDeleteTheme }) {


    
      const rowsSub = pinnedThemeData?.map((item) => {
        const { pinned_id, pinned_date, pinned_title, pinned_username } = item;
        return {
            id: pinned_id,
            pinTitle: pinned_title,
            pinUsername: pinned_username,
            pinDate: pinned_date
        }
    })


    const columnsTheme = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'pinTitle', headerName: 'Title of pinned theme', width: 200},
        { field: 'pinUsername', headerName: 'User who posted theme', width: 200},
        { field: 'pinDate', type:'dateTime', headerName: 'Date', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
                console.log(params),
            <>
                <GrEdit  className='editButtonGrid'/>
                <MdDeleteForever  className='deleteButtonGrid' onClick={() => deleteTheme(params.row.pinTitle)}/>
            </>
        
            )
        }
      ]

  return (
    <div className='onclickopen-container'>
                        <div className='deletetheme-container'>
                        {/* <form onSubmit={addPinnedThemesPerSubCategoryFunction} > */}

                            <div className='addsubforum-close'>
                                <AiOutlineCloseCircle onClick={closeDeleteTheme} />
                            </div>

                            {/* {
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
                                } */}

                            <div className='addtheme-input-container'>
                                    <span style={{padding: '1rem 0'}}>List of pinned message for this subforum</span>
                                <div className='addtheme-input-container-input'>
                                    {/* <input type='text' value={namePinned} onChange={updateValue}/> */}
                                </div>
                            </div>

                           

                            <div className='deletetheme-editor-container'>
                             <DataGrid
                                rows={rowsSub}
                                columns={columnsTheme}
                                initialState={{
                                    pagination: {
                                    pageSize: 10,
                                    },
                                }}
                                
                                disableSelectionOnClick
                            />
                            {/* <ReactQuillEditor valueForQuill={valueForQuill} setValueForQuill={setValueForQuill}/> */}
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
                            {/* <div className='addsubforum-button'>
                                <button>Add this to subforuma</button>
                            </div> */}


                            {/* </form> */}

                        </div>
                    </div>
    // <DataGrid
    // rows={rowsTheme}
    // columns={columnsTheme}
    // initialState={{
    //     pagination: {
    //     pageSize: 10,
    //     },
    // }}
    
    // disableSelectionOnClick
    // />
  )
}
