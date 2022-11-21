import React, { useState } from 'react'
import Header from '../../header/Header';
import { AiOutlineFolder } from 'react-icons/ai';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingBox from '../../LoadingBox/LoadingBox';
import './ForumScreen.css';
import { useGetCategoriesQuery, selectCategoryById } from '../../../redux/categoryApi';
import { selectCurrentUser } from '../../../redux/authSlice';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';


function CommunityRules({ userId }) {
    const user = useSelector(state => selectCategoryById(state, userId))


    if(user) {
        


        return (
                    <>
                <div className='forum-screen-total-posts'>
                    <div className='forum-screen-total-posts-icon'>
                        <AiOutlineFolder />
                    </div>
                    <div className='forum-screen-category-name'>
                        <p className='community-category-name'><Link to={`/forum/${user.title}`}>{user.title}</Link></p>
                        <p className='community-less-size'>{user.description}</p>
                    </div>
                    <div className='forum-screen-last-post'>
                        <div className='forum-screen-last-post-p'>
                        </div>
                        <div className='forum-screen-last-post-span'>
                        </div>

                    </div>
                </div>
                </>
          
        )
    } else return null
 
              
}

export default CommunityRules