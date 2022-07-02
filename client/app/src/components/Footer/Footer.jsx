import React from 'react'
import { BsFacebook, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { RiInstagramLine } from 'react-icons/ri';
import { FaLinkedinIn, FaFacebookF} from 'react-icons/fa'
import { AiFillTwitterCircle} from 'react-icons/ai';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-second-container'>
            <div className='footer-first-div'>
                <p className='footer-clanname'>The Conjured</p>
                <p className='footer-clandesc'>The Conjured started of as a group of friends having hanging out together, before they officialy gathered behind a name and structured themselves fully in 2014. A small but powerful tight knit group where loyalty is rewarded and everybody is equally involved in every aspect of decision making.</p>
                <div className='footer-first-div-icons'>
                    <FaFacebookF />
                    <RiInstagramLine className='margin-left' />
                    <FaLinkedinIn className='margin-left' />
                    <BsTwitter className='margin-left' />
                </div>
            </div>
            <div className='footer-second-div'>
                <p className='footer-p'>Contact</p>

                <p className='footer-second-p'>theconjured@gmail.com</p>
                <p  className='footer-second-p'>If you need us we will find you.</p>

            </div>
            <div className='footer-third-div'>
                <p className='footer-p'>Navigation</p>

                <p className='footer-second-p'>Blog</p>
                <p  className='footer-second-p'>Forum</p>
                <p  className='footer-second-p'>About us</p>
                <p  className='footer-second-p'>Support</p>



            </div>
            <div className='footer-fourth-div'>
                <p className='footer-p'>Subscribe to new blog posts</p>

                <input type='text' placeholder='Enter your email address'></input>
                <button>Subscribe</button>


            </div>
        </div>
        <div className='footer-third-container'>
            <div className='footer-third-container-div'>
               <span className='third-right-border'>&copy; 2022 The Conjured</span>
               <span className='third'>All Rights reserved</span>

            </div>
            <div className='footer-third-container-second-div'>
               <span className='footer-second-p'>Privacy policy</span>
               <span className='footer-second-p'>Terms of Service</span>

            </div>
        </div>
    </div>
  )
}
