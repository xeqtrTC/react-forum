import React from 'react';
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';
import { GrEdit } from 'react-icons/gr'

import { useUsersListQuery, useGetOverWatchPostsQuery, useGetOverWatchUsersQuery } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';

export default function OverWatchUsers() {
    const { data, isSuccess, isLoading, error } = useGetOverWatchUsersQuery();
    console.log(data);

    const filterItems = (e) => {
        const filteredProducts = data?.filter((item) => {
            // return item.reply_post.toLowerCase().includes(keyword.toLowerCase());
        })
        // setItems(filteredProducts);
    }
    const filteredData = data?.filter((item) => item.isVerificated === 0);
console.log(filteredData);

    const userRow = data?.map((item) => {
        const { ow_id, ow_username, ow_updatedusername, ow_sectionupdated , ow_date } = item;
        
        
        return {
            id: ow_id,
            ow_whoupdated: ow_username,
            ow_whatupdated: ow_updatedusername,
            ow_section: ow_sectionupdated,
            ow_date: ow_date,

        }
    })

    const columnsPosts = [
    
        { field: 'id', headerName: 'OW_ID', width: 90},
        { field: 'ow_whoupdated', headerName: 'OW_WHOUPDATED', width: 200},
        { field: 'ow_whatupdated', headerName: 'OW_WHATUPDATED', width: 230},
        { field: 'ow_section', headerName: 'OW_DESCRIPTION', width: 500},
        { field: 'ow_date', type:'dateTime', headerName: 'OW_DATE', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        
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
