import React from 'react'
import { useGetPostsPerCategoryQuery } from '../../../redux/categoryApi';
import { selectPostById } from '../../../redux/categoryApi'
import { format, parseISO  } from 'date-fns'

import './ForumPage.css';

export default function RemovePosts({userId, category, openRemovePosts}) {




    const emptyArr = [];

    const { myPost } = useGetPostsPerCategoryQuery(category, { 
      selectFromResult: ({ data }) => ({ myPost: data && selectPostById(data, userId) }  ) ?? emptyArr
    })

    console.log('data', myPost)
    // const {id}
    const rowsData = {
            id: myPost.postid,
            whoAdded: myPost.postusername,
            nameOfPost: myPost.posttitle,
            date: myPost.postdate
    }

    // const transoformedRows =  Object.keys(myPost).map(index => {
    //     let person = myPost[index];
    //     return person;
    // });
    

    // console.log(testACab.map((item) => {
    //     return {
    //         item
    //     }
    // }))



    // console.log('ACAAAAAAAAAAB DATA', testACab?.reduce(function(acc, x) {
    //     for (var key in x) acc[key] = x[key];
    //     return acc;
    // }, {}));

    const columnsTheme = [
    
        // { field: 'id', headerName: 'ID', width: 90,
        // renderCell: (params) => {
        //     console.log('params',params)

        //     return <div className="rowitem">{params.row.id}</div>;
        //   },
        // },
        {
            field: 'id',
            headerName: 'ID',
            valueGetter: (params) => {
                return params.row.id;
              },
          },
    
        // { field: 'nameOfPost', headerName: 'Name of post', width: 200},
        // { field: 'date', type:'dateTime', headerName: 'Date', width: 200, valueGetter: ({ value }) => value && new Date(value)},
        // { field: 'Action', type:'actions', headerName: 'Action', width: 150, 
        //     renderCell: (params) => (
        //     <>
        //         <GrEdit  className='editButtonGrid'/>
        //         {/* <MdDeleteForever  className='deleteButtonGrid' onClick={() => removeThemePost(params.row.themeName)}/> */}
        //     </>
        
        //     )
        // }
      ]

      if(myPost) {
        

        return (
               
                
                            <tr>
                                <td>{myPost.postusername}</td>
                                <td>{myPost.posttitle}</td>
                                <td>{format(parseISO(myPost.postdate), "MMMM Qo, yyyy, H:m a")}</td>




                            </tr>

                      
           

                                               
        )
      } else {
        return null
      }
 
}
