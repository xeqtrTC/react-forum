import React from 'react'

import { useGetPostsPerTitleQuery, selectPostById } from '../../../redux/categoryApi';
import { format, parseISO,    } from 'date-fns'

import { BsPencilFill } from 'react-icons/bs'


export default function ForumSubForumPagePostsEntities({ userId, title, isLocked, category, user}) {


    const { myPost } =  useGetPostsPerTitleQuery(title, {
        selectFromResult: ({ data}) => ({ myPost: data && selectPostById(data, userId)})
    })

    console.log(myPost);
    if(myPost) {
        const { reply_username, image, postnumber, reply_post, reply_date, replyid, reply_content } = myPost
        return (
            <div className='postbyuser-post' >
                                            <div className='postbyuser-leftside'>
                                                <div className='leftside-username'>
                                                    <Link to={`/forum/userprofile/${reply_username}`}><span>{reply_username}</span></Link>
                                                </div>
                                                <div className='postbyuser-avatar'>
                                                <img src={image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${image}` : 'https://steamuserimages-a.akamaihd.net/ugc/1898849113834216705/2DBAD8646ABEAF1DC65C6EEB148A5EB649FEFB5C/'} alt='photo' />
          
                                                </div>
                                                <div className='postbyuser-posts'>
                                                    <span>Posts:</span> <span>{postnumber}</span>
                                                </div>
                                            </div>
                                            <div className='postbyuser-content'>
                                            <div className='postbyuser-content-title'>
                                                <div className='postbyuser-content-title-user'>
                                                  <p>{reply_post}</p>
                                                  <p className='postbyuser-date'>{format(parseISO(reply_date), "MMMM Qo, yyyy, H:m a")}</p> 
                                                </div>
                                                 <div className='postbyuser-content-title-edit'>
                                                    {
                                                        isLocked ? null : reply_username === user ? <>
                                                        <Link to={`/forum/${category}/${title}/editpost/${replyid}`}><BsPencilFill title='Edit' /></Link>
                                                        </> : ''
                                                    }
                                                </div>
                                              </div>
                                             
                                              <div className='postbyuser-content-content'>
                                                <div className="post__description" dangerouslySetInnerHTML={{ __html: reply_content}}  />
                                                  </div>
                                            </div>
          
                                        </div>
        )
    } else return null
    
                                            
                                   








}
