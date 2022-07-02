import React from 'react'
import './homescreen.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
export default function Homescreen() {
  return (
    <>
        <Header />
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
              <div className='homescreen-news-first'>
                  <div className='homescreen-image'>
                    <img src={'https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.1920x1080.jpg?t=1641233427'} alt='photo' />
                  </div>
                  <div className='homescreen-text'>
                      <div className='homescreen-text-title'>
                        <p>Commanders tatatatata csgo tata</p>
                      </div>
                      <div className='homescreen-text-author'>
                        <span className='homescreen-author'>
                          xeqtrTC
                        </span>
                        <span className='homescreen-timeago'> 9min ago</span>

                      </div>
                      <div className='homescreen-short-desc'>
                        <p>asdffsafsa</p>
                      </div>


                  </div>
              </div>    
              <div className='homescreen-news-first'>
                  <div className='homescreen-image'>
                    <img src={'https://cdn.akamai.steamstatic.com/steam/apps/730/ss_d196d945c6170e9cadaf67a6dea675bd5fa7a046.1920x1080.jpg?t=1641233427'} alt='photo' />
                  </div>
                  <div className='homescreen-text'>
                      <div className='homescreen-text-title'>
                        <p>Commanders tatatatata csgo tata</p>
                      </div>
                      <div className='homescreen-text-author'>
                        <span className='homescreen-author'>
                          xeqtrTC
                        </span>
                        <span className='homescreen-timeago'> 9min ago</span>

                      </div>
                      <div className='homescreen-short-desc'>
                        <p>asdffsafsa</p>
                      </div>
                     


                  </div>
              </div>    
            </div>
          </div>
          <Footer />


    </>
  )
}
