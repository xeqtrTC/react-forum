import React from 'react'
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';


import './ApprovesUserAdmin.css';
import { useGetlistOfAccountsToBeApprovedQuery } from '../../../../redux/usersApi/usersApi';
import { Link } from 'react-router-dom';
import { GrEdit } from 'react-icons/gr';
export default function ApprovesUserAdmin() {

    const { data, isSuccess, isError, error} = useGetlistOfAccountsToBeApprovedQuery();

    let content;

    const userRow = data?.map((item) => {
        const { uid, username, date, email,  ipaddress, isVerificated  } = item;

        const IsVerif = isVerificated === 1 ? 'Yes' : 'No'

        
        return {
            id: uid,
            UserName: username,
            UserEmail: email,
            IpAddress: ipaddress,
            Verificated: IsVerif,

            userDate: date

        }
    })

    const columnsUsers = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'UserName', headerName: 'Name of user', width: 200},
        { field: 'UserEmail', headerName: 'Email of user', width: 230},
        { field: 'IpAddress', headerName: 'IpAddress', width: 200},
        { field: 'Verificated', headerName: 'Verificated', width: 150},

        { field: 'userDate', type:'dateTime', headerName: 'Date of register', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
            <>
                <Link to={`/admin/userinfo/${params.id}`}><GrEdit  className='editButtonGrid'/></Link>
                {/* <MdDeleteForever  className='deleteButtonGrid' onClick={() => removeThemePost(params.row.themeName)}/> */}
            </>
        
            )
        }
      ]
    

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
