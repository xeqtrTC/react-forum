import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useUnbanUserFunctionMutation, useBanUserFunctionMutation, useRemoveRoleForUserMutation, useUpdateRoleForUserMutation, useGetUserByIdQuery, useVerifyUserAccountByAdminMutation, useUpdateUserAccountByAdminMutation } from '../../../../redux/usersApi/usersApi';
import LoadingBox from '../../../LoadingBox/LoadingBox';
import { format, formatDistance, formatRelative, subDays, parseISO, compareAsc,addDays , getMonth, set    } from 'date-fns'

import LeftSide from '../../LeftSide/LeftSide';
import Navbar from '../../Navbar/Navbar';
import parse from 'html-react-parser';

import './AdminUserInfo.css';
import { useMemo } from 'react';
export default function AdminUserInfo() {
    const { id } = useParams();

    const { data, isError, isSuccess, error, isLoading} = useGetUserByIdQuery(id);

    const [verifyUserAccountByAdmin] = useVerifyUserAccountByAdminMutation();
    const [UpdateUserAccountByAdmin, {isLoading: isLoadingUpdateAccount}] = useUpdateUserAccountByAdminMutation();
    const [UpdateRoleForUser, { isLoading: isLoadingUpdateRoles }] = useUpdateRoleForUserMutation();
    const [RemoveRoleForUser, { isLoading: isLoadingDeleteRoles }] = useRemoveRoleForUserMutation()
    const [BanUserFunction, { isLoading: isLoadingBanUser}] = useBanUserFunctionMutation();
    const [UnbanUserFunction, { isLoading: isLoadingUnbanUser}] = useUnbanUserFunctionMutation();

    const [browserHistory, setBrowserHistory] = useState(false);
    const [ipaddressHistory, setIpaddressHistory] = useState(false);
    const [updateUserRoles, setUpdateUserRooles] = useState(false);
    const [deleteUserRoles, setDeleteUserRoles] = useState(false);
    const [succesVerify, setSuccesVerify] = useState(null);
    const [errorRole, setErrorRole] = useState(null);
    const [successRole, setSuccessRole] = useState(null);
    const [successUnban, setSuccessUnban] = useState(null);
    const [successDeleteRole, setDeleteRole] = useState(null);
    const [successBanningUser, setBanningUser] = useState(null);

    const [deleteRoleFailure, setDeleteRoleFailure] = useState(null);
    const [banPanel, setBanPanel] = useState(false);

    const [currentValueForRoles, setCurrentValueForRoles] = useState([]);
    const [currentRoleForDelete, setCurrentRoleForDelete] = useState([]);

    const [dateToBe, setDateToBe] = useState('');
    const [fullDateNumber, setfullDateNumber] = useState([]);
    const [banReason, setBanReason] = useState('');


    const memoizedData = useMemo(() =>  data, [data])

    const [value, setValue] = useState({
        username: '',
        email: '',
        password: '',
        image: '',
        isbanned: '',
        location: '',
        steamtag: '',
        verificated: '',
        isVerificatedByAdmin: '',


    })


    const verifyAccountFunction = async(e) => {
        e.preventDefault();

        const username = value.username;
        const email = value.email;

        try  {
            const { data } = await verifyUserAccountByAdmin({id, username, email}).unwrap();
            console.log(data);
            setSuccesVerify(`You verificated ${username} account, email has been sent!`)
        } catch (err) {
            console.log(err);
        }
    }

    const updateUserAccount = async(e) => {
        e.preventDefault();


        const username = value.username
        const location = value.location;
        const steamtag = value.steamtag;
        const password = value.password;

        console.log('password', password);


        try {
            await UpdateUserAccountByAdmin({location, steamtag, password, id }).unwrap();
            setSuccesVerify(`You have updated ${username} account`)
        } catch (error) {
            console.log(error);
        }
    }

    const updateRoleFunction = async(e) => {
        e.preventDefault();

        const username = value.username

        try {
            await UpdateRoleForUser({currentValueForRoles, username}).unwrap();

            setSuccessRole(`You have added ${currentValueForRoles} role for ${username}`)

        } catch (error) {
            const { data } = error;

            setErrorRole(data.message);

            console.log(error);
        }

    }

    const removeRoleFunction = async(e) => {
        e.preventDefault();

        const username = value.username


        try {
            await RemoveRoleForUser({currentRoleForDelete, username}).unwrap()

            setDeleteRole(`You have deleted ${currentRoleForDelete} for ${username}`)

        } catch (error) {
            const { data } = error;
            console.log(error);
            setDeleteRoleFailure(data?.message);
            
        }
    }

    const banUserFunction = async(e) => {
        e.preventDefault();

        // const result = add(new Date(), {
        //     days: dateToBe,
            
        //   })
          const username = value?.username

        if(dateToBe && banReason) {
            try {
                const { data } = await BanUserFunction({ fullDateNumber, username, banReason}).unwrap();
                    console.log('msg from backend', data);
                setBanningUser(`You have just banned ${username}`)
                setfullDateNumber('');
                setDateToBe('');
                setBanReason('');
            } catch (error) {
                console.log(error);
            }
        }

    }

    const unbanUserFunctionClient = async(e) => {
        e.preventDefault();

        const username = value?.username

        try {
            await UnbanUserFunction({username}).unwrap();
            setSuccessUnban(`You have just unbanned ${username}`)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(value.email, value.username);

    const handleChange = (e) => {
        const type = e.target.type

        const name = e.target.name

        setValue(prevData => ({
            ...prevData,
            [name]: e.target.value
        }))
    }

    const handleChangeDate = (e) => {
        setDateToBe(e.target.value)
    }
    const handleBanReasonData = (e) => {
        setBanReason(e.target.value)
    }
    console.log(error);

    useEffect(() => {
       if(banPanel) {
            if(dateToBe === '1337') {
                setfullDateNumber('Permanently')
        } else if (dateToBe?.length > 0) {

            const testacab = addDays(new Date(), dateToBe)

            setfullDateNumber(format(testacab, 'MM/dd/yyyy'));
            
        }
        if(dateToBe?.length === 0) {
            setfullDateNumber('');
        }
       }
    }, [banPanel, dateToBe])

    useEffect(() => {
        if(data) {
            setValue({
                username: data.userInfoList.username,
                email: data.userInfoList.email,
                password: data.userInfoList.password,
                isbanned: data.userInfoList.isbanned === 1 ? 'Da' : 'Ne',
                location: data.userInfoList.location,
                steamtag: data.userInfoList.steamtag,
                verificated: data.userInfoList.isVerificated === 1 ? 'Da' : 'Ne', 
                isVerificatedByAdmin: data.userInfoList.isVerificatedByAdmin === 1 ? 'Da' : 'Ne'
            })
        }
        
    }, [data])

    console.log(data)

    useEffect(() => {
            if(banPanel && value?.isbanned === 'Da') {
                const timer = setTimeout(() => {
                    setBanPanel(false);

                }, 5000)
                return () => clearTimeout(timer);
            }
    }, [value])

   useEffect(() => {
    if(successUnban)  {
        const timer = setTimeout(() => {
            setSuccessUnban('')
        }, 4000)
        return () => clearTimeout(timer)
    }
    
   }, [successUnban])

    useEffect(() => {
        if(succesVerify) {
            const timer = setTimeout(() => {
                setSuccesVerify('')
            }, 4000)
            return () => clearTimeout(timer)
        }
        
    },[succesVerify])

    useEffect(() => {
        if(errorRole) {
            const timer = setTimeout(() => {
                setErrorRole('')
            }, 4000)
    
            return () => clearTimeout(timer);  
        }
        
    }, [errorRole])

    useEffect(() => {
        if(successRole) {
            const timer = setTimeout(() => {
                setSuccessRole('')
            }, 4000)
    
            return () => clearTimeout(timer);
        }
       
    }, [successRole])

    useEffect(() => {
        if(successBanningUser) {
            const timer = setTimeout(() => {
                setBanningUser('')
            }, 4000)
    
            return () => clearTimeout(timer);
        }
        
    }, [successBanningUser])

    useEffect(() => {
        if(successDeleteRole) {
            const timer = setTimeout(() => {
                setDeleteRole('')
            }, 4000)
    
            return () => clearTimeout(timer) 
        }
        
    }, [successDeleteRole])

    useEffect(() => {
        if(deleteRoleFailure) {
            const timer = setTimeout(() => {
                setDeleteRoleFailure('')
            }, 4000)
            return () => clearTimeout(timer) 

        }
        

    }, [deleteRoleFailure])
   console.log('new date', new Date().toISOString());
    

    let browserHistoryPanel = null;
    if(browserHistory) {
        browserHistoryPanel = (
            <div className='browser-history-adminuserinfo-container'>

            <div className='browser-container'>
            <table>
                <tr>
                    <th>Browser name</th>
                    <th>Browser platform</th>
                    <th>OS name</th>
                    <th>Ip address</th>
                    <th>Date of login</th>


                </tr>
                {
                    data.browserHistoryInfo.map((item) => {
                        const { browserid, browser_name, browser_osname, browser_platform, browser_date, browser_ipaddress} = item
                        return (
                            <tr key={browserid}>
                                <td>{browser_name}</td>
                                <td>{browser_platform}</td>
                                <td>{browser_osname}</td>
                                <td>{browser_ipaddress}</td>
                                <td>{format(parseISO(browser_date), "MMMM Qo, yyyy, H:m a")}</td>




                            </tr>

                        )
                    })
                }
                
            </table>
            
        </div>
        </div>
        )
    }

    let ipHistoryPanel = null;

    if(ipaddressHistory) {
        ipHistoryPanel = (
            <div className='browser-history-adminuserinfo-container'>

                                <div className='browser-container'>
                                <table>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Date of login</th>


                                    </tr>
                                    {
                                        data.ipAddressHistory.map((item, index) => {
                                            const { username, date, email } = item
                                            return (
                                                <tr key={index}>
                                                    <td>{username}</td>
                                                    <td>{email}</td>
                                                    <td>{format(parseISO(date), "MMMM Qo, yyyy, H:m a")}</td>




                                                </tr>

                                            )
                                        })
                                    }
                                    
                                </table>
                                
                            </div>
                            </div>
        )
    }

    let updateRolesPanel = null;

    if(updateUserRoles) {
        updateRolesPanel = (
            <div className='browser-history-adminuserinfo-container'>
                                <form onSubmit={updateRoleFunction}>
                                <div className='browser-container'>
                                    <div className='role-select-container'>
                                
                                    Available roles: <select onChange={(e) => setCurrentValueForRoles(e.target.value)}>
                                                    {
                                                        data?.rolesForUpdate?.map((item, index) => {
                                                            return (
                                                                <option key={index}>{parse(item)}</option>
                                                            )
                                                        })
                                                    }
                                                        

                                                    </select>
                                    </div>
                                    {
                                        errorRole && (
                                            <div className='admin-failedrole'>
                                                {errorRole}
                                            </div>
                                        )
                                    }
                                    {
                                        successRole && (
                                            <div className='admin-verifysuccess'>
                                                {successRole}
                                            </div>
                                        )
                                    }
                                    <div className='role-selected-role'>
                                        <div className='role-selected-role-firstcontainer'>
                                            <span style={{marginRight: '0.5rem'}}>Current selected role: </span> {currentValueForRoles}
                                        </div>
                                        <div className='role-selected-role-secondcontainer'>
                                            <button>{isLoadingUpdateRoles ? 'Updating...' : 'Update roles'}</button>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                </form>
                            </div>
        )
    }

    let deleteUserPanel = null;

    if(deleteUserRoles) {
        deleteUserPanel = (
            <div className='browser-history-adminuserinfo-container'>
                                <form onSubmit={removeRoleFunction}>
                                <div className='browser-container'>
                                    <div className='role-select-container'>
                                
                                        This user roles: <select onChange={(e) => setCurrentRoleForDelete(e.target.value)}>
                                                    {
                                                        data?.rolesForDeleteUser?.map((item, index) => {
                                                            return (
                                                                <option key={index}>{parse(item)}</option>
                                                            )
                                                        })
                                                    }
                                                        

                                                    </select>
                                    </div>
                                    {
                                        successDeleteRole && (
                                            <div className='admin-verifysuccess'>
                                                {successDeleteRole}
                                            </div>
                                        )
                                    }
                                    {
                                        deleteRoleFailure && (
                                            <div className='admin-failedrole'>
                                                {deleteRoleFailure}
                                            </div>
                                        )
                                    }
                                   
                                    <div className='role-selected-role'>
                                        <div className='role-selected-role-firstcontainer'>
                                            <span style={{marginRight: '0.5rem'}}>Current selected role: </span> <span>{currentRoleForDelete}</span>
                                        </div>
                                        <div className='role-selected-role-secondcontainer'>
                                            <button>{isLoadingDeleteRoles ? 'Deleting...' : 'Delete roles'}</button>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                </form>
                            </div>
        )
    }

    let banUserPanel;

    if(banPanel) {
        banUserPanel = (
            <form onSubmit={banUserFunction}>
                            <div className='admin-userinfo-banned-container'>
                            {
                                        successBanningUser && (
                                            <div className='admin-verifysuccess'>
                                                {successBanningUser}
                                            </div>
                                        )
                                    }
                                <span>Enter how many days user will be banned, if you want permanently pass 1337 </span>
                                <input type='number' value={dateToBe} onChange={handleChangeDate} placeholder='Enter how many days....'/>
                                <input type='text' value={banReason} onChange={handleBanReasonData} placeholder='Reason for ban?' />
                                <span>User will be unbanned {fullDateNumber.toString()}
                            
                            </span>
                                <button>{isLoadingBanUser ? 'Banning user' : 'Ban this user'}</button>

                            </div>
                            </form>
        )
    }

    let succesUnbanPanel;

    if(successUnban) {
        succesUnbanPanel = (
            <div className='admin-verifysuccess'>
                {successUnban}
            </div>
        )
    }

    let panelBanUnbanContent = (
        <>
            {succesUnbanPanel}
            {banUserPanel}
        
        </>
    )



    let panelContent = (
        <>
        {deleteUserPanel}
        {updateRolesPanel}
        {ipHistoryPanel}
        {browserHistoryPanel}
        </>
    )


    useEffect(() => {
        if(updateRolesPanel) {
            setCurrentValueForRoles(data?.rolesForUpdate[0])

        }
    }, [updateRolesPanel])

    useEffect(() => {
        
        if(deleteUserRoles) {
            setCurrentRoleForDelete(data?.rolesForDeleteUser[0])
        }

    }, [deleteUserRoles])

    



console.log('data', fullDateNumber);
    let content;


    if(isLoading) content = <LoadingBox />

    if(error) {
        content = (
            <div className='admin-wrapper'>
        <LeftSide />
        <div className='admin-navbar-wrapper'>
            <Navbar />
            <div className='admin-userinfo-wrapper'>
                <div className='admin-userinfo-container'>
                    <div className='admin-userinfo-userprofile'>
                        <span>User Profile</span>
                    </div>
                    <div className='admin-userinfo-output'>
                        <div className='admin-userinfo-first'>
                            <div className='admin-userinfo-error'>
                                <p>{error?.data?.message}</p>
                                <button><Link to='/admin/userslist'>Take me back to users list!</Link></button>
                            </div>
                            
                            
                        </div>
                       
                    </div>
                </div>
                
        
            </div>
        </div>
    </div>
        )
    }
    
    if(isSuccess ) {
        const { isVerificatedByAdmin, username, location, postnumber, ipaddress, date, image, isbanned} = memoizedData.userInfoList
        content =  (
            <div className='admin-wrapper'>
        <LeftSide />
        <div className='admin-navbar-wrapper'>
            <Navbar />
            <div className='admin-userinfo-wrapper'>
                <div className='admin-userinfo-container'>
                    {panelBanUnbanContent}
                    <div className='admin-userinfo-userprofile'>
                        <span>User Profile</span>
                        {
                            isbanned === 1 ? <button onClick={unbanUserFunctionClient}>{isLoadingUnbanUser ? 'Unbanning this user' : 'Unban this user'}</button> : <button onClick={() => setBanPanel(!banPanel)}>Ban this user</button>
                        }
                    </div>
                    {
                        succesVerify && (
                            <div className='admin-verifysuccess'>
                                {succesVerify}
                            </div>
                        )
                    }
                    {
                        isVerificatedByAdmin === 0 && (
                            <form onSubmit={verifyAccountFunction}>
                            <div className='admin-userisnotverificatedbyadmin'>
                                This account is not verificated by admin, if you want verify this account press <button>Verify account</button>
                            </div>
                            </form>
                        )
                    }
                    <div className='admin-userinfo-output'>
                        <div className='admin-userinfo-first'>
                            <div className='admin-userinfo-first-container'>
                                <div className='admin-userinf-first-image'>
                                    <img src={image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${image}` : 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png' } />
                                </div>
                                <div className='admin-userinfo-username'>
                                    <span>{username}</span>
                                </div>
                                <div className='admin-userinfo-role'>
                                    {
                                        data?.roles?.map((item, index) => {
                                            return (
                                                <p key={index}>{parse(item)}</p>

                                            )
                                        })
                                    }
                                </div>
                                
                            </div>
                            <div className='admin-userinfo-location first-inrow'>
                                    <span className='admin-userinfo-location-color'>Location: </span>
                                    <span className='admin-userinfo-location-name'>NOVI SAD</span>
                                </div>
                                <div className='admin-userinfo-location'>
                                    <span className='admin-userinfo-location-color'>Number of posts: </span>
                                    <span className='admin-userinfo-location-name'>{postnumber}</span>
                                </div>
                                <div className='admin-userinfo-location'>
                                <span className='admin-userinfo-location-color'>Ip Address </span>
                                    <span className='admin-userinfo-location-name'>{ipaddress}</span>
                                    
                                </div>
        
                                <div className='admin-userinfo-location last-inrow'>
                                 <span className='admin-userinfo-location-color'>Date of register </span>
                                    <span className='admin-userinfo-location-name'>{format(parseISO(date), "MMMM Qo, yyyy, H:m a")} </span>
                                </div>
                            
                        </div>
                        <div className='admin-userinfo-second'>
                            <div className='admin-userinfo-second-userdetails'>
                                Account details
                            </div>
                            <form onSubmit={updateUserAccount}>
                            <div className='admin-userinfo-second-inputs'>
                                <div className='admin-userinfo-second-inputs-container'>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Username
                                        </label>
                                        <input type='text' name='username' id='username' disabled value={value.username} onChange={handleChange} placeholder='Username'/>
                                    </div>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Email
                                        </label>
                                        <input type='email'  name='email' id='email' value={value.email} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className='admin-userinfo-second-inputs-container'>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Password
                                        </label>
                                        <input type='password' name='password' id='password' placeholder='Password is not visible'   onChange={handleChange}/>
                                    </div>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Location
                                        </label>
                                        <input type='text' name='location' id='location' value={value.location}  onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className='admin-userinfo-second-inputs-container'>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Steamtag
                                        </label> 
                                        <input type='text' name='steamtag' id='steamtag' value={value.steamtag}  onChange={handleChange}/>
                                    </div>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Image
                                        </label>
                                        <input type='text' />
                                    </div>
                                </div>
                                <div className='admin-userinfo-second-inputs-container'>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Verificated Email
                                        </label>
                                        <input type='text' name='verificated' id='verificated' disabled value={value.verificated}  onChange={handleChange}/>
                                    </div>
                                    <div className='admin-userinfo-second-input-first'>
                                        <label>
                                            Verificated by Admin
                                        </label>
                                        <input type='text' name='verificatedbyadmin' id='verificatedbyadmin' value={value.isVerificatedByAdmin} disabled/>
                                    </div>

                                </div>
                                <div className='admin-userinfo-button'>
                                    <button>{isLoadingUpdateAccount ? 'Updating account' : 'Update account'}</button>
                                    
                                </div>
                            </div>
                            </form>

                        </div>
                    </div>
                    <div className='button-container-adminuser'>
                        <button onClick={() => setBrowserHistory(!browserHistory)}>{browserHistory ? 'Close browser history list' : 'Open browser history list'}</button>
                        <button style={{marginLeft: '0.5rem'}} onClick={() => setIpaddressHistory(!ipaddressHistory)}>{ipaddressHistory ? 'Close IPADDRESS history list' : 'Open IPADDRESS history list'}</button>
                        <button style={{marginLeft: '0.5rem'}} onClick={() => setUpdateUserRooles(!updateUserRoles)}>{updateUserRoles ? 'Close updating roles' : 'Open updating roles'}</button>
                        <button style={{marginLeft: '0.5rem'}} onClick={() => setDeleteUserRoles(!deleteUserRoles)}>{deleteUserRoles ? 'Close deleting roles' : 'Open deleting roles'}</button>

                    </div> 
                       {panelContent}
                </div>
                
            </div>
        </div>
    </div>
        )
    }


  return content
}
