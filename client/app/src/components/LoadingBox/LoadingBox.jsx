import React from 'react'

import './LoadingBox.css';

export default function LoadingBox() {
  return (
    <div className='loader-container'>
        <div className="loader">
            <div className="dot dot1"></div>
            <div className="dot dot2"></div>
            <div className="dot dot3"></div>
            <div className="dot dot4"></div>
        </div>
    </div>
  )
}
