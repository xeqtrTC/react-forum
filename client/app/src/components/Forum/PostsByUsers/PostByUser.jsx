import React, { useState } from 'react'
import Header from '../../header/Header'
import LoadingBox from '../../LoadingBox/LoadingBox';
import Footer from '../../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../../redux/authSlice';
import { useGetPostsPerTitleQuery, usePostPostbyUserMutation } from '../../../redux/categoryApi';
import './PostByUser.css';
import { useEffect } from 'react';
import Pagination from '../Pagination/Pagination';

export default function PostByUser() {
    const dispatch = useDispatch();
    const { category, title } = useParams();
    const user = useSelector(selectCurrentUser);
    const [text, setText] = useState('');
    const navigate = useNavigate()
    console.log( user, text, title );
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);


    const [postPostbyUser] = usePostPostbyUserMutation();

    const { data, isLoading, isError } = useGetPostsPerTitleQuery(title);

    console.log(data);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.slice(indexofFirstPost, indexOfLastPost);
    console.log(currentPosts);
    const PostbyUser = async (e) => {
        e.preventDefault();

        try {
            console.log('ulazim')
            const post = await postPostbyUser({ user, text, title }).unwrap();
            console.log(post);
            setText('');
            // dispatch(data);
            // navigate(`/forum/${category}/${title}`)



        } catch (error) {
            console.log(error);
        }

    }
    const Paginate = (pageNumber) => setCurrentPage(pageNumber);
    // useEffect(() => {
    //     data
    // }, [postPostbyUser])
    
  
    const [color, setColor] = useState(true)
  return (
    <>
        <Header children={color} />
        {
            isLoading ? (
                <LoadingBox />
            ) : (
                <>
                <div className='forum-screen-container'>
                          <div className='forum-screen-banner'>
                              <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
                          </div>
                          <div className='forum-page-first'>
                              <div className='forum-page-full'>
                                  <span>{category}</span> <AiOutlineArrowRight /> <span className='spantitle'>{title}</span>
                              </div>
                          </div>

                          <div className='forum-userby-posts-container'>
                              <div className='postbyuser-button'>
                                  <button>Post a reply</button>
                              </div>
                                <div className='pagination-container-searchperpost'>
                                    <Pagination  postsPerPage={postsPerPage} totalPosts={data?.length} paginate={Paginate} />
                                </div>
                              {
                                currentPosts?.map((text) => {
                                    return (
                                        <div key={text.replyid} className='postbyuser-post' >
                                        <div className='postbyuser-leftside'>
                                            <div className='leftside-username'>
                                                <span>{text.reply_username}</span>
                                            </div>
                                            <div className='postbyuser-avatar'>
                                                <img src={'https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.1920x1080.jpg?t=1641233427'} alt='photo' />
      
                                            </div>
                                            <div className='postbyuser-posts'>
                                                <span>Posts:</span> <span>{text.postnumber}</span>
                                            </div>
                                        </div>
                                        <div className='postbyuser-content'>
      
                                        <div className='postbyuser-content-title'>
                                              <p>{text.reply_post}</p>
                                          </div>
                                          <div className='postbyuser-content-content'>
                                            <div className="post__description" dangerouslySetInnerHTML={{ __html: text.reply_content}}  />
                                              </div>
                                        </div>
      
                                    </div>
                                    )
                                })
                              }
                              
                                
                          </div>
                        <div className='post-reply'>
                            <form onSubmit={PostbyUser}>
                                <div className='post-reply-input'>
                                    <div className='post-reply-first-input'>
                                        <input disabled type='text' placeholder={`${title}`} />
                                    </div>
                                    <div className='post-reply-second-input'>
                                        <textarea type='text' placeholder={`${title}`} onChange={(e) => setText(e.target.value)}  />
                                    </div>
                                </div>   
                                <div className='post-reply-button'>
                                    <button>Submit reply</button>         
                                </div>
                            </form>
                        </div>
                      </div>
                      <Footer />
                      </>
            )
        }
        
    </>

  )
}
