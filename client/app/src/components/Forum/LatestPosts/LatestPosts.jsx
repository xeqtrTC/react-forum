import React, { useState, useRef } from 'react';
import Header from '../../header/Header';
import {  Link } from 'react-router-dom';
import { TbBrandPagekit } from 'react-icons/tb';
import Footer from '../../Footer/Footer';
import { useGetLatestPostsQuery,} from '../../../redux/categoryApi';
import LoadingBox from '../../LoadingBox/LoadingBox';

import { format,  parseISO   } from 'date-fns'

import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';

import NewPostFeature from '../NewPostFeature/NewPostFeature';
import { FaLock } from 'react-icons/fa';

export default function LatestPosts() {

    const [color, setColor] = useState(true);


    const { data, isLoading, isSuccess, error } = useGetLatestPostsQuery();

    console.log(data);
    


    let content;

    if(isLoading) (
        content = <LoadingBox />
    )


    if(isSuccess) {


        content = (
            <>
            <Header children={color} />
                <div className='forum-page-container'>
                    <PhotoAfterHeader />
                    <NewPostFeature />

                    <div className='forum-page-second-container'>




                <div className='forum-page-posts'>
                    <div className='forum-page-topic'>
                        <p>Topic</p>
                        <p>Last post</p>
                    </div>
                    {data?.length === 0 && <p>There isn't any posts yet.</p>}
                    <div className='forum-page-real-post'>

                    {
                        data?.map((item) => {
                            const { isLocked, category, posttitle, postusername, postdate, postid} = item;


                            return (
                        
                                    <div className='forumpage-div-test' key={postid}>
                                            <div className='forum-page-icon'>
                                            {
                                                isLocked === 1 ? <FaLock /> :  <TbBrandPagekit />
                                            }
                                            </div>
                                            <div className='forum-page-title'>
                                                <div className='forum-page-title-link'>
                                                    <Link to={`/forum/${category}/${posttitle}`} state={isLocked}> <p className='community-category-name'>{posttitle} </p></Link> 
                                                    
                                                </div>
                                                <span className='forum-page-by'>by:</span> <Link to={`/forum/userprofile/${postusername}`}><span className='forum-page-user'>{postusername}</span></Link> <span className='forum-page-by'>{format(parseISO(postdate), "MMMM Qo, yyyy, H:m a")}</span>
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
            </div>
            
            <Footer />
            </>
        )

    }
        

                
            
           

  return content;
}
