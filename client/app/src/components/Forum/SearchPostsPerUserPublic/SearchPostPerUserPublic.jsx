import React, { useState, useEffect } from 'react'
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import {  useGetPublicPostsPerUserQuery } from '../../../redux/categoryApi';
import { format, parseISO   } from 'date-fns'
import LoadingBox from '../../LoadingBox/LoadingBox';
import Pagination from '../Pagination/Pagination';
import { useParams, Link } from 'react-router-dom';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';
import parse from 'html-react-parser';
import { useMemo } from 'react';



export default function SearchPostPerUserPublic() {
    const { username } = useParams();
    console.log(username);
    
    const [color, setColor] = useState(true)
    const { data, isError, isSuccess, error, isLoading} = useGetPublicPostsPerUserQuery(username)
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState()

    const memoizdedData = useMemo(() => data, [data])


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

    console.log(items);

    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexofFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = items?.slice(indexofFirstPost, indexOfLastPost);
    // console.log(currentPosts);

    // const Paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 15;
    const pagesVisited = pageNumber * usersPerPage;
    // const pageCount = Math.ceil(data?.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };


      const displayFilteredItems = memoizdedData?.filter((item) => {
                    if(keyword === "") {
                        return item
                    } else if (
                        item.reply_post.toLowerCase().includes(keyword.toLowerCase())
                    ) {
                        return item
                    }
                    return false;
                }).slice(pagesVisited, pagesVisited + usersPerPage).map((items) => {
                    const { reply_username, reply_date, reply_content, replyid, reply_post, reply_category} = items;
                    return (
                        <div className='searchpost-post' key={replyid}>

                <div className='search-post-leftside'>
                    <div className='search-post-leftside-info'>
                        <div className='search-post-leftside-info-things'>
                            <span className='user-post-leftside-input'>by</span>  <Link to={`/forum/userprofile/${reply_username}`}><span className='search-post-user-color'>{reply_username}</span></Link>

                        </div>
                        <div className='search-post-leftside-info-things-acaaaaaaab'>
                            <span className='date-searchuser-posts'>{format(parseISO(reply_date), "MMMM Qo, yyyy, H:m a")}</span>
                        </div>
                        <div className='search-post-leftside-info-things'>
                            <div className='search-post-leftside-info-things-first-div'>
                                <span>Forum:</span>
                            </div>
                            <div className='search-post-leftside-info-things-second-div'>
                                <Link to={`/forum/${reply_category}`}><span className='color-name-forum'>{reply_category}</span></Link>

                            </div>
                        </div>
                        <div className='search-post-leftside-info-things'>
                            <div className='search-post-leftside-info-things-first-div'>
                                <span>Topic:</span>
                            </div>
                            <div className='search-post-leftside-info-things-second-div'>
                                <Link to={`/forum/${reply_category}/${reply_post}`}><span className='color-name-forum'>{reply_post}</span></Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='search-post-rightside'>
                    <div className='search-post-rightside-container'>
                        <span>Re: {reply_post}</span>
                        <div className='search-post-rightside-info'>
                            <div className="post__description">{parse(reply_content )} </div>
                        </div>
                    </div>
                </div>
            </div>
        )
      })
      console.log(displayFilteredItems);

      const pageCount = Math.ceil(
        memoizdedData?.filter((bulletin) => {
          if (keyword === "") {
            return bulletin;
          } else if (
            bulletin.reply_post.toLowerCase().includes(keyword.toLowerCase())
          ) {
            return bulletin;
          }
          return false;
        }).length / usersPerPage
      );
    
    



    let content;


    if(isLoading) content = <LoadingBox />

    if(error) {
        
        content = (
            <>
                <Header children={color} /><div className='forum-page-container'>
                    <PhotoAfterHeader />
                    <div className='forum-page-first'>
                        
                    </div>


                    <div className='forum-page-second-container'>
                        
                        

                        




                        <div className='forum-page-posts'>
                            {/* <div className='forum-page-topic'>
                                <p>Topic</p>
                                <p>Last post</p>
                            </div>
                            {data?.length === 0 && <p>There isn't any posts yet.</p>}
                            <div className='forum-page-real-post'>

                                {forumPagePostsIds}

                            </div> */}
                            <div className='category-error-messsage'>

                                    <p>{error?.data?.message}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
                </>
        )
    }


    if(isSuccess) {

        const displayPosts = items?.slice(pagesVisited, pagesVisited + usersPerPage)

        content = (
            <>
    <Header children={color} />
        <PhotoAfterHeader />
        {

                displayFilteredItems?.length === 0 ? (
                        <>
                        <div className='grey-zone'>
                            <div className='grey-zone-90width'>
                                <span>Search found 0 matches</span>
                                <div className='grey-zone-search'>
                                    <input type='text' placeholder='Search posts per user' onChange={(e) => setKeyword(e.target.value)} />
                                </div>
                            </div>

                        </div>
                        <div className='searchuserposts-error-messsage'>
                            <div className='searchpost-post'>
                                <p>There isn't any post, try again</p>

                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                    <div className='grey-zone'>
                    <div className='grey-zone-90width'>
                        <span>Search found {keyword ? displayFilteredItems.length : memoizdedData.length} matches</span>    
                        <div className='grey-zone-search'>
                            <input type='text' placeholder='Search posts per user' onChange={(e) => setKeyword(e.target.value)} />
                        </div>
                    </div>

                </div>
                <div className='searchpost-container'>
                    <Pagination pageCount={pageCount} changePage={changePage} />


                       {displayFilteredItems}

                        


                    </div>
                    </>
                    )
    
        }

       
    
    
    <Footer />
    </>
        )

    }









    return content;
}
