import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ForumPage from './components/Forum/ForumCategoryPage/ForumPage';
import ForumScreen from './components/Forum/ForumScreen/ForumScreen';
import PostByUser from './components/Forum/PostsByUsers/PostByUser';
import Homescreen from './components/homescreen/homescreen';
import LoginScreen from './components/login/LoginScreen';
import RegisterScreen from './components/register/RegisterScreen';
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/forum' element={<ForumScreen />} />
          <Route path='forum/:category' element={<ForumPage /> } />
          <Route path='/userpage' element={<PostByUser />} />
        </Routes>
      </Provider>

    </BrowserRouter>
  )
}

export default App