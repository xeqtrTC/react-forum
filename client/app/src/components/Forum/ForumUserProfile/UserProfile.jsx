import React, { useState } from 'react';
import Header from '../../header/Header';
import { AiOutlineFolder } from 'react-icons/ai';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import LoadingBox from '../../LoadingBox/LoadingBox';
import { format, formatDistance, formatRelative, subDays, parseISO, compareAsc   } from 'date-fns'

import './UserProfile.css';
import { selectCurrentUser } from '../../../redux/authSlice';
import { useSelector } from 'react-redux';
import { useUserInfoQuery } from '../../../redux/usersApi/usersApi';
export default function UserProfile() {
    const username = useSelector(selectCurrentUser);
    console.log(username);

    const { data, isLoading, isError } = useUserInfoQuery(username)
    console.log(data);
    const resultFromQuery = data?.result;
    // const dateright = format(parseISO(resultFromQuery[0].date), "MMMM Qo,yyyy, H:m a");

    const [color, setColor] = useState(true)
    
  
  return (
    <>
        <Header children={color} />
        <div className='forum-screen-container'>

            <div className='forum-screen-banner'>
                <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
            </div>

            {
                isLoading ? (
                    <LoadingBox />
                ) : (
                    isError ? (
                        <p>{isError}</p>
                    ) : (
                        <>
                        <div className='forum-profile-screen'>
                                      <div className='forum-profile-width'>

                                          <div className='forum-profile-width-screen'>
                                              <div className='forum-profile-image'>
                                                  <img src={'https://2img.net/h/images3.kurir.rs/slika-w640/ninda-kornjace-1328585176-89207.jpg'} alt='photo' />
                                              </div>
                                              <div className='forum-profile-info'>
                                                  <div className='forum-profile-info-users'>
                                                      <span>Username:</span> <span>{resultFromQuery[0].username}</span>
                                                      <Link to='/editprofile'><button>Edit profile</button></Link>
                                                  </div>
                                                  {
                                                    resultFromQuery[0].location.length > 0 && 
                                                    <div className='forum-profile-info-users'>
                                                      <span>Location:</span> <span>{resultFromQuery[0].location}</span>
                                                  </div>
                                                  }
                                                  {
                                                    resultFromQuery[0].steamtag.length > 0 &&
                                                    <div className='forum-profile-info-users'>
                                                      <span>Steam tag:</span> <span>{resultFromQuery[0].steamtag}</span>
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
                                                      <p>{format(parseISO(data.result[0]?.date), "MMMM Qo, yyyy, H:m a")}</p> 
                                                      <p>Yestrday</p>

                                                     {data.result[0].postnumber} | <Link to={'/searchposts'}><span className='span-b'>Search user's posts</span></Link>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      </>
                    )
                )
            }

           
        </div>
        <Footer />
    </>

)
}
