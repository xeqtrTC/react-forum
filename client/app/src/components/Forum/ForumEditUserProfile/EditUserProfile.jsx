import React, { useState, useEffect, useRef, useReducer } from 'react'
import { useUserInfoQuery, useUpdateSteamtagorLocationMutation, useUpdateImageMutation, useUpdateEmailOrPasswordMutation } from '../../../redux/usersApi/usersApi';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import Header from '../../header/Header';
import { format, parseISO   } from 'date-fns'
import LoadingBox from '../../LoadingBox/LoadingBox';
import './EditUserProfile.css';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u


const reducer = (state, action) => {
    switch(action.type) {
        case 'overview_state':
            return { overview_state: true};
        case 'editprofile_state':
            return { editprofile_state: true};
        case 'editimage_state':
            return { editimage_state: true};
        case 'editsettings_state':
            return { editsettings_state: true};
        case 'recently_state':
            return { recently_state: true};
        default: return state;
    }
}

const initialState = {
    overview_state: true,
    editprofile_state: false,
    editimage_state: false,
    editsettings_state: false,
    recently_state: false
}

const first_flip = () => ({
    type: 'overview_state'
})
const second_flip = () => ({
    type: 'editprofile_state'
})
const third_flip = () => ({
    type: 'editimage_state'
})
const fourth_flip = () => ({
    type: 'editsettings_state'
})
const fifth_flip = () => ({
    type: 'recently_state'
})

export default function EditUserProfile() {
    const [state, dispatch] = useReducer(reducer, { initialState})
    const [color, setColor] = useState(true);
    const { data, isSuccess, isLoading, isError } = useUserInfoQuery()
    const [updateSteamtagorLocation] = useUpdateSteamtagorLocationMutation();
    const [updateImage] = useUpdateImageMutation();
    const [updateEmailOrPassword, { isLoading : isLoadingUpdatingPassword}] = useUpdateEmailOrPasswordMutation();
    console.log('data', data)
    const userRef = useRef();

    const [usernameValue, setValueUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [focusUsername, setFocusUsername] = useState(false);

    const [emailValue, setEmailValue] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);

    const [passwordValue, setPasswordValue] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);


    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);

    const [successUpdatePassword, setSuccessUpdatePassword] = useState(null);

    const [realPasswordValue, setRealPasswordValue] = useState('');

    const isEveryInputValid = [validConfirmPassword, validPassword, validEmail].every(Boolean);

    const [error, setError] = useState('');

    

    console.log('VALID', validConfirmPassword);
    
    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(usernameValue))
    }, [usernameValue])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(emailValue))
    }, [emailValue])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(passwordValue));
        if(confirmPasswordValue.length > 0) {
            setValidConfirmPassword(passwordValue === confirmPasswordValue);
        }
    }, [passwordValue, confirmPasswordValue]);

    useEffect(() => {
        setError('');
    }, [usernameValue, passwordValue, confirmPasswordValue])


    const [overview, setOverview] = useState(false);
    const [overviewFocus, setOverviewFocus] = useState(false);
    
    const [editProfile, setEditProfile] = useState(true);
    const [profileFocus, setProfileFocus] = useState(true);

    const [imageName, setImageName] = useState("");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const [editUser, setEditUser] = useState(false);




    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const [image, setImage] = useState('');


    
    const [steamtagState, setSteamTagState] = useState('');
    const [locationState, setLocationState] = useState('');

    useEffect(() => {
        if(isSuccess) {
            setSteamTagState(data?.resultInfo.steamtag);
            setLocationState(data?.resultInfo.location)
            setEmailValue(data?.resultInfo.email);
        }
    }, [isSuccess])



    const uploadfileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        
        bodyFormData.append('name', file.name);
        console.log(file);
        setLoadingUpload(true);
         try {
            const { data } = await Axios.post('http://localhost:5000/acab/upload', bodyFormData, {
            })
            console.log(data);
            const { public_id } = data;
            setImageName(public_id);
            console.log(public_id);
            setLoadingUpload(false);
         } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
         }
    }

  

    const updateSteamorLocation = async (e) => {
            e.preventDefault();
        
        try {
            const { data } = await updateSteamtagorLocation({steamtagState, locationState}).unwrap();
            setSuccessUpdatePassword('You updated steamtag or location') 
            // setSteamTagState('');
            // setLocationState('');
            console.log(data);
        } catch ( error ) {
            console.log(error);
        }
    }


    const sendUpdatedImage = async (e) => {
        e.preventDefault();
        console.log(imageName);
        try {
            const { updateImageSent } = await updateImage({imageName}).unwrap();
            console.log(updateImageSent);

        } catch (error) {
            console.log(error)
        }
    }
    console.log('erroooooooooor', error);
    const sendUpdateEmailorPassword = async (e) => {
        e.preventDefault();

        const v1 = PASSWORD_REGEX.test(passwordValue); // if user somehow bypasses JS, catches him
        // const v2 = EMAIL_REGEX.test(emailValue);
 
        if(realPasswordValue && passwordValue && confirmPasswordValue) {

            if(!v1) {
                setError('Incorrect form of password')
            } else if (confirmPasswordValue != passwordValue) {
                setError('Passwords do not match')
            } else {
                try {
                    
                    const { updateEmailorPasswordSent } = await updateEmailOrPassword({ realPasswordValue, passwordValue }).unwrap();
                    setSuccessUpdatePassword('You updated your password')
                    setConfirmPasswordValue('');
                    setPasswordValue('');
                    setRealPasswordValue('');
                    console.log(updateEmailorPasswordSent)

                } catch (error) {
                    const { data } = error;
                        if(data.message === 'Email already exists') {
                            setError('Email already exists')
                        } else if(data.message === 'Password is not valid') {
                            setError('Current password is not valid')
                        }
                        console.log(error);
                }
            }

         } 
        // if (!v1) {
        //     setError('Incorrect form of password');
        //     return;
        // }
        // if(!validConfirmPassword) {
        //     setError('Confirm password is not same as new password')
        // }
        // try {

        //     const { updateEmailorPasswordSent } = await updateEmailOrPassword({ realPasswordValue, passwordValue }).unwrap();
        //     setSuccessUpdatePassword('You updated your password')
        //     setConfirmPasswordValue('');
        //     setPasswordValue('');
        //     setRealPasswordValue('');
        //     console.log(updateEmailorPasswordSent)

        // } catch (error) {

        //     const { data } = error;
        //     if(data.message === 'Email already exists') {
        //         setError('Email already exists')
        //     } else if(data.message === 'Password is not valid') {
        //         setError('Current password is not valid')
        //     }
        //     console.log(error);
        // }
    }














console.log(image);





















    // const editProfileFunction = () => {
    //     setEditProfile(true);
    //     setProfileFocus(true);
    //     setEditImage(false);
    //     setImageFocus(false);
    //     setEditUser(false);
    //     setEditUserFocus(false);
    //     setOverview(false)
    //     setOverviewFocus(false);
    //     setBrowserHistory(false)
    //     setBrowserHistoryFocus(false);
    // }   
    // const editImageFunction = () => {
    //     setEditImage(true);
    //     setImageFocus(true);
    //     setEditProfile(false);
    //     setProfileFocus(false);
    //     setEditUser(false)
    //     setEditUserFocus(false);
    //     setOverview(false)
    //     setOverviewFocus(false);
    //     setBrowserHistory(false)
    //     setBrowserHistoryFocus(false);
    // }  
    // const editUserSettings = () => {
    //     setEditUser(true)
    //     setEditUserFocus(true);
    //     setEditImage(false);
    //     setImageFocus(false);
    //     setEditProfile(false);
    //     setProfileFocus(false);
    //     setOverview(false)
    //     setOverviewFocus(false);
    //     setBrowserHistory(false)
    //     setBrowserHistoryFocus(false);
    // }
    // const overviewSettings = () => {
    //     setOverview(true)
    //     setOverviewFocus(true);
    //     setEditUser(false)
    //     setEditUserFocus(false);
    //     setEditImage(false);
    //     setImageFocus(false);
    //     setEditProfile(false);
    //     setProfileFocus(false);
    //     setBrowserHistory(false)
    //     setBrowserHistoryFocus(false);
    // }

    // const browserHistorySettings = () => {
    //     setBrowserHistory(true)
    //     setBrowserHistoryFocus(true);
    //     setOverview(false)
    //     setOverviewFocus(false);
    //     setEditUser(false)
    //     setEditUserFocus(false);
    //     setEditImage(false);
    //     setImageFocus(false);
    //     setEditProfile(false);
    //     setProfileFocus(false);
    // }

    useEffect(() => {
      if(editUser) {
        userRef.current.focus();
      }  
    }, [editUser])

    useEffect(() => {
        if(editUser || editProfile) {
            const timer = setTimeout(() => {
                setSuccessUpdatePassword('')
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [editUser, successUpdatePassword])


    let overviewButton;
    if(state?.overview_state || state?.initialState?.overview_state ) {
        overviewButton = (
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
                                                {/* <p>{format(parseISO(data?.resultInfo?.date), "MMMM Qo, yyyy, H:m a")}</p> */}
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
                                                <span className='border-right'>{data?.resultInfo?.postnumber}</span>
                                                <Link to={'/searchposts'}><span className='color-blue'>Show total posts</span></Link>
                                            </div>
                                        </div>
                                        

                                    </div>
                                </div>
        )
    }
    
    let editProfileButton;

    if(state?.editprofile_state) {
        editProfileButton = (
            <form onSubmit={updateSteamorLocation}>
                                <div className='forum-editprofile-rightside-state'>
                                {
                                    successUpdatePassword && (
                                        <div className='admin-verifysuccess' style={{textAlign: 'center'}}>
                                                {successUpdatePassword}
                                            </div>
                                    )
                                }
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
                                            <input type='text' name='steamtag' value={steamtagState} onChange={(e) => setSteamTagState(e.target.value)} />
                                        </div>
                                        
                                    </div>
                                    
                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>Location:</p>
                                        </div>
                                        <div className='forum-editprofile-input-text'>
                                            <input type='text' name='locationtag' value={locationState } onChange={(e) =>  setLocationState(e.target.value)} />
                                        </div>
                                        
                                    </div>

                                    <div className='upload-image-button'>
                                        <button>Submit</button>
                                    </div>
                                </div>
                            </div>
                            </form>
        )
    }

    let imageUploadButton;

    if(state?.editimage_state) {
        imageUploadButton = (
            <form onSubmit={sendUpdatedImage}>
                                <div className='editimage-container'>

                                    <div className='editimage-container-image'>
                                        <div className='editimage-info-about-image'>
                                            <p className='editprofile-p'>Current image:</p>
                                            <span className='editprofile-span'>Maximum dimensions; width: 130 pixels, height: 130 pixels, file size: 1953.00 KiB</span>
                                        </div>
                                        <div className='editiimage-image'>
                                        <img src={data.resultInfo?.image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${data.resultInfo?.image}` : 'https://steamuserimages-a.akamaihd.net/ugc/1898849113834216705/2DBAD8646ABEAF1DC65C6EEB148A5EB649FEFB5C/'} alt='photo' />

                                        </div>
                                    </div>
                                    <p className='select-avatar'>Select your avatar</p>

                                    <div className='upload-image-container'>
                                        <div className='upload-image-editimage'>
                                            <p className='editprofile-p'>Upload your from your machine:</p>
                                        </div>
                                        <div className='uploadimage-input'>
                                            <input name='image' type='file' id='imageFile' onChange={uploadfileHandler} />
                                        </div>
                                    </div>
                                    <div className='upload-image-button'>
                                        <button>Submit</button>
                                    </div>
                                </div>
                                </form>
        )
    }
    
    let editUserButton;

    if(state?.editsettings_state        ) {
        editUserButton = (
            <form onSubmit={sendUpdateEmailorPassword}>
                                <div className='forum-editprofile-rightside-state'>
                                {
                                    error && <div  className='error-container' >
                                        <p>{error}</p>
                                    </div>
                                }
                                {
                                    successUpdatePassword && (
                                        <div className='admin-verifysuccess' style={{textAlign: 'center'}}>
                                                {successUpdatePassword}
                                            </div>
                                    )
                                }

                                    <div className='forum-editprofile-rightside-name-input'>
                                        <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                                <p className='editprofile-p'>Username:</p>
                                                <span className='editprofile-span'>4 to 24 characters, must start with a letter.</span>
                                            </div>
                                        <div className='forum-editprofile-input-text'>
                                            <span>{data.resultInfo?.username}</span>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>Email address:</p>
                                            <span className='editprofile-span'>If there is any problem with your email, contact support.</span>
                                        </div>
                                        <div className={'forum-editprofile-input-text'}>
                                            <input type='text' onFocus={() => setFocusEmail(true)} disabled  onBlur={() => setFocusEmail(false)} aria-invalid={validEmail ? 'false' : 'true'}  value={emailValue}  ref={userRef}  onChange={(e) => setEmailValue(e.target.value)} />
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
                                        <div className={'forum-editprofile-input-text'}>
                                            <input type='password' onFocus={() => setFocusPassword(true)} onBlur={() => setFocusPassword(false)} aria-invalid={validPassword ? 'false' : 'true'} value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}/>
                                        </div>
                                        
                                    </div>

                                    <div className='forum-editprofile-flex-column'>
                                            <div className='forum-editprofile-rightside-name'>
                                            <p className='editprofile-p'>Confirm password:</p>
                                            <span className='editprofile-span'>You only need to confirm your password if you changed it above.</span>
                                        </div>
                                        <div className={'forum-editprofile-input-text'}>
                                            <input type='password' onFocus={() => setFocusConfirmPassword(true)} onBlur={() => setFocusConfirmPassword(false)} aria-invalid={validConfirmPassword ? 'false' : 'true'} value={confirmPasswordValue} onChange={(e) => setConfirmPasswordValue(e.target.value)}/>
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
                                            <input type='password' value={realPasswordValue} onChange={(e) => setRealPasswordValue(e.target.value)} />
                                        </div>
                                        
                                    </div>
                                    <div className='upload-image-button'>
                                        <button>{isLoadingUpdatingPassword ? 'Updating user' : 'Submit'}</button>
                                    </div>
                                </div>

                            </div>
                            </form>
        )
    }

    let browserHistoryButton;

    if(state?.recently_state) {
        browserHistoryButton = (
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
                    data?.rows?.map((item) => {
                        const { browser_name, browser_osname, browser_platform, browser_date, browser_ipaddress, browserid } = item
                        return (
                            <tr>
                                <td key={browserid}>{browser_name}</td>
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
        )
    }

    const buttonContainer = (
        <>
        {editUserButton}
        {imageUploadButton}
        {editProfileButton}
        {overviewButton}
        {browserHistoryButton}
        </>
    )



    let content;

    if(isLoading) {
        content = <LoadingBox />
    }


    if(isSuccess) {
        content = (
            <>
        <Header children={color} />
        <div className='forum-page-container'>
            <PhotoAfterHeader />       
            <div className='forum-page-first'>
                <div className='forum-page-full'>
                    <span>User control panel</span>   <span className='spantitle'></span>
                </div>
            </div>
           
                    <div className='forum-editprofile-width'>
                <div className='forum-editprofile-container'>
                    <div className='forum-editprofile-leftisde'>
                        <div className='leftside-options'>
                            <ul>
                                <li onClick={() => dispatch(first_flip()) } className={ state?.overview_state || state?.initialState?.overview_state ? 'selected-li' : 'unselected-li'}>Overview</li>
                                <li onClick={() => dispatch(second_flip()) } className={ state?.editprofile_state ? 'selected-li' : 'unselected-li'}>Edit profile</li>
                                <li onClick={() => dispatch(third_flip())} className={ state?.editimage_state ? 'selected-li' : 'unselected-li' }>Edit image</li>
                                <li onClick={() => dispatch(fourth_flip())} className={ state?.editsettings_state ? 'selected-li' : 'unselected-li'}>Edit account settings</li>
                                <li onClick={() => dispatch(fifth_flip())} className={ state?.recently_state ? 'selected-li' : 'unselected-li'}>Recently used devices</li>

                            </ul>
                        </div>
                    </div>
                    <div className='forum-editprofile-rightside'>
                        
                       {buttonContainer}
                        
                       
                    </div>

                </div>
            
           </div>
                



        </div>
        <Footer />
    </>
        )
    }
  
    
    return content;
}
