import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { useLeaderOfHelperQueryQuery, useAddHelperQueryListUsersQuery } from '../../../redux/usersApi/usersApi';
import LoadingBox from '../../LoadingBox/LoadingBox';
import HelperLeftSide from '../LeftSide/HelperLeftSide'
import HelperNavBar from '../Navbar/HelperNavBar'

export default function HelperDashboard() {

    const { data, isLoading, isSuccess} = useLeaderOfHelperQueryQuery();
    console.log(data);

    const { data: datausers} = useAddHelperQueryListUsersQuery();
    console.log(datausers);
    let content;

    if(isLoading) {
        content = <LoadingBox />
    }


    if(isSuccess) {
    
        
        const helperCount = data?.countHelper.resultCount
        const topicsRow =  data?.filteredInfo.map((item) => {
            const { uid, username, Helper } = item;
            
    
            return {

                id: uid,
                HelperName: username,
                
               
        
            }
        })
        
        
          const columnsUsers = [
            
            // { field: 'id', headerName: 'ID', width: 90},
            { field: 'HelperName', headerName: 'Helper name', width: 200},
            // { field: 'Category', headerName: 'Category', width: 230},
            // { field: 'Title', headerName: 'Title of topic', width: 200},
        
        
            // { field: 'PostDate', type:'dateTime', headerName: 'Date of register', width: 200, valueGetter: ({ value }) => value && new Date(value)},
          ]
        

        content = (
            <div className='admin-wrapper'>
                <HelperLeftSide />
                <div className='admin-navbar-wrapper'>
                    <HelperNavBar />
                    <div className='dashboard-container'>
          <div className='dashboard-first-container-boxes'>
            <div className='dashboard-first-boxes-background'>
              <div className='dashboard-first-boxes-background-container'>
                <div className='dashboard-first-boxes-background-container-second'>
                  <div className='dashboard-first-boxes-span'>
                    Total helpers
                  </div>
                  <div className='dashboard-first-boxes-total'>
                    {helperCount}
                  </div>

                </div>
                <div className='dashboard-first-boxes-background-container-second-image red-admin-box'>
                  <FaUserAlt/>

                </div>
              </div>
            </div>
            
            
          </div>
          <div className='dashboard-datagrid-container'>
            {/* <div className='dashboard-datagrid-users-container'>
            <div className='dashboard-datagrid-padding-lastest'>
                Lastest users
              </div>
              {
                mapUsers?.map((item) => {
                  const { username, image, email } = item;

                  return (
                    <div className='dashboard-datagrid-users-first-container'>
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
              
              

              

            </div> */}
            <div className='dashboard-datagrid-last-topics-container'>
              <div className='dashboard-datagrid-padding-lastest'>
                List of helpers
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

  return content;
}
