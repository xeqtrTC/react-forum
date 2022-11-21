import React, { useState} from 'react'
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './ScreenAfterRegister.css';
export default function ScreenAfterRegister() {
    const [color, setColor] = useState(true)
    const { state } = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        navigate('/login')
        state = '';
    }
    console.log(state);
    return (
    <>
    {
        state ? (
            <>
            <Header children={color}/>
    <div className='screenafterregister-container'>
          <div className='screenafterregister-under'>
            <div className='screenafterregister-image'>
                <img src={'https://www.shareicon.net/data/512x512/2016/11/22/854973_email_512x512.png'} />
            </div>
            <div className='screenafterregister-text'>
                <p className='screenafterregister-verifyemail'>Verify your email</p>
                
                <p className='screenafterregister-verify-text'>We've sent an email to {state.email} to verify your email address and activate your account. The link in the email will expire in 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <button><Link to='/login'>Login please</Link></button>
            </form>



          </div>

      </div>
      <Footer />
            </>
        ) : (
            <>
            <Header children={color}/>
    <div className='screenafterregister-container'>
          <div className='screenafterregister-under'>
            <div className='screenafterregister-image'>
                <img src={'https://www.shareicon.net/data/512x512/2016/11/22/854973_email_512x512.png'} />
            </div>
            <div className='screenafterregister-text'>
                <p className='screenafterregister-verifyemail'>Verify your email</p>
                
                <p className='screenafterregister-verify-text'>Invalid</p>
            </div>
            <form onSubmit={handleSubmit}>
                <button><Link to='/login'>Login please</Link></button>
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
