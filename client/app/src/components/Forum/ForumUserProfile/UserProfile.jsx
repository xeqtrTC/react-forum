import React, { useState } from 'react';
import Header from '../../header/Header';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import LoadingBox from '../../LoadingBox/LoadingBox';
import { format, parseISO   } from 'date-fns'
import parse from 'html-react-parser';

import './UserProfile.css';

import { useUserInfoQuery } from '../../../redux/usersApi/usersApi';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';
import UseAuthHook from '../../Hooks/UseAuthHook';
export default function UserProfile() {
    const { roles, username } = UseAuthHook();


    const { data, error, isSuccess, isLoading, isError } = useUserInfoQuery()
    console.log(data);
    const resultFromQuery = data?.result;
    // const dateright = format(parseISO(resultFromQuery[0].date), "MMMM Qo,yyyy, H:m a");

    const [color, setColor] = useState(true)

    let content;

    if(isLoading) content = <LoadingBox />
    
    if(error) content = <p>{error?.data?.message}</p>

    if(isSuccess) {

            const { date, email, image, ipaddress, isVerificated, isbanned, location, postnumber, steamtag, username} = data.resultInfo
      
        content = (
            <>
            <Header children={color} />
            <div className='forum-screen-container'>
    
                <PhotoAfterHeader />
    
                
                            <>
                            
                          
                            <div className='forum-profile-screen'>
                                          <div className='forum-profile-width'>
                                            
                                              <div className='forum-profile-width-screen'>
                                                  <div className='forum-profile-image'>
                                                    <img src={image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${image}` : 'https://steamuserimages-a.akamaihd.net/ugc/1898849113834216705/2DBAD8646ABEAF1DC65C6EEB148A5EB649FEFB5C/'} alt='photo' />
                                                    <div className='forum-roles'>
                                                    {roles.map((item) => {
                                                        
                                                        return (
                                                           <div>{parse(item)}</div>
                                                        )
                                                    })}
                                                    </div>
                                                  </div>
                                                  <div className='forum-profile-info'>
                                                      <div className='forum-profile-info-users'>
                                                          <span>Username:</span> <span>{username}</span>
                                                          <Link to='/forum/editprofile'><button>Edit profile</button></Link>
                                                      </div>
                                                     
                                                      {
                                                        location.length > 0 && 
                                                        <div className='forum-profile-info-users'>
                                                          <span>Location:</span> <span>{location}</span>
                                                      </div>
                                                      }
                                                      {
                                                        steamtag.length > 0 &&
                                                        <div className='forum-profile-info-users'>
                                                          <span>Steam tag:</span> <span>{steamtag}</span>
                                                      </div>
                                                      }
                                                  </div>
                                              </div>
    
    
                                          </div>
    
                                      </div><div className='userprofile-under'>
                                              <div className='useprofile-right'>
                                                  <span className='userstatistics'>User statistics</span>
                                                  <div className='userstatistics-little-spans'>
                                                      <div className='userstatistics-little-spans-leftside'>
                                                          <p>Joined</p>
                                                          <p>Last active</p>
                                                          <p>Posts</p>
                                                      </div>
                                                      <div className='userstatistics-little-spans-rightside'>
                                                          <p>{format(parseISO(date), "do MMM, Y,  H:m a")}</p> 
                                                          <p>Yestrday</p>
    
                                                         {postnumber} | <Link to={'/forum/searchposts'}><span className='span-b'>Search user's posts</span></Link>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          </>
                        
    
               
            </div>
            <Footer />
        </>
        )


    }
  
  return content;
}
