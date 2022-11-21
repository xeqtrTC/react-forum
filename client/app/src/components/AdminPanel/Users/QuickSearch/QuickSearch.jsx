import React, { useEffect, useState } from 'react'
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';


import { useUsersListQuery } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';

import './QuickSearch.css';
export default function QuickSearch() {

    const { data, isSuccess, isLoading, error } = useUsersListQuery();
    const [value, setValue] = useState('');
    const [items, setItems] = useState({})
    console.log(items);
    const filteredData = data?.filter((item) => item.isVerificated === 0);
    const filterItems = (e) => {
        const filteredProducts = data?.filter((item) => {
            return item.username.toLowerCase().includes(value.toLowerCase());
        })
        setItems(filteredProducts);
        
    }
    useEffect(() => {
        filterItems()
    },  [value])


           
   

    const columnsUsers = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'UserName', headerName: 'Name of user', width: 200},
        { field: 'UserEmail', headerName: 'Email of user', width: 230},
        
        { field: 'IpAddress', headerName: 'IpAddress', width: 200},
        { field: 'Verificated', headerName: 'Verificated', width: 150},
        { field: 'isBanned', headerName: 'Banned', width: 150},


        { field: 'userDate', type:'dateTime', headerName: 'Date of register', width: 200, valueGetter: ({ value }) => value && new Date(value)},
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
                <div className='admin-wrapper'>
        <LeftSide />

        <div className='admin-navbar-wrapper'>
            <Navbar />
            <div className='admin-quicksearch-container'>
                <div className='admin-quicksearch'>
                    
                   <div className='admin-quicksearch-input'>
                    <input type='text' value={value} placeholder='Enter a word' onChange={(e) => setValue(e.target.value)}/>
                   </div>
                    <div className='admin-quicksearch-list'>
                        
                        <div className='admin-quciksearch-list-user'>
                            <p>asd</p>
                            <p>asd</p>

                            <p>asd</p>


                        </div>
                        {
                            value?.length > 0 ? (
                                items?.map((item) => {
                                    const { uid, username, date, email, image, ipaddress, isVerificated, isbanned, postnumber } = item;

                                    return (
                                        <div className='admin-quciksearch-list-user'>
                                            <p>{username}</p>
                                            <p>{email}</p>

                                            <p>{ipaddress}</p>
                                            <p>{postnumber}</p>
                                            <p>{isbanned}</p>
                                            <p>{isVerificated}</p>

                                        </div>
                                    )
                                })
                            ) : ''
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
            )
      }

  return content;
}
