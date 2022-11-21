import React from 'react'
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';


import { useUsersListQuery, useGetBannedUsersListQuery } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';
export default function BannedUsers() {

    const { data, isSuccess, isLoading, error } = useGetBannedUsersListQuery();
    console.log(data);

   

    const userRow = data?.map((item) => {
        const { b_id, b_whobanned, b_whoisbanned, b_bandate, b_reason, b_date} = item;
        
        
        return {
            id: b_id,
            WhoBanned: b_whobanned,
            WhoIsBanned: b_whoisbanned,
            BanDate: b_bandate,
            BanReason: b_reason,
            DateofBan: b_date,

        }
    })

    const columnsUsers = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'WhoBanned', headerName: 'Who banned', width: 200},
        { field: 'WhoIsBanned', headerName: 'Banned user', width: 230},
        { field: 'BanReason', headerName: 'Reason of ban', width: 200},
        { field: 'BanDate', headerName: 'Banned till', width: 150},


        { field: 'DateofBan', type:'Date', headerName: 'Date of register', width: 250, valueGetter: ({ value }) => value && new Date(value)},
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
            <>
                {/* <GrEdit  className='editButtonGrid'/>
                <MdDeleteForever  className='deleteButtonGrid' onClick={() => removeThemePost(params.row.themeName)}/> */}
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
