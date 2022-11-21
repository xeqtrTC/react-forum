import React, { useState } from 'react'
import { GoThreeBars } from 'react-icons/go';
import { Link } from 'react-router-dom';


import './NewPostFeature.css';
export default function NewPostFeature() {

    const [shown, setShown] = useState(false);

  return (
    <div className='newpost-container'>
        <div className='newpost-width'>
            <GoThreeBars onClick={() => setShown(!shown)} />
        </div>
        <div className='newpost-shown-div'>
            {
                shown && (
                    <div className='newpost-absolute'>
                        <div className='newpost-text'>
                            <Link to='/forum/latestposts'>
                            <div className='newpost-text-hover'>
                                <div className='newpost-text-hovered-to'>
                                    <span>New posts</span>
                                </div>
                            </div>
                            </Link>
                            

                        </div>
                    </div>
                )
            }
        </div>
        
    </div>
  )
}
