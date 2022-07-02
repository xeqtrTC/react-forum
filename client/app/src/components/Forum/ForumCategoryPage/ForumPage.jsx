import React, { useState } from 'react';
import Header from '../../header/Header';
import { useParams } from 'react-router-dom';
import { TbBrandPagekit } from 'react-icons/tb';
import Footer from '../../Footer/Footer';
import LoadingBox from '../../LoadingBox/LoadingBox';
import './ForumPage.css';
export default function ForumPage() {
    const params = useParams();
    const {category} = params;
    console.log(category);
    const { data, isLoading } = ({category}) 
    const [color, setColor] = useState(true)
    console.log(data);

  return (
    <>
        {
            isLoading && <LoadingBox />
        }
        <Header children={color} />
        <div className='forum-page-container'>
            <div className='forum-screen-banner'>
                <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
            </div>         
            <div className='forum-page-first'>
                <div className='forum-page-full'>
                    <p>{category}</p>
                </div>
            </div>   
            <div className='forum-page-second-container'>
                <div className='forum-page-posts'>
                    <div className='forum-page-topic'>
                        <p>Topic</p>
                        <p>Last post</p>
                    </div>
                {
                    data?.length === 0 && <p>There isn't any posts yet.</p>
                }
                {
                        data?.map((post) => {
                            const { posttitle, postusername, postdate } = post
                            return (
                                <div className='forum-page-real-post'>
                                    <div className='forum-page-icon'>
                                        <TbBrandPagekit />
                                    </div>
                                    <div className='forum-page-title'>
                                        <p className='community-category-name'>{posttitle}</p>
                                        <span className='forum-page-by'>by:</span> <span className='forum-page-user'>{postusername}</span> <span className='forum-page-by'>22.2.22</span>
                                    </div>
                                    <div className='forum-screen-last-post'>
                                        <div className='forum-screen-last-post-p'>
                                        <p>Re: tatata</p>
                                        </div>
                                        <div className='forum-screen-last-post-span'>
                                            <p className='last-post-p'>by: </p> <span className='last-post-span-black'>xeqtrTC</span> <span className='last-post-p'>04.22.2022 14:42</span>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
        <Footer />

    </>
  )
}
