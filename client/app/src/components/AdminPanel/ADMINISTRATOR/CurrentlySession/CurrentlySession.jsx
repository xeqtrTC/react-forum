import React from 'react'
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';


import { useUsersListQuery, useGetBannedUsersListQuery, useWhoCurrentlyGotSessionQuery } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';
export default function CurrentlySession() {

    const { data, isSuccess, isLoading, error } = useWhoCurrentlyGotSessionQuery();
    console.log(data);

   

    const userRow = data?.map((item) => {
        const { s_id, s_sessionID, s_username, s_date } = item;
        
        
        return {
            id: s_id,
            sessionID: s_sessionID,
            usernameOfUser: s_username,
            dateOfLogin: s_date
        }
    })

    const columnsUsers = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'sessionID', headerName: 'SessionID', width: 200},
        { field: 'usernameOfUser', headerName: 'Username of user', width: 230},
        { field: 'dateOfLogin', type:'Date', headerName: 'Date of login', width: 250, valueGetter: ({ value }) => value && new Date(value)},
        
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
                columns={columnsUsers}
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
