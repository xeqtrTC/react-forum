import React from 'react'
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';
import { GrEdit } from 'react-icons/gr'

import './UsersList.css';
import { useUsersListQuery } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';
export default function UsersList() {

    const { data, isSuccess, isLoading, error } = useUsersListQuery();
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
        const { uid, username, date, email, image, ipaddress, isVerificated, isbanned, postnumber } = item;
        
        const IsVerif = isVerificated === 1 ? 'Yes' : 'No'
        const banned = isbanned === 1 ? 'Yes' : 'No'
        return {
            id: uid,
            UserName: username,
            UserEmail: email,
            UserImage: image,
            IpAddress: ipaddress,
            Verificated: IsVerif,
            isBanned: banned,
            userDate: date

        }
    })

    const columnsUsers = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'UserName', headerName: 'Name of user', width: 200},
        { field: 'UserEmail', headerName: 'Email of user', width: 230},
        { field: 'UserImage', headerName: 'Image of user', width: 150, 
            renderCell: (params) => {
                return (
                    <>
                        <img className='datagrid-image' src={params.row.UserImage ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${params.row.UserImage}` : 'Test'} />
                    </>
                )
            }
        },
        { field: 'IpAddress', headerName: 'IpAddress', width: 200},
        { field: 'Verificated', headerName: 'Verificated', width: 150},
        { field: 'isBanned', headerName: 'Banned', width: 150},


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
