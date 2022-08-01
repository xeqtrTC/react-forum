import React, { useState, useEffect } from 'react'
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { useGetPostsPerUserQuery } from '../../../redux/categoryApi';
import { format, formatDistance, formatRelative, subDays, parseISO, compareAsc   } from 'date-fns'
import './SearchPostPerUser.css';
import LoadingBox from '../../LoadingBox/LoadingBox';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/authSlice';
import Pagination from '../Pagination/Pagination';
export default function SearchPostPerUser() {
    const username = useSelector(selectCurrentUser);
    
    const [color, setColor] = useState(true)
    const {data, isError, isLoading} = useGetPostsPerUserQuery(username)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState()
    useEffect(() => {
        setItems(data);
    }, [items, data])

    const filterItems = (e) => {
        const filteredProducts = data?.filter((item) => {
            return item.reply_post.toLowerCase().includes(keyword.toLowerCase());
        })
        setItems(filteredProducts);
    }

    useEffect(() => {
        filterItems();
    }, [keyword])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = items?.slice(indexofFirstPost, indexOfLastPost);
    console.log(currentPosts);

    const Paginate = (pageNumber) => setCurrentPage(pageNumber);

    return ( 
    <>
    <Header children={color} />
    <div className='forum-screen-banner'>
        <img src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/095b362d-6c4d-4adf-9498-3d8d07222a75/dd1zpsf-dcf62d69-2293-4414-9bec-06501030a63f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA5NWIzNjJkLTZjNGQtNGFkZi05NDk4LTNkOGQwNzIyMmE3NVwvZGQxenBzZi1kY2Y2MmQ2OS0yMjkzLTQ0MTQtOWJlYy0wNjUwMTAzMGE2M2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N6w-J219M04z0iMWGMLEvgRWvxqeJlFwqtaOhhbfKQg'} alt='photo' />
    </div>
        {
            isLoading ?  (
                <LoadingBox />
            ) : (
                isError ? (
                    <p>{isError}</p>
                ) : (
                    items?.length === 0 ? (
                        <>
                        <div className='grey-zone'>
                            <div className='grey-zone-90width'>
                                <span>Search found 0 matches</span>
                                <div className='grey-zone-search'>
                                    <input type='text' placeholder='Search posts per user' onChange={(e) => setKeyword(e.target.value)} />
                                </div>
                            </div>

                        </div>
                        <p>There isn't any post, try again</p>
                        </>
                    ) : (
                        <>
                    <div className='grey-zone'>
                    <div className='grey-zone-90width'>
                        <span>Search found {data.length} matches</span>    
                        <div className='grey-zone-search'>
                            <input type='text' placeholder='Search posts per user' onChange={(e) => setKeyword(e.target.value)} />
                        </div>
                    </div>

                </div>
                <div className='searchpost-container'>
                <div className='pagination-container-searchperpost'>
                    <Pagination postsPerPage={postsPerPage} totalPosts={items?.length} paginate={Paginate} />

                </div>

                        {
                            currentPosts?.map((postinfo) => {
                                const { reply_username, reply_date, reply_content, replyid, reply_post} = postinfo;
                                return (
                                    <div className='searchpost-post' key={replyid}>

                            <div className='search-post-leftside'>
                                <div className='search-post-leftside-info'>
                                    <div className='search-post-leftside-info-things'>
                                        <span>by</span> <span className='search-post-user-color'>{reply_username}</span>
                                    </div>
                                    <div className='search-post-leftside-info-things'>
                                        <span></span>
                                    </div>
                                    <div className='search-post-leftside-info-things-forum'>
                                        <span>Forum:</span> <span className='color-name-forum'>great</span>
                                    </div>
                                    <div className='search-post-leftside-info-things'>
                                        <span>Topic:</span> <span className='color-name-forum'>great</span>
                                    </div>
                                </div>
                            </div>
                            <div className='search-post-rightside'>
                                <div className='search-post-rightside-container'>
                                    <span>Re: {reply_post}</span>
                                    <div className='search-post-rightside-info'>
                                        <div className="post__description" dangerouslySetInnerHTML={{ __html: reply_content }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                                )
                            })
                        }

                        


                    </div>
                    </>
                    )
    
                )
            )
        }

       
    
    
    <Footer />
    </>
  )
}
