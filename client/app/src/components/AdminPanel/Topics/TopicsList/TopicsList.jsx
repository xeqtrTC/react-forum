import React from 'react'
import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';
import { CgMoveRight } from 'react-icons/cg'
import { AiFillDelete } from 'react-icons/ai';

import { usePostListQuery } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';
import { useDeletePostByAdminMutation } from '../../../../redux/categoryApi';
export default function TopicsList() {
    const { data, isSuccess, isLoading, error } = usePostListQuery();
    console.log(data);

    const [DeletePostByAdmin] = useDeletePostByAdminMutation()
    const filterItems = (e) => {
        const filteredProducts = data?.filter((item) => {
            // return item.reply_post.toLowerCase().includes(keyword.toLowerCase());
        })
        // setItems(filteredProducts);
    }
    const deletePostFunction = async(id, PostTitle, PostCategory) => {
        try {   
            await DeletePostByAdmin({id, PostTitle, PostCategory}).unwrap();
        } catch (error) {
            console.log(error);
        }
    }
    const filteredData = data?.filter((item) => item.isVerificated === 0);
console.log(filteredData);

    const userRow = data?.map((item) => {
        const { category, isLocked, postdate, postid, posttitle, postusername} = item;
        
        const locked = isLocked === 1 ? 'Yes' : 'No'
        return {
            id: postid,
            PostTitle: posttitle,
            PostCategory: category,
            PostUsername: postusername,
            IsLocked: locked,
            PostDate: postdate

        }
    })



    const columnsUsers = [
    
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'PostTitle', headerName: 'Title of topic', width: 200},
        { field: 'PostCategory', headerName: 'Category of topic', width: 230},
        { field: 'PostUsername', headerName: 'User who posted topic', width: 200},
        { field: 'IsLocked', headerName: 'Is topic locked', width: 200},
        { field: 'PostDate', type:'dateTime', headerName: 'Date', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
            renderCell: (params) => (
                console.log(params),
            <>
                <AiFillDelete onClick={() => deletePostFunction(params.id, params.row.PostTitle, params.row.PostCategory)} className='editButtonGrid'/> 
                <Link to={`/forum/${params.row.PostCategory}/${params.row.PostTitle}`}><CgMoveRight /> </Link>
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
            <div className='admin-userslist-container'>
                <div className='admin-userlist-grid'>
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
