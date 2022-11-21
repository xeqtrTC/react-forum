import React, {useState} from 'react'
import './Header.css';
import {  useLocation, NavLink, useNavigate } from 'react-router-dom';

import { selectCurrentToken,   } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  useLogoutMutation } from '../../redux/usersApi/usersApi';
import UseAuthHook from '../Hooks/UseAuthHook';


function Header({ children, clicked }) {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const { username, imageResult, roles } = UseAuthHook();
  const dispatch = useDispatch();
  const [color, setColor] = useState('');
  const [user, setUser] = useState(null);
  const [white, setWhite ] = useState(children);

  const changeCololor = (color) => {
    setColor('orange')
  }
console.log(username);
  const webDeveloper = "<p className='webDeveloper'>WEB</p>" 
  const communityManager = "<p className=''>Community Manager</p>"
  const director = "<p className=''>Director</p>";
  const headAdmin = "<p className='registeredRed'>Head Admin</p>";
  const admin = 'Admin';

  const userWithRequiredRoles = roles?.includes(webDeveloper) || roles?.includes(communityManager) || roles?.includes(director) || roles?.includes(headAdmin) || roles?.includes(admin)
console.log(userWithRequiredRoles);

  const [logout] = useLogoutMutation();

  // useEffect(() => {
  //   if(isSuccess) {
  //     setUser(data[0].username)
  //   }
  // }, [user, isSuccess])
  
  const Logoutuser = async(e) => {

    try {
      const { data} = await logout().unwrap();
      console.log( data ) 
      setUser('');
      navigate('/')
    } catch (error) {
      console.log(error);
    }
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
                    username && (
                      <NavLink to='/forum/profile' style={({ isActive }) => {                                        

                        return { color: isActive ? 'black' : '#8B8B8B'}
                      }}><img style={{ height: '1rem'}} src={imageResult.length > 0 ? `https://res.cloudinary.com/dyc002s1b/image/upload/v1659618588/${imageResult}` : 'https://steamuserimages-a.akamaihd.net/ugc/1898849113834216705/2DBAD8646ABEAF1DC65C6EEB148A5EB649FEFB5C/'} alt='photo'/></NavLink>
                    )
                  }
                  {
                    userWithRequiredRoles && (
                      <NavLink to='/admin' style={({ isActive }) => {
                        return { color: isActive ? 'black' : '#8B8B8B'}
                      }}><li>Admin Panel</li></NavLink>                      )
                  }
                  
                  

                </ul>
                
              </div>
              
              <div className={white ? 'test-second' : 'header-third-div'}>
              
               
                {
                  username ? (
                    <>
                    <span onClick={Logoutuser}>Logout</span>
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