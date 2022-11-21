import React from 'react'

import {   AiFillEdit ,AiFillDelete } from 'react-icons/ai'
import {  Link } from 'react-router-dom';

import { useGetPostsPerTitleQuery, useDeleteReplyByAdminMutation, selectPostById } from '../../../redux/categoryApi';
import './PostByUser.css';
import { format,  parseISO,    } from 'date-fns'
import parse from 'html-react-parser';
import { FaQuoteRight } from 'react-icons/fa';

import UseAuthHook from '../../Hooks/UseAuthHook';
import 'react-quill/dist/quill.snow.css';


export default function PostsByUserPage({ userId, title, isLocked, category, user, addQuote, onClickEditReply, editReplyFunction, userWithRequiredRoles}) {


    const { username, roles } = UseAuthHook();

    const { myPost } =  useGetPostsPerTitleQuery(title, {
        selectFromResult: ({ data}) => ({ myPost: data && selectPostById(data, userId)})
    })

    let requiredRolesButton;
    let canEditReplyButton;
    let canQuoteButton;

    const [DeleteReplyByAdmin] = useDeleteReplyByAdminMutation();
    
 

    if(myPost) {
        const { reply_username, image, postnumber, reply_post, reply_date, replyid, reply_content, e_hwtedited, e_date, e_whoedited } = myPost
        console.log('HOW MANY TIMES', e_hwtedited)
        

        const deleteReplyAdminFunction = async(e) => {
            e.preventDefault();

            try {
                await DeleteReplyByAdmin({replyid});

            } catch (error) {

            }
        }

        if(userWithRequiredRoles) {
            requiredRolesButton = (
                <AiFillDelete onClick={deleteReplyAdminFunction} />
            )
        }

        if(username === reply_username || userWithRequiredRoles ) {
            canEditReplyButton = (
                <AiFillEdit onClick={() => editReplyFunction({reply_content, replyid})} />

            )
        }

        if(username !== reply_username) {
            canQuoteButton = (
                <FaQuoteRight onClick={() => addQuote(reply_content)}>quote</FaQuoteRight>

            )
        }

        const buttonCombined = (
            <>
            {requiredRolesButton}
            {canEditReplyButton}
            {canQuoteButton}
            </>
        )
       

        return (
            <div className='postbyuser-post' >
                                            <div className='postbyuser-leftside'>
                                                <div className='leftside-username'>
                                                    <Link to={`/forum/userprofile/${reply_username}`}><span>{reply_username}</span></Link>
                                                </div>
                                                <div className='postbyuser-avatar'>
                                                <img src={image.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${image}` : 'https://steamuserimages-a.akamaihd.net/ugc/1898849113834216705/2DBAD8646ABEAF1DC65C6EEB148A5EB649FEFB5C/'} alt='photo' />
          
                                                </div>
                                                <div style={{textAlign: 'center'}} >{parse(roles[0])}</div>
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
                                                    {buttonCombined}
                                                    
                                                </div>
                                              </div>
                                             
                                              <div className='postbyuser-content-content'>
                                                    <div className="">{parse(reply_content)}</div>
                                                </div>
                                                {
                                                    e_hwtedited > 0 ? (
                                                        <div className='postbyuser-edited-container'>
                                                            <span>Last edited by {e_whoedited} on {format(parseISO(e_date), "do MMM, H:m a")}, edited {e_hwtedited} times in total.</span>
                                                        </div>
                                                    ) : null
                                                }
                                                
                                            </div>
          
                                        </div>
        )
    } else return null
    
                                            
                                   








}
