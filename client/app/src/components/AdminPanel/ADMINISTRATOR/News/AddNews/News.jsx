import React, { useState } from 'react';
import LeftSide from '../../../LeftSide/LeftSide';
import Navbar from '../../../Navbar/Navbar';
import { DataGrid, GridToolbarQuickFilter   } from '@mui/x-data-grid';
import { GrEdit } from 'react-icons/gr'

import LoadingBox from '../../../../LoadingBox/LoadingBox';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import './News.css';
import ReactQuillEditor from '../../../../ReactQuillEditor';
import UseAuthHook from '../../../../Hooks/UseAuthHook';
import { useAddNewsMutation } from '../../../../../redux/usersApi/usersApi';
import { useEffect } from 'react';
export default function News() {

    const {username} = UseAuthHook();

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [valueForQuill, setValueForQuill] = useState('');

    const [AddNews, { isLoading: addingNewsLoading }] = useAddNewsMutation();

    const [titleOfNews, setTitleOfNews] = useState('');
    const [shortDesc, setShortDesc] = useState('');

    const [homeScreenResult, setHomeScreenResult] = useState(true);
    const [fullPageResult, setFullPageResult] = useState(false);
    
    const homescreenFunction = () => {
        setHomeScreenResult(true);
        setFullPageResult(false);
    }
    const fullPageFunction = () => {
        setFullPageResult(true);
        setHomeScreenResult(false);
    }

    const addNewsFunction = async(e) => {
        e.preventDefault();

        if(titleOfNews && shortDesc && valueForQuill) {
            try {
                await AddNews({valueForQuill, titleOfNews, shortDesc}).unwrap();
                setSuccess('You added one more news!')
                setValueForQuill('');
                setTitleOfNews('');
                setShortDesc('');
            } catch (error) {
                console.log(error);
            }
        } else {
            setError('Values are empty!')
        }
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            setSuccess('')
        }, 4000)

        return () => clearTimeout(timer);

    }, [success])

    useEffect(() => {

        const timer = setTimeout(() => {
            setError('')
        }, 4000)

        return () => clearTimeout(timer);

    }, [error])
    

  return (
    <div className='admin-wrapper' style={{display: 'flex'}}>
        <LeftSide />

        <div className='admin-navbar-wrapper' style={{width: '100%'}}>
            <Navbar />
            <div className='admin-userslist-container' style={{padding: '1rem',  backgroundColor: '#F9FAFC'  , height: '100vh'}}>
                <div className='admin-news-grid'>
                    {
                        success && (
                            <div className='added-news'>
                                {success}
                            </div>
                        )
                    }
                    {
                        error && (
                            <div className='error-news'>
                                {error}
                            </div>
                        )
                    }
                    <form onSubmit={addNewsFunction}>
                    <div className='added-news-button'>
                        <button>{addingNewsLoading ? 'Adding news' : 'Add news'}</button>
                    </div>
                    <div className='admin-news-first-container'>
                        <div className='admin-news-first-div-width'>
                            <span>Title of news</span>
                        </div>
                        <input type='text' value={titleOfNews} className='admin-news-title' onChange={(e) => setTitleOfNews(e.target.value)} />
                    </div>
                    <div className='admin-news-first-container'>
                        <div className='admin-news-first-div-width'>
                            <span>Short description</span>
                        </div>
                        <input type='text' value={shortDesc} className='admin-news-shortdesc' onChange={(e) => setShortDesc(e.target.value)} />
                    </div>
                    <div className='admin-news-second-container'>
                        <ReactQuillEditor setValueForQuill={setValueForQuill} valueForQuill={valueForQuill} />
                    </div>
                    </form>

                    <div className='admin-news-second-container'>
                        <div className='admin-news-second-options'>
                            Preview of the page:
                            <button style={{marginLeft: '1rem'}} onClick={homescreenFunction}>Home screen example</button>
                            <button style={{marginLeft: '1rem'}} onClick={fullPageFunction}>Full page example</button>
                        </div>



                        {
                            homeScreenResult && (
                                <div className='homescreen-news-first-admin'>
                                    <div className='homescreen-image'>
                                        <img src={'https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.1920x1080.jpg?t=1641233427'} alt='photo' />
                                    </div>
                                    <div className='homescreen-text'>
                                        <div className='homescreen-text-title'>
                                            <p>{titleOfNews}</p>
                                        </div>
                                        <div className='homescreen-text-author'>
                                            <span className='homescreen-author'>
                                            {username}
                                            </span>
                                            <span className='homescreen-timeago'> 9min ago</span>

                                        </div>
                                        <div className='homescreen-short-desc'>
                                            <p>{shortDesc}</p>
                                        </div>
                                        


                                    </div>
                                </div> 
                            )
                        }
                        {
                            fullPageResult && (
                                <div className='fullpage-result'>
                                    {parse(valueForQuill)}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
