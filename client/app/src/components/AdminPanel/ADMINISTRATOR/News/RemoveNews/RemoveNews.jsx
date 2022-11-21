import React from 'react';
import LeftSide from '../../../LeftSide/LeftSide';
import Navbar from '../../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';
import { RiDeleteBin2Line } from 'react-icons/ri'

import LoadingBox from '../../../../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';
import { useDeleteNewsMutation, useNewsListQuery } from '../../../../../redux/usersApi/usersApi';

import './RemoveNews.css';
export default function RemoveNews() {

    const { data, isSuccess, isLoading, error } = useNewsListQuery();
    const [deleteNews] = useDeleteNewsMutation();
  

    const userRow = data?.map((item) => {
        const { n_id, n_title, n_shortdesc, n_username, n_description, n_date } = item;
        
        
        return {
            id: n_id,
            n_title: n_title,
            n_shortdesc: n_shortdesc,
            n_username: n_username,
            n_description: n_description,
            n_date: n_date,

        }
    })

    const deleteNewsFunction = async(n_id) => {
        try {
            await deleteNews({n_id}).unwrap();
        } catch (error) {
            console.log(error);
        }
    }

    const columnsPosts = [
    
        { field: 'id', headerName: 'OW_ID', width: 90},
        { field: 'n_title', headerName: 'News title', width: 200},
        { field: 'n_shortdesc', headerName: 'Short description', width: 230},
        { field: 'n_username', headerName: 'Who posted news', width: 230},
        { field: 'n_date', type:'dateTime', headerName: 'News date', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
                console.log(params),
            <>
                <RiDeleteBin2Line  className='deleteNewsIcon' onClick={() => deleteNewsFunction(params.id)} />
                {/* <MdDeleteForever  className='deleteButtonGrid' onClick={() => removeThemePost(params.row.themeName)}/> */}
            </>
        
            )
        }
      ]

      let content;

      if(isLoading) content = <LoadingBox />

      if(isSuccess) {
            content = (
                <div className='admin-wrapper' style={{display: 'flex'}}>
        <LeftSide />

        <div className='admin-navbar-wrapper' style={{width: '100%'}}>
            <Navbar />
            <div className='admin-userslist-container' style={{padding: '1rem',  backgroundColor: '#F9FAFC'  , height: '100vh'}}>
                <div className='admin-userlist-grid' style={{height: '40rem', backgroundColor: '#fff'}}>
            <DataGrid
                rows={userRow}
                columns={columnsPosts}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
               
                  components={{ Toolbar: GridToolbarQuickFilter  }}

                initialState={{
                pagination: {
                pageSize: 20,
                },
                }}                  
            />
            </div>
            </div>
        </div>
    </div>
            )
      }

  return content;
}
