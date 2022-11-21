import React, { useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineArrowRight } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../header/Header'
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader'
import { useDeleteThemeReplyMutation, useGetRepliesPerThemeQuery } from '../../../redux/categoryApi'
import LoadingBox from '../../LoadingBox/LoadingBox'
import { format, parseISO   } from 'date-fns'
import parse from 'html-react-parser'
import Footer from '../../Footer/Footer'
import { RequireRoles } from '../../Hooks/RequireRoles'
import UseAuthHook from '../../Hooks/UseAuthHook'
import EditThemeReply from './EditThemeReply'


export default function ForumSubForumPageView() {
    const [color, setColor] = useState(true)
    const { category , posttitle } = useParams();
    const { username, roles } = UseAuthHook();

    const navigate = useNavigate();
    const {data, isSuccess, error, isLoading} = useGetRepliesPerThemeQuery(posttitle)
    console.log(data);
    const [editReplyTheme, setEditReplyTheme] = useState(false);
    const [editThemeReplyContent, setEditThemeReplyContent] = useState('');
    const [editThemeReplyid, setEditThemeReplyid] = useState('');

    const [DeleteThemeReply] = useDeleteThemeReplyMutation()

    const userWithRequiredRoles = roles?.includes(RequireRoles.Administrator) || roles?.includes(RequireRoles.CommunityManager) || roles?.includes(RequireRoles.Director) || roles?.includes(RequireRoles.HeadAdmin) || roles?.includes(RequireRoles.Admin)

    const deleteThemeReply = async ({theme_replyid, theme_name}) => {
        
        try {
           const { data } = await DeleteThemeReply({theme_replyid,posttitle, theme_name})

           if(data?.message === 'Navigate') {
                navigate(`/forum/${category}`)
           }
           console.log(data);
        } catch (error) {

        }
    }

    const closeThemeFunction = () => {
        setEditThemeReplyContent('');
        setEditThemeReplyid('');
        setEditReplyTheme(false);
    }

    const editThemeFunction = ({theme_replyid, theme_content}) => {
        setEditThemeReplyContent(theme_content);
        setEditThemeReplyid(theme_replyid)
        setEditReplyTheme(true);
    }

    let editReplyThemeButton = null;
    if(editReplyTheme) {
        editReplyThemeButton = (
            <EditThemeReply editThemeReplyContent={editThemeReplyContent} editThemeReplyid={editThemeReplyid} closeThemeFunction={closeThemeFunction} />
        )
    }

    const buttonsCombined = (
        <>
        {editReplyThemeButton}
        </>
    )
    let content;

    if(isLoading) content = <LoadingBox />;

    if(error) content = <p>{error?.data?.message}</p>

    if(isSuccess) {


        content = (
            <>
            {buttonsCombined}
        <Header children={color} />
        <div className='forum-screen-container'>
                              <PhotoAfterHeader />
                              <div className='forum-page-first'>
                                  <div className='forum-page-full'>
                                      <span>{category}</span> <AiOutlineArrowRight /> <span className='spantitle'>Page</span> <AiOutlineArrowRight /> <span className='spantitle'>{posttitle}</span>
                                  </div>
                              </div>
                                
                              <div className='forum-userby-posts-container'>
                                  <div className='postbyuser-button'>
                                     
                                      <div className='openmenu'>
                                        
                                        
                                      </div>
                                  </div>
                                  

                                    
                                      {
                                        data?.map((item) => {
                                            const { postnumber, theme_replyid, username, theme_replyusername, theme_title, theme_content, theme_name, theme_date, image} = item
                                            return (
                                                <div className='postbyuser-post' key={theme_replyid}>
                                                            <div className='postbyuser-leftside'>
                                                                <div className='leftside-username'>
                                                                    <Link to={`/forum/userprofile/${username}`}><span>{username}</span></Link>
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
                                                                <p>{theme_title}</p>
                                                                <p className='postbyuser-date'>{format(parseISO(theme_date), "MMMM Qo, yyyy, H:m a")}</p> 
                                                                </div>
                                                                <div className='postbyuser-content-title-edit'>
                                                                    {
                                                                        userWithRequiredRoles ? (
                                                                            <>
                                                                                <AiFillDelete onClick={() => deleteThemeReply({theme_replyid, theme_name})} />
                                                                                <AiFillEdit onClick={() => editThemeFunction({theme_replyid, theme_content})}/>
                                                                            </>
                                                                            ) : null
                                                                    }

                                                                </div>
                                                            </div>
                                                            
                                                            <div className='postbyuser-content-content'>
                                                                    <div className="">{parse(theme_content)}</div>
                                                                </div>
                                                                
                                                            </div>
                        
                                                        </div>
                                            )
                                        })
                                      }
                                  
                                    
                              </div>
                           
                          </div>
                          <Footer />
       
        </>
        )
    }

    return content;
}
