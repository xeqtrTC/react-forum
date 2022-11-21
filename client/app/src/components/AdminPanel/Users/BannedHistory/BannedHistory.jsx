import React from 'react'
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';

import { useGetBannedHistoryListQuery } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';
export default function BannedHistory() {

    const { data, isSuccess, isLoading, error } = useGetBannedHistoryListQuery();
    console.log(data);

   

    const userRow = data?.map((item) => {
        const { bh_id, bh_whoisbanned, bh_whobanned, bh_whounbanned, bh_reasonbanned, bh_banduration, bh_dateofban, bh_dateofunban, bh_dateofstoring} = item;
        
        
        return {
            id: bh_id,
            WhoIsBanned: bh_whoisbanned,
            WhoBanned: bh_whobanned,
            WhoUnbanned: bh_whounbanned,
            BanReason: bh_reasonbanned,
            BanDuration: bh_banduration,
            DateOfBan: bh_dateofban,
            DateOfUnban: bh_dateofunban,
            DateOfStoring: bh_dateofstoring

        }
    })

    const columnsUsers = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'WhoIsBanned', headerName: 'Who is banned', width: 200},
        { field: 'WhoBanned', headerName: 'Who banned', width: 230},
        { field: 'WhoUnbanned', headerName: 'Who unbanned', width: 200},
        { field: 'BanReason', headerName: 'Reason of ban', width: 150},
        { field: 'BanDuration', headerName: 'Duration of ban', width: 150},
        { field: 'DateOfBan', headerName: 'Ban date', width: 150},
        { field: 'DateOfUnban', headerName: 'Unban date', width: 150},
        { field: 'DateOfStoring', type:'Date', headerName: 'Date of register', width: 250, valueGetter: ({ value }) => value && new Date(value)},
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
