import React, {useState} from 'react'
import './Header.css';
import { Link, useLocation, NavLink } from 'react-router-dom';
import {FaUserAlt, FaUserPlus,  } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiLogIn } from 'react-icons/bi';
import { selectCurrentToken, selectCurrentUser } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/authSlice';
import { AnimatePresence, motion ,AnimateSharedLayout } from 'framer-motion';
import { useEffect } from 'react';


function Header({ children, clicked }) {
  const location = useLocation();
  console.log(location);
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const [color, setColor] = useState('');
  console.log(user);
  const [white, setWhite ] = useState(children);

  const changeCololor = (color) => {
    setColor('orange')
  }

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const SubmitHandler = async (e) => {
    e.preventDefault();
     
  }
  return (
    
      
      <>
        <div className='header-container' style={{backgroundColor: `${white ? 'white' : '#181818'}`}}>
          <div className='header-second-container'>
              <div className='header-first-div'>
                <img src={'https://pngimg.com/uploads/red_dead_redemption/small/red_dead_redemption_PNG33.png'} alt='photo' />
              </div>
              <div className={white ? 'test' : 'header-second-div' } >
                <ul>

                  <NavLink to='/' style={({ isActive }) => {
                    return { color: isActive ? 'black' : '#8B8B8B'}
                  }}><li>Homescreen</li></NavLink>

                  <NavLink to='/forum' style={({ isActive }) => {
                    return { color: isActive ? 'black' : '#8B8B8B'}
                  }}><li>Forum</li></NavLink>   

                  <NavLink to='/asease' style={({ isActive }) => {
                    return { color: isActive ? 'black' : '#8B8B8B'}
                  }}><li>Forum</li></NavLink>    

                  <NavLink to='/aseasea' style={({ isActive }) => {
                    return { color: isActive ? 'black' : '#8B8B8B'}
                  }}><li>Forum</li></NavLink>     
                  {
                    user && (
                      <NavLink to='/profile' style={({ isActive }) => {
                        return { color: isActive ? 'black' : '#8B8B8B'}
                      }}><img style={{ height: '1rem'}} src={'https://2img.net/h/images3.kurir.rs/slika-w640/ninda-kornjace-1328585176-89207.jpg'} alt='photo'/></NavLink>
                    )
                  }
                  

                </ul>
              </div>
              <div className={white ? 'test-second' : 'header-third-div'}>
               
                {
                  token ? (
                    <>
                    <span onClick={SubmitHandler}>Logout</span>
                    </> 
                    
                  ) :  (
                  <NavLink to='/login' style={({ isActive }) => {
                    return { color: isActive ? 'black' : '#8B8B8B'}
                  }} >Login</NavLink>                  )
                }
              </div>
          </div>
        </div>
    
    
      </>
        
       
  )
}

export default Header