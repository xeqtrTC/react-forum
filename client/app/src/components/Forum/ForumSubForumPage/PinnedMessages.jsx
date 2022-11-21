import React, { useState } from 'react'
import { AiFillDelete,  AiOutlineArrowRight } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {  useGetpinnedthemepercategoryrepliesQuery, useDeleteContentPerPinnedMessageMutation } from '../../../redux/categoryApi'
import Footer from '../../Footer/Footer'
import Header from '../../header/Header'
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader'
import { format,  parseISO   } from 'date-fns'
import parse from 'html-react-parser'
import UseAuthHook from '../../Hooks/UseAuthHook'
import { RequireRoles } from '../../Hooks/RequireRoles'
export default function PinnedMessages() {
    const { category, subtitle, pinnedtitle } = useParams();
    const [color, setColor] = useState(true);
    const {username, roles} = UseAuthHook();
    const navigate = useNavigate();
    const { data: pinnedThemeData, isSuccess: isSuccessPineed} = useGetpinnedthemepercategoryrepliesQuery(pinnedtitle)
    const filteredData = pinnedThemeData?.filter((item) => item.pinned_title === pinnedtitle);
    console.log('TITLE', pinnedtitle);
    const userWithRequiredRoles = roles?.includes(RequireRoles.Administrator) || roles?.includes(RequireRoles.CommunityManager) || roles?.includes(RequireRoles.Director) || roles?.includes(RequireRoles.HeadAdmin) || roles?.includes(RequireRoles.Admin)
    const [DeleteContentPerPinnedMessage] = useDeleteContentPerPinnedMessageMutation() 

    const deletePinnedThemeReply = async({pinnedtheme_r_id}) => {
        
        try {
            const {data} = await DeleteContentPerPinnedMessage({pinnedtheme_r_id, pinnedtitle})
            
            if(data?.message === 'Navigate') {
                navigate(`/forum/${category}/subforum/${subtitle}`)
            }
        } catch (error) {
            console.log(error)
        }
        console.log('acab', pinnedtheme_r_id)
    }

    let requiredRolesButton = null;
    if(userWithRequiredRoles) {
        requiredRolesButton = (
            <AiFillDelete onClick={deletePinnedThemeReply} />
        )
    }

    // if(username === reply_username || userWithRequiredRoles ) {
    //     canEditReplyButton = (
    //         <AiFillEdit onClick={() => editReplyFunction({reply_content, replyid})} />

    //     )
    // }

    // if(username !== reply_username) {
    //     canQuoteButton = (
    //         <FaQuoteRight onClick={() => addQuote(reply_content)}>quote</FaQuoteRight>

    //     )
    // }

    const buttonCombined = (
        <>
        {requiredRolesButton}
        </>
    )
    
console.log(pinnedThemeData)
let content;

    if(isSuccessPineed) {
        content = (
            <>
            <Header children={color} />
                
                            <div className='forum-screen-container'>
                                      <PhotoAfterHeader />
                                      <div className='forum-page-first'>
                                          <div className='forum-page-full'>
                                              <span>{category}</span> <AiOutlineArrowRight /> <span className='spantitle'>{subtitle}</span> <AiOutlineArrowRight /> <span className='spantitle'>{pinnedtitle}</span> 
                                          </div>
                                      </div>
                                        
                                      <div className='forum-userby-posts-container'>
                                          <div className='postbyuser-button'>
                                            {/* <img src='https://wallpaperaccess.com/full/2864921.jpg' style={{width: '100%', height: '15rem', objectFit: 'cover'}} /> */}
                                           
                                              {/* <div className='openmenu'>
                                                <GoThreeBars onClick={() => setIsOpenMenu(!isOpenMenu)}/>
                                                {
                                                    isOpenMenu ? (
                                                    <div className='openmenu-container'>
                                                        <ul>
                                                            {
        
                                                                isLockedPost.isLocked === 1 ? <li onClick={setIsUnlockedMenu}><AiFillLock /> Unlock the post</li> : <li onClick={setIsLockedMenu}><AiFillLock /> Lock the post</li>
        
                                                            }
                                                           
                                                            <li onClick={onClickLazyQuery}><HiOutlineFolderRemove /> Move post to another category</li>
                                                            <li onClick={onClickLazyQueryTwo}><HiOutlineFolderRemove />Move post to ANY subforum</li>
                                                            <li>Lock the post</li>
                                                            <li>Lock the post</li>
                                                            <li>Lock the post</li>
        
                                                        </ul>
                                                    </div>
                                                    ) : null
                                                }
                                                
                                              </div> */}
                                          </div>
                                            {/* <div className='pagination-container-searchperpost'>
                                                <Pagination  postsPerPage={postsPerPage} totalPosts={data?.length} paginate={Paginate} />
                                            </div> */}
        
                                              
                                              {/* <button onClick={onClickLazyQuery} >test</button> */}
                                            {
                                                pinnedThemeData?.map((item) => {
                                                    const { pinnedtheme_pinned_title, pinnedtheme_username, pinnedtheme_date, pinnedtheme_content, postnumber, image, pinnedtheme_r_id } = item;
                                                    return (
                                                        <div className='postbyuser-post' key={pinnedtheme_r_id}>
                                                            <div className='postbyuser-leftside'>
                                                                <div className='leftside-username'>
                                                                    <Link to={`/forum/userprofile/${pinnedtheme_username}`}><span>{pinnedtheme_username}</span></Link>
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
                                                                <p>{pinnedtheme_pinned_title}</p>
                                                                <p className='postbyuser-date'>{format(parseISO(pinnedtheme_date), "MMMM Qo, yyyy, H:m a")}</p> 
                                                                </div>
                                                                <div className='postbyuser-content-title-edit'>
                                                                    {/* {buttonCombined} */}
                                                                    <AiFillDelete onClick={() => deletePinnedThemeReply({pinnedtheme_r_id})} />

                                                                </div>
                                                            </div>
                                                            
                                                            <div className='postbyuser-content-content'>
                                                                    <div className="">{parse(pinnedtheme_content)}</div>
                                                                </div>
                                                                {/* {
                                                                    e_hwtedited > 0 ? (
                                                                        <div className='postbyuser-edited-container'>
                                                                            <span>Last edited by {e_whoedited} on {format(parseISO(e_date), "MMMM Qo, yyyy, H:m a")}, edited {e_hwtedited} times in total.</span>
                                                                        </div>
                                                                    ) : null
                                                                }
                                                                 */}
                                                            </div>
                        
                                                        </div>
        
                                                    )
                                                })
                                            }
                                         
                                            
                                      </div>
                                    {/* <div className='post-reply'>
                                        {
                                            isLockedPost.isLocked === 1 ? <div className='locked-container'><p>This page is locked.</p> </div> : 
                                            <form onSubmit={PostbyUser}>
                                            <div className='post-reply-input'>
                                                <div className='post-reply-first-input'>
                                                    <input disabled type='text' placeholder={`${title}`} />
                                                </div>
                                                <div className='post-reply-second-input'>
                                                    <textarea type='text' value={text} placeholder={`${title}`} onChange={changeTextValue}  />
                                                </div>
                                            </div>   
                                            <div className='post-reply-button'>
                                                <button>Submit reply</button>         
                                            </div>
        
                                        </form>
                                        }
                                       
                                    </div> */}
                                    {/* {
                                        roles[0].Administrator > 0 ? 
                                        <div className='lock-the-post'>
                                        {
                                            isLockedPost.isLocked ? <button onClick={() => setOnClickUnlock(true)}>Unlock this page</button> : <button onClick={() => setOnClickOpen(!onClickOpen)}>Lock this topic</button>
                                        }
                                        
                                     
                                        </div>
        
                                        :
        
                                        null
                                    } */}
                                  </div>
                                  <Footer />
                                  </>
        )
    }
  return content
}
