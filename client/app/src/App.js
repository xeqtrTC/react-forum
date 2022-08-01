import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import WithoutAuth from './components/Require auth/WithoutAuth';
import ForumPage from './components/Forum/ForumCategoryPage/ForumPage';
import ForumScreen from './components/Forum/ForumScreen/ForumScreen';
import PostByUser from './components/Forum/PostsByUsers/PostByUser';
import Homescreen from './components/homescreen/homescreen';
import LoginScreen from './components/login/LoginScreen';
import RegisterScreen from './components/register/RegisterScreen';
import UserProfile from './components/Forum/ForumUserProfile/UserProfile';
import UnknownRoute from './components/404/Unknown';
import EditUserProfile from './components/Forum/ForumEditUserProfile/EditUserProfile';
import PostingCategory from './components/Forum/PostingCategoryPage/PostingCategory';
import SearchPostPerUser from './components/Forum/SearchPostsPerUser/SearchPostPerUser';
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='*' element={<UnknownRoute />} />

          <Route path='/posting/:category' element={<PostingCategory />} />

          <Route element={<WithoutAuth />}>
            <Route path='/login' element={<LoginScreen />}/>

          </Route>
          <Route path='/profile/' element={<UserProfile />} />
          <Route path='/searchposts' element={<SearchPostPerUser />} />
          <Route path='/editprofile' element={<EditUserProfile />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/forum' element={<ForumScreen />} />
          <Route path='/forum/:category' element={<ForumPage /> } />
          <Route path='/forum/:category/:title' element={<PostByUser />} />
        </Routes>
      </Provider>

    </BrowserRouter>
  )
}

export default App