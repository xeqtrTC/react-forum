import React, { useState } from 'react';
import Header from '../../header/Header';
import { AiOutlineFolder } from 'react-icons/ai';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingBox from '../../LoadingBox/LoadingBox';
import './ForumScreen.css';
import { useGetCategoriesQuery } from '../../../redux/categoryApi';
import { selectCurrentUser } from '../../../redux/authSlice';
export default function ForumScreen() {
    const [color, setColor] = useState(true)
    const user = useSelector(selectCurrentUser)
    console.log(user); 
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const slicedData = data?.slice(0,3);
    const secondSlicedData = data?.slice(3, 8);
    console.log(slicedData)
    console.log(data);
    console.log(isLoading);
  return (
    <>
        {
            isLoading && <LoadingBox />
        }
        <Header children={color} />
        <div className='forum-screen-container'>

            <div className='forum-screen-banner'>
                <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
            </div>
            <div className='forum-screen-posts-container'>
                <div className='forum-screen-posts'>
                    <div className='forum-screen-big-post'>
                        <span>Community rules</span>
                    </div>
                    {
                            isError ? (
                                <p>{isError}</p>
                            ) : (
                                slicedData?.map((categories) => {
                                    const { cid, title, description } = categories
                                    return (
                                        <div className='forum-screen-total-posts' key={cid}>
                                            <div className='forum-screen-total-posts-icon'>
                                                <AiOutlineFolder />
                                            </div>
                                            <div className='forum-screen-category-name'>
                                                <p className='community-category-name'><Link to={`/forum/${title}`}>{title}</Link></p>
                                                <p className='community-less-size'>{description}</p>
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
                            )
                    }
                </div>
                <div className='forum-screen-posts'>
                    <div className='forum-screen-big-post'>
                        <span>Gaming stuff</span>
                    </div>
                    {
                        secondSlicedData?.map((category) => {
                           return (
                             <div className='forum-screen-total-posts' key={category.cid}>
                        <div className='forum-screen-total-posts-icon'>
                            <AiOutlineFolder />
                        </div>
                        <div className='forum-screen-category-name'>
                            <p className='community-category-name'><Link to={`/forum/${category.title}`}>{category.title}</Link></p>
                            <p className='community-less-size'>{category.description}</p>
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
