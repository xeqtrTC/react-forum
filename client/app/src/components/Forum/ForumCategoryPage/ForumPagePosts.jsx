import React from 'react'
import {  useGetPostsPerCategoryQuery } from '../../../redux/categoryApi';
import { FaLock } from 'react-icons/fa'
import { selectPostById } from '../../../redux/categoryApi'
import { TbBrandPagekit } from 'react-icons/tb';
import { Link } from 'react-router-dom'
import { format,  parseISO  } from 'date-fns'


function ForumPagePosts({ userId, category }) {
    const emptyArr = [];

    const { myPost } = useGetPostsPerCategoryQuery(category, { 
      selectFromResult: ({ data }) => ({ myPost: data && selectPostById(data, userId) }  ) ?? emptyArr
    })
    
    console.log('feasfaesfasfasefas',myPost);
    let user;
    if(myPost) {
        return (
            <div className='forumpage-div-test'>
                                    <div className='forum-page-icon'>
                                    {
                                        myPost.isLocked === 1 ? <FaLock /> :  <TbBrandPagekit />
                                    }
                                    </div>
                                    <div className='forum-page-title'>
                                        <div className='forum-page-title-link'>
                                            <Link to={`/forum/${myPost.category}/${myPost.posttitle}`} state={myPost.isLocked}> <p className='community-category-name'>{myPost.posttitle} </p></Link> 
                                            
                                        </div>
                                        <span className='forum-page-by'>by:</span> <Link to={`/forum/userprofile/${myPost.postusername}`}><span className='forum-page-user'>{myPost.postusername}</span></Link> <span className='forum-page-by'>{format(parseISO(myPost.postdate), "do MMM, H:m a")}</span>
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
    } else return null
 
}

export default ForumPagePosts