import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/authSlice';
import { useUserInfoQuery } from '../../../redux/usersApi/usersApi';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import { Axios } from 'axios';
import Header from '../../header/Header';
import { format, formatDistance, formatRelative, subDays, parseISO, compareAsc   } from 'date-fns'

import LoadingBox from '../../LoadingBox/LoadingBox';



import './EditUserProfile.css';

export default function EditUserProfile() {
    const [color, setColor] = useState(true);
    const username = useSelector(selectCurrentUser);
    const { data, isLoading, isError } = useUserInfoQuery(username)
    console.log(data);

    const [overview, setOverview] = useState(false);
    const [overviewFocus, setOverviewFocus] = useState(false);
    
    const [editProfile, setEditProfile] = useState(true);
    const [profileFocus, setProfileFocus] = useState(true);

    
    const [editImage, setEditImage] = useState(false);
    const [imageFocus, setImageFocus] =  useState(false);

    const [editUser, setEditUser] = useState(false);
    const [editUserFocus, setEditUserFocus] = useState(false);
    console.log(editImage);

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const [image, setImage] = useState('');


    const uploadImage = async (e, base64EncodedImage) => {
        const fileImage = e.target.files[0];
        console.log('aesaeaseas')
        console.log(fileImage);
        setSelectedFile(fileImage);
        setFileInputState(e.target.value);
        console.log(fileInputState)
        const reader = new FileReader();

        reader.readAsDataURL(fileImage);
        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.onerror = () => {
            console.error('errorrr')
        }
        console.log(reader);
        try {
            await Axios.post('https://evening-bayou-13792.herokuapp.com/upload/',  {data: image} , {
                
            })
           setFileInputState('');
           setImage('');

        } catch (error) {
            console.log(error);

        }
    }




























    const editProfileFunction = () => {
        setEditProfile(true);
        setProfileFocus(true);
        setEditImage(false);
        setImageFocus(false);
        setEditUser(false);
        setEditUserFocus(false);
        setOverview(false)
        setOverviewFocus(false);
    }   
    const editImageFunction = () => {
        setEditImage(true);
        setImageFocus(true);
        setEditProfile(false);
        setProfileFocus(false);
        setEditUser(false)
        setEditUserFocus(false);
        setOverview(false)
        setOverviewFocus(false);
    }  
    const editUserSettings = () => {
        setEditUser(true)
        setEditUserFocus(true);
        setEditImage(false);
        setImageFocus(false);
        setEditProfile(false);
        setProfileFocus(false);
        setOverview(false)
        setOverviewFocus(false);
    }
    const overviewSettings = () => {
        setOverview(true)
        setOverviewFocus(true);
        setEditUser(false)
        setEditUserFocus(false);
        setEditImage(false);
        setImageFocus(false);
        setEditProfile(false);
        setProfileFocus(false);
    }
  
    
    return (
        <>
        <Header children={color} />
        <div className='forum-page-container'>
            <div className='forum-screen-banner'>
                <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
            </div>         
            <div className='forum-page-first'>
                <div className='forum-page-full'>
                    <span>User control panel</span>   <span className='spantitle'></span>
                </div>
            </div>
           {
            isLoading ? (
                <LoadingBox />
            ) : (
                isError ? (
                    <p>{isError}</p>
                ) : (
                    <div className='forum-editprofile-width'>
                <div className='forum-editprofile-container'>
                    <div className='forum-editprofile-leftisde'>
                        <div className='leftside-options'>
                            <ul>
                                <li onClick={overviewSettings } className={ overviewFocus ? 'selected-li' : 'unselected-li'}>Overview</li>
                                <li onClick={editProfileFunction } className={ profileFocus ? 'selected-li' : 'unselected-li'}>Edit profile</li>
                                <li onClick={editImageFunction} className={ imageFocus ? 'selected-li' : 'unselected-li' }>Edit image</li>
                                <li onClick={editUserSettings} className={ editUserFocus ? 'selected-li' : 'unselected-li'}>Edit account settings</li>

                            </ul>
                        </div>
                    </div>
                    <div className='forum-editprofile-rightside'>
                        {
                            overview && (
                                <div className='overview-container'>
                                    <div className='forum-editprofile-rightside-texts'>
                                        Welcome to the User Control Panel. From here you can monitor, view and update your profile, preferences, subscribed forums and topics. You can also send messages to other users (if permitted). Please ensure you read any announcements before continuing.
                                    </div>
                                    <p className='select-avatar'>Your activity</p>

                                    <div className='overview-total-posts'>
                                        <div className='overview-flex'>
                                            <div className='total-post-name'>
                                                <p>Joined:  </p>
                                            </div>
                                            <div className='forum-post-name-answer'>
                                                <p>{format(parseISO(data.result[0]?.date), "MMMM Qo, yyyy, H:m a")}</p>
                                            </div>
                                        </div>
                                        <div className='overview-flex'>
                                            <div className='total-post-name'>
                                                <p>Last active:</p>
                                            </div>
                                            <div className='forum-post-name-answer'>
                                                <p>525252</p>
                                            </div>
                                        </div>
                                        <div className='overview-flex'>
                                            <div className='total-post-name'>
                                                <p>Total posts:</p>
                                            </div>
                                            <div className='forum-post-name-answer'>
                                                <span className='border-right'>{data.result[0].postnumber}</span>
                                                <Link to={'/searchposts'}><span className='color-blue'>Show total posts</span></Link>
                                            </div>
                                        </div>
                                        

                                    </div>
                                </div>
                                

                            )
                        }
                        {
                            editProfile &&   (
                                <div className='forum-editprofile-rightside-state'>
                                    <div className='forum-editprofile-rightside-texts'>
                                        Please note that this information may be viewable to other members. Be careful when including any personal details. Any fields marked with a * must be completed.
                                    </div>

                                    <div className='forum-editprofile-rightside-name-input'>
                                        <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                                <p className='editprofile-p'>Steam:</p>
                                                <span className='editprofile-span'>Provide the URL to your Steam profile if you want other users to be able to contact you.</span>
                                            </div>
                                        <div className='forum-editprofile-input-text'>
                                            <input type='text' value={data.result[0].steamtag.length > 0 ? data.result[0].steamtag : '' } />
                                        </div>
                                        
                                    </div>
                                    
                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>Location:</p>
                                        </div>
                                        <div className='forum-editprofile-input-text'>
                                            <input type='text' value={data.result[0].steamtag.length > 0 ? data.result[0].location : '' } />
                                        </div>
                                        
                                    </div>

                                    <div className='upload-image-button'>
                                        <button>Submit</button>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                        {
                            editImage && (
                                <div className='editimage-container'>
                                    <div className='editimage-container-image'>
                                        <div className='editimage-info-about-image'>
                                            <p className='editprofile-p'>Current image:</p>
                                            <span className='editprofile-span'>Maximum dimensions; width: 130 pixels, height: 130 pixels, file size: 1953.00 KiB</span>
                                        </div>
                                        <div className='editiimage-image'>
                                            <img src={'https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.1920x1080.jpg?t=1641233427'} alt='photo' />

                                        </div>
                                    </div>
                                    <p className='select-avatar'>Select your avatar</p>

                                    <div className='upload-image-container'>
                                        <div className='upload-image-editimage'>
                                            <p className='editprofile-p'>Upload your from your machine:</p>
                                        </div>
                                        <div className='uploadimage-input'>
                                            <input type='file' />
                                        </div>
                                    </div>
                                    <div className='upload-image-button'>
                                        <button>Submit</button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            editUser && (
                                
                                <div className='forum-editprofile-rightside-state'>
                                    

                                    <div className='forum-editprofile-rightside-name-input'>
                                        <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                                <p className='editprofile-p'>Username:</p>
                                                <span className='editprofile-span'>4 to 24 characters, must start with a letter.</span>
                                            </div>
                                        <div className='forum-editprofile-input-text'>
                                            <span>ksks</span>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>Email address:</p>
                                        </div>
                                        <div className='forum-editprofile-input-text'>
                                            <input type='text' />
                                        </div>
                                        
                                    </div>

                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>New password:</p>
                                            <span className='editprofile-span'>4 to 24 characters.
                                                Must include uppercase and lowercase letters.
                                                Must include a number and a special character.
                                                Special characters allowed: ! @ # $ %.</span>
                                        </div>
                                        <div className='forum-editprofile-input-text'>
                                            <input type='text' />
                                        </div>
                                        
                                    </div>

                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>Confirm password:</p>
                                            <span className='editprofile-span'>You only need to confirm your password if you changed it above.</span>
                                        </div>
                                        <div className='forum-editprofile-input-text'>
                                            <input type='text' />
                                        </div>
                                        
                                    </div>


                                </div>
                                <div className='confirm-password'>
                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>Current password:</p>
                                            <span className='editprofile-span'>You only need to confirm your password if you changed it above.</span>
                                        </div>
                                        <div className='forum-editprofile-input-text'>
                                            <input type='text' />
                                        </div>
                                        
                                    </div>
                                    <div className='upload-image-button'>
                                        <button>Submit</button>
                                    </div>
                                </div>

                            </div>
                               
                            )
                            
                        }
                    </div>

                </div>
            
           </div>
                )
            )
           }



        </div>
        <Footer />
    </>
  )
}
