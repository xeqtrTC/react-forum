import React from 'react'
import AdminWrapper from '../AdminWrapper'
import LeftSide from '../LeftSide/LeftSide'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { MdTopic, MdCategory } from 'react-icons/md'
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';




import './DashBoard.css'
import { useGetcountAdminDashboardQuery } from '../../../redux/usersApi/usersApi'
import LoadingBox from '../../LoadingBox/LoadingBox'
export default function DashBoard() {

  const { data, isSuccess, isError, isLoading,error } = useGetcountAdminDashboardQuery();

  console.log(data);








 

  let content;

  if(isLoading) {
    content = <LoadingBox />
  }

  if(isSuccess) {

    const { mapTopics } = data
    
    const topicsRow =  mapTopics?.map((item) => {
        const { postusername, category, postdate, posttitle, postid } = item;
        

        return {
            id: postid,
            PostUsername: postusername,
            Category: category,
            Title: posttitle,
            PostDate: postdate,
           
    
        }
    })
    
    
      const columnsUsers = [
        
        { field: 'id', headerName: 'ID', width: 90},
        { field: 'PostUsername', headerName: 'User who posted', width: 200},
        { field: 'Category', headerName: 'Category', width: 230},
        { field: 'Title', headerName: 'Title of topic', width: 200},
    
    
        { field: 'PostDate', type:'dateTime', headerName: 'Date of register', width: 200, valueGetter: ({ value }) => value && new Date(value)},
      ]
    

    const { countUsers, countTopics, countCategories } = data.countRows[0];

    const { mapUsers } = data


    content = (
      <div className='admin-wrapper'>
    <LeftSide />

    <div className='admin-navbar-wrapper'>
        <Navbar />
        <div className='dashboard-container'>
          <div className='dashboard-first-container-boxes'>
            <div className='dashboard-first-boxes-background'>
              <div className='dashboard-first-boxes-background-container'>
                <div className='dashboard-first-boxes-background-container-second'>
                  <div className='dashboard-first-boxes-span'>
                    Total users
                  </div>
                  <div className='dashboard-first-boxes-total'>
                    {countUsers}
                  </div>

                </div>
                <div className='dashboard-first-boxes-background-container-second-image red-admin-box'>
                  <FaUserAlt/>

                </div>
              </div>
            </div>
            <div className='dashboard-first-boxes-background'>
              <div className='dashboard-first-boxes-background-container'>
                <div className='dashboard-first-boxes-background-container-second'>
                  <div className='dashboard-first-boxes-span'>
                    Total topics
                  </div>
                  <div className='dashboard-first-boxes-total'>
                    {countTopics}
                  </div>

                </div>
                <div className='dashboard-first-boxes-background-container-second-image green-admin-box'>
                  <MdTopic className='green-admin-box' />

                </div>
              </div>
            </div>
            
            <div className='dashboard-first-boxes-background'>
              <div className='dashboard-first-boxes-background-container'>
                <div className='dashboard-first-boxes-background-container-second '>
                  <div className='dashboard-first-boxes-span'>
                    Total categories
                  </div>
                  <div className='dashboard-first-boxes-total'>
                    {countCategories}
                  </div>

                </div>
                <div className='dashboard-first-boxes-background-container-second-image blue-admin-box'>
                  <MdCategory />

                </div>
              </div>
            </div>
            
            <div className='dashboard-first-boxes-background'>
              <div className='dashboard-first-boxes-background-container'>
                <div className='dashboard-first-boxes-background-container-second'>
                  <div className='dashboard-first-boxes-span'>
                    Total topics
                  </div>
                  <div className='dashboard-first-boxes-total'>
                    500
                  </div>

                </div>
                <div className='dashboard-first-boxes-background-container-second-image green-admin-box'>
                  <MdTopic className='green-admin-box' />

                </div>
              </div>
            </div>
            
          </div>
          <div className='dashboard-datagrid-container'>
            <div className='dashboard-datagrid-users-container'>
            <div className='dashboard-datagrid-padding-lastest'>
                Lastest users
              </div>
              {
                mapUsers?.map((item) => {
                  const { username, image, email } = item;

                  return (
                    <div className='dashboard-datagrid-users-first-container' key={username}>
                      <div className='dashboard-datagrid-users-first'>
                          <img src={'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png'} alt='photo' />
                      </div>
                      <div className='dashboard-datagrid-users-second'>
                        <p className='dashboard-datagrid-users-name'>{username}</p>
                        <p className='dashboard-datagrid-users-email'>{email}</p>
                      </div>
                    </div>
                  )
                })
              }
              
              

              

            </div>
            <div className='dashboard-datagrid-last-topics-container'>
              <div className='dashboard-datagrid-padding-lastest'>
                Lastest topics
              </div>
            <div className='test-admin-grid'>
            <DataGrid
                rows={topicsRow}
                columns={columnsUsers}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                      

                initialState={{
                pagination: {
                pageSize: 20,
                },
                }}                  
            />
            </div>
            
            </div>
          </div>
          TO DO MORE
          {/* <div className='dashboard-first-container'>
            <div className='dashborad-first-left-container'>
              <div className='dashboard-first-left-container-flex'>
              <div className='dashboard-first-box'>
                <div className='dashboard-first-box-container'>
                <FaUserAlt />
                <p className='dashboard-p-color'>Total users</p>
                  <p>test</p>
                  </div>
                
                </div>
              <div className='dashboard-first-box'>
                <div className='dashboard-first-box-container'>
                <MdTopic />
                <p className='dashboard-p-color'>Total topics</p>
                <p>test</p>
                </div>
              </div>
                <div className='dashboard-first-box'>
                  <div className='dashboard-first-box-container'>
                  <MdCategory />
                  <p className='dashboard-p-color'>Total categories</p>
                  <p>test</p>
                  </div>
                </div>
                </div>
                <div className='dashboard-first-left-container-flex-second'>
              <div className='dashboard-first-box'>
                <div className='dashboard-first-box-container'>
                <FaUserAlt />
                <p className='dashboard-p-color'>test</p>
                  <p>test</p>
                  </div>
                
                </div>
              <div className='dashboard-first-box'>
                <div className='dashboard-first-box-container'>
                <MdTopic />
                <p className='dashboard-p-color'>test</p>
                <p>test</p>
                </div>
              </div>
                <div className='dashboard-first-box'>
                  <div className='dashboard-first-box-container'>
                  <MdCategory />
                  <p className='dashboard-p-color'>test</p>
                  <p>test</p>
                  </div>
                </div>
                </div>
          </div>
            <div className='dashboard-first-right-container'>
                <div className='dashboard-first-right-container-p'>
                    <p>Recent topics</p>
                </div>
                <div className='dashboard-first-right-map'>
                  <div className='dashboard-first-right-map-postname'>
                    test
                  </div>
                  <div className='dashboard-first-right-map-category'>
                    meet the staff
                  </div>
                  <div className='dashboard-first-right-map-username'>
                    by xeqtr
                  </div>
                </div>
            </div>
            
          </div> */}
          {/* <div className='dashboard-second-container'>
            asd
          </div> */}
        </div>
        
    </div>
  </div>
    
    ) 
  }

  return content
}
