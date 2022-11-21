import React, { useState} from 'react'
import Footer from '../../Footer/Footer';
import Header from '../../header/Header';
import { useParams, Link } from 'react-router-dom';
import PhotoAfterHeader from '../PhotoAfterHeader/PhotoAfterHeader';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useTokenQueryForEmailVerificationQuery } from '../../../redux/usersApi/usersApi';

import './VerificationEmail.css';
export default function VerificationEmail() {


  const [color, setColor] = useState(true)
  const { token } = useParams();

  const { data, isLoading, isError} = useTokenQueryForEmailVerificationQuery(token);
  console.log(token);
  console.log(isError);
  console.log(isLoading);
  console.log(data?.error);

  
  return (
    <>
      {
        isError ? (
          <>
            <Header children={color} /><PhotoAfterHeader />
            <div className='verify-container'>

              <div className='verify-icon-false'>

                <AiOutlineCloseCircle />

              </div>

              <div className='border-line'></div>

              <div className='verify-emailconfirmed'>

                <p>Invalid token, please check your email and click on the 'Activate account' </p>



              </div>
              

            </div>
            <Footer />
          </>
    
        ) : (
          <>
          <Header children={color} /><PhotoAfterHeader /><div className='verify-container'>

              <div className='verify-icon'>

                <AiOutlineCheckCircle />

              </div>

              <div className='border-line'></div>

              <div className='verify-emailconfirmed'>

                <p>Your email has been activated </p>



              </div>
              <div className='verify-loginnow'>

                <Link to='/login'><button>Login</button></Link>



              </div>

            </div><Footer />
            </>
        )
      }
    </>
  )
}
