import React, { useState } from 'react'
import Footer from '../Footer/Footer';
import Header from '../header/Header'

import './Unknown.css';
export default function UnknownRoute() {
  const [color, setColor] = useState(true);
  return (
    <>
          <Header children={color}/>
        <div className='unknown-container'>
          <img src='https://stories.freepiklabs.com/storage/23103/404-error-rafiki-2773.png' alt="photo" />
          </div>
          <Footer />
    </>
  )
}
