import React, {useState} from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import {FaUserAlt, FaUserPlus,  } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi';
import { selectCurrentUser } from '../../redux/authSlice';
import { useLogoutQuery } from '../../redux/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/authSlice';
import { AnimatePresence, motion ,AnimateSharedLayout } from 'framer-motion';


function Header({ children }) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  console.log(children);
  const [white, setWhite ] = useState(children);
  const { data } = useLogoutQuery()

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const SubmitHandler = async (e) => {
    e.preventDefault();
     
    dispatch(logOut({data}));
  }
  return (
    <><>
      {/* <div className='header-above'>
      
    </div> */}
      <AnimatePresence>

        {login && (
          <motion.div className='forms-logins-register'
            initial={{ backgroundColor: 'black', opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className='login-form'
              transition={{ duration: 2 }}
            >
              <motion.button
                whileHover={{ scale: 1.3 }}
                transition={{ type: 'spring', stifness: 120 }}
                whileTap={{ scale: 0.9 }}
                className='text-exit'
              >
                <AiOutlineCloseCircle onClick={() => setLogin(false)} />
              </motion.button>
              <div className='login-input-first'>
                <div className='login-input'>

                  <div className='login-input-text'>
                    <input name='username' type='text'></input>
                  </div>
                  <div className='login-input-text'>
                    <input name='password' type='text'></input>
                  </div>
                  <div className='login-input-button'>
                    <motion.button className='button-submit'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stifness: 120 }}

                    > <BiLogIn /> <span>Login</span></motion.button>

                  </div>

                </div>

              </div>


            </motion.div>

          </motion.div>
        )}



      {register && (
        <motion.div className='forms-logins-register'
          initial={{ backgroundColor: 'black', opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className='login-form-register'
              initial={{ backgroundColor: 'white', opacity: 1 }}


            
          >
            <motion.button
              whileHover={{ scale: 1.3 }}
              transition={{ type: 'spring', stifness: 120 }}
              whileTap={{ scale: 0.9 }}
              className='text-exit'
            >
              <AiOutlineCloseCircle onClick={() => setRegister(false)} />
            </motion.button>
            <div className='login-input-first-register'>
              <div className='login-input-register'>

                <div className='login-input-text-register'>
                  <input name='username' placeholder='Username' type='text'></input>
                  <input name='password' placeholder='Email' type='text'></input>
                </div>
                <div className='login-input-text-second'>
                  <input type='password' placeholder='Password'></input>
                  <input type='password' placeholder='Repeat password'></input>

                </div>

                

              </div>

            </div>


          </motion.div>

        </motion.div>
      )}
            </AnimatePresence>

    </>

        <div className='header-container' style={{backgroundColor: `${white ? 'white' : '#181818'}`}}>
          <div className='header-second-container'>
              <div className='header-first-div'>
                <img src={'https://pngimg.com/uploads/red_dead_redemption/small/red_dead_redemption_PNG33.png'} alt='photo' />
              </div>
              <div className={white ? 'test' : 'header-second-div' } >
                <ul>
                  <Link to='/'><li>Homescreen</li></Link>
                  <Link to='/forum'><li>Forum</li></Link>
                  <li>About us</li>
                  <li>Support</li>
                </ul>
              </div>
              <div className={white ? 'test-second' : 'header-third-div'}>
                {
                  user ? <span onClick={SubmitHandler}>Logout</span> : <Link to='/login'>Login</Link>
                }
              </div>
          </div>
        </div>
    
    
      </>
        
       
  )
}

export default Header