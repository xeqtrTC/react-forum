import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../Footer/Footer';

import './PostByUser.css';

export default function PostByUser() {
    const [color, setColor] = useState(true)
  return (
    <>
        <Header children={color} />
        <div className='forum-screen-container'>
            <div className='forum-screen-banner'>
                <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
            </div>
            <div className='forum-page-first'>
                <div className='forum-page-full'>
                    <p>Staff</p>
                </div>
            </div>
            <div className='forum-userby-posts-container'>
                <div className='postbyuser-button'>
                    <button>Post a reply</button>
                </div>
                <div className='postbyuser-post'>
                    <div className='postbyuser-leftside'>
                        <div className='leftside-username'>
                            <span>xeqtrTC</span>
                        </div>
                        <div className='postbyuser-avatar'>
                            <img src={'https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.1920x1080.jpg?t=1641233427'} alt='photo' />

                        </div>
                        <div className='postbyuser-posts'>
                            <span>Posts:</span> <span>52</span>
                        </div>
                    </div>
                    <div className='postbyuser-content'>
                        <div className='postbyuser-content-title'>
                            Test
                        </div>
                        <div className='postbyuser-content-content'>
                            asdf
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <Footer />
    </>

  )
}
