import React, { useState } from 'react'
import './homescreen.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import { useNewsListQuery } from '../../redux/usersApi/usersApi';
import LoadingBox from '../LoadingBox/LoadingBox';
import { format,parseISO,  add    } from 'date-fns'
import { Link } from 'react-router-dom';

export default function Homescreen() {
  const { data, isSuccess, isLoading, error } = useNewsListQuery();

  const [clicked, setClicked] = useState(true);

  const today = new Date();
  const addtays = 5;

  const resultacab = today.setDate(today.getDate() + addtays);
  
  console.log(add(new Date(), {
    days: 7
  }));
  let content;

  if(isLoading) {
      content = <LoadingBox />
  }

  if(isSuccess) {
      content = (
        <>
        <Header color={clicked}/>
          <div className='homescreen-container'>
            <div className='homescreen-second-container'>
                <div className='homescreen-header'>
                  <p className='blog-big-text'>
                    The Conjured
                  </p>
                  <p className='blog-text'>
                    Value loyalty above everything else
                  </p>
              </div>
              
            </div>
            <div className='homescreen-news'>
              {
                data?.map((item) => {
                  const { n_id, n_title, n_shortdesc, n_username, n_description, n_date } = item;
                  return (
                      <div className='homescreen-news-first' key={n_id}>
                    <div className='homescreen-image'>
                      <img src={'https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.1920x1080.jpg?t=1641233427'} alt='photo' />
                    </div>
                    <div className='homescreen-text'>
                        <div className='homescreen-text-title'>
                          <Link to={`${n_title}`}><p>{n_title}</p></Link>
                        </div>
                        <div className='homescreen-text-author'>
                          <span className='homescreen-author'>
                            {n_username}
                          </span>
                          <span className='homescreen-timeago'>{format(parseISO(n_date), "MMMM Qo, yyyy")}</span>

                        </div>
                        <div className='homescreen-short-desc'>
                          <p>{n_shortdesc}</p>
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
