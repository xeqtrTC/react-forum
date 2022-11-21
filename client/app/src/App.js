import React, { lazy, Suspense } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import WithoutAuth from './components/Require auth/WithoutAuth';
// import ForumPage from './components/Forum/ForumCategoryPage/ForumPage';
// import ForumScreen from './components/Forum/ForumScreen/ForumScreen';
// import PostByUser from './components/Forum/PostsByUsers/PostByUser';
// import Homescreen from './components/homescreen/homescreen';
// import LoginScreen from './components/login/LoginScreen';
// import RegisterScreen from './components/register/RegisterScreen';
// import UserProfile from './components/Forum/ForumUserProfile/UserProfile';
// import UnknownRoute from './components/404/Unknown';
// import EditUserProfile from './components/Forum/ForumEditUserProfile/EditUserProfile';
// import PostingCategory from './components/Forum/PostingCategoryPage/PostingCategory';
// import SearchPostPerUser from './components/Forum/SearchPostsPerUser/SearchPostPerUser';
// import ForumUserPublicProfile from './components/Forum/ForumUserPublicProfile/ForumUserPublicProfile';
// import SearchPostPerUserPublic from './components/Forum/SearchPostsPerUserPublic/SearchPostPerUserPublic';
import EditUserPost from './components/Forum/EditUserPost/EditUserPost';
// import VerificationEmail from './components/Forum/VerificationEmailPage/VerificationEmail';
import ScreenAfterRegister from './components/Forum/ScreenAfterRegister/ScreenAfterRegister';
// import ForumSubForumPage from './components/Forum/ForumSubForumPage/ForumSubForumPage';
// import ForumSubForumPagePosts from './components/Forum/ForumSubForumPage/ForumSubForumPagePosts';
// import ForumSubForumPageView from './components/Forum/ForumSubForumPageView/ForumSubForumPageView';
// const DashBoard = lazy(() => import('./components/AdminPanel/Dashboard/DashBoard'));
// const UsersList = lazy(() => import( './components/AdminPanel/Users/UsersList/UsersList'));
// const NotVerificatedUsers = lazy(() => import( './components/AdminPanel/Users/NotVerificatedUsers/NotVerificatedUsers'));
// const BannedUsers = lazy(() => import( './components/AdminPanel/Users/BannedUsers/BannedUsers'));
// const QuickSearch = lazy(() => import( './components/AdminPanel/Users/QuickSearch/QuickSearch'));
// const TopicsList = lazy(() => import( './components/AdminPanel/Topics/TopicsList/TopicsList'));
// const AdminUserInfo = lazy(() => import( './components/AdminPanel/Users/UserInfo/AdminUserInfo'));
// import PinnedMessages from './components/Forum/ForumSubForumPage/PinnedMessages';
// import PrivateMessage from './components/Forum/PrivateMessages/PrivateMessage';
// import HelperDashboard from './components/HelperPanel/Dashboard/HelperDashboard';
// import HelperAdd from './components/HelperPanel/AddHelper/HelperAdd';
// import LatestPosts from './components/Forum/LatestPosts/LatestPosts';
// import HomeScreenNews from './components/HomeScreenNews/HomeScreenNews';

import  { RequireAuthForForumPages,RequireAuth, RequireAuthForLogin } from './components/Require auth/RequireAuth';
import { RequireRoles } from './components/Hooks/RequireRoles';
import RequireForLogin from './components/Require auth/RequireForLogin';
import LoadingBox from './components/LoadingBox/LoadingBox';

const ApprovesUserAdmin = lazy(() => import( './components/AdminPanel/Users/ApprovesUserAdmin/ApprovesUserAdmin'));

const PersistLogin = lazy(() => import( './components/Hooks/PersistLogin'));
const OverWatchPosts = lazy(() => import( './components/AdminPanel/ADMINISTRATOR/OverWatchPosts/OverWatchPosts'));
const OverWatchUsers = lazy(() => import( './components/AdminPanel/ADMINISTRATOR/OverWatchUsers/OverWatchUsers'));
const News = lazy(() => import( './components/AdminPanel/ADMINISTRATOR/News/AddNews/News'));
const RemoveNews = lazy(() => import( './components/AdminPanel/ADMINISTRATOR/News/RemoveNews/RemoveNews'));
const BannedHistory = lazy(() => import( './components/AdminPanel/Users/BannedHistory/BannedHistory'));
const CurrentlySession = lazy(() => import( './components/AdminPanel/ADMINISTRATOR/CurrentlySession/CurrentlySession'));

const Homescreen = lazy(() => import('./components/homescreen/homescreen'))
const UnknownRoute = lazy(() => import('./components/404/Unknown'))
const HomeScreenNews = lazy(() => import('./components/HomeScreenNews/HomeScreenNews'))
const VerificationEmail = lazy(() => import('./components/Forum/VerificationEmailPage/VerificationEmail'))
const LoginScreen = lazy(() => import('./components/login/LoginScreen'))
const RegisterScreen = lazy(() => import('./components/register/RegisterScreen'))
const ForumScreen = lazy(() => import('./components/Forum/ForumScreen/ForumScreen'))
const ForumSubForumPage = lazy(() => import('./components/Forum/ForumSubForumPage/ForumSubForumPage'))
const PinnedMessages = lazy(() => import('./components/Forum/ForumSubForumPage/PinnedMessages'))
const ForumSubForumPagePosts = lazy(() => import('./components/Forum/ForumSubForumPage/ForumSubForumPagePosts'))
const ForumSubForumPageView = lazy(() => import('./components/Forum/ForumSubForumPageView/ForumSubForumPageView'))
const PostingCategory = lazy(() => import('./components/Forum/PostingCategoryPage/PostingCategory'))
const ForumUserPublicProfile = lazy(() => import('./components/Forum/ForumUserPublicProfile/ForumUserPublicProfile'))
const SearchPostPerUserPublic = lazy(() => import('./components/Forum/SearchPostsPerUserPublic/SearchPostPerUserPublic'))
const ForumPage = lazy(() => import('./components/Forum/ForumCategoryPage/ForumPage'))
const PostByUser = lazy(() => import('./components/Forum/PostsByUsers/PostByUser'))
const UserProfile = lazy(() => import('./components/Forum/ForumUserProfile/UserProfile'))
const PrivateMessage = lazy(() => import('./components/Forum/PrivateMessages/PrivateMessage'))
const LatestPosts = lazy(() => import('./components/Forum/LatestPosts/LatestPosts'))
const SearchPostPerUser = lazy(() => import('./components/Forum/SearchPostsPerUser/SearchPostPerUser'))
const EditUserProfile = lazy(() => import('./components/Forum/ForumEditUserProfile/EditUserProfile'))
const HelperDashboard = lazy(() => import('./components/HelperPanel/Dashboard/HelperDashboard'))
const HelperAdd = lazy(() => import('./components/HelperPanel/AddHelper/HelperAdd'));
const DashBoard = lazy(() => import('./components/AdminPanel/Dashboard/DashBoard'));
const UsersList = lazy(() => import( './components/AdminPanel/Users/UsersList/UsersList'));
const NotVerificatedUsers = lazy(() => import( './components/AdminPanel/Users/NotVerificatedUsers/NotVerificatedUsers'));
const BannedUsers = lazy(() => import( './components/AdminPanel/Users/BannedUsers/BannedUsers'));
const QuickSearch = lazy(() => import( './components/AdminPanel/Users/QuickSearch/QuickSearch'));
const TopicsList = lazy(() => import( './components/AdminPanel/Topics/TopicsList/TopicsList'));
const AdminUserInfo = lazy(() => import( './components/AdminPanel/Users/UserInfo/AdminUserInfo'));

function App() {


  return (
    <BrowserRouter>
      <Provider store={store}>
      <Suspense fallback={<LoadingBox />}>

        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='*' element={<UnknownRoute />} />
          <Route path='/:n_title' element={<HomeScreenNews />} />
          <Route path='/404' element={<UnknownRoute /> } />
          <Route path='/verify/:token' element={<VerificationEmail  />} />






          <Route element={<RequireAuthForLogin />}>
            <Route path='/login' element={<LoginScreen />}/>
            <Route path='/register' element={<RegisterScreen />} />
          </Route>




          <Route path='/nice' element={<ScreenAfterRegister /> } />
          



        <Route element={<PersistLogin />}>
        <Route element={<RequireAuthForForumPages allowedRoles={[...Object.values(RequireRoles)]} />}>
          <Route path='forum'>
              <Route index element={<ForumScreen />} />
              <Route path=':category/subforum/:subtitle' element={<ForumSubForumPage />} />
              <Route path=':category/subforum/:subtitle/:pinnedtitle' element={<PinnedMessages />} />

              <Route path=':category/:subtitle/:title' element={<ForumSubForumPagePosts />} />
              <Route path=':category/page/:posttitle' element={<ForumSubForumPageView />} />
              <Route path='posting/:category' element={<PostingCategory />} />

              <Route path='userprofile/:username' element={<ForumUserPublicProfile />} />
              <Route path='userprofile/:username/posts' element={<SearchPostPerUserPublic />} />
              {/* <Route path=':category/:title/editpost/:replyid' element={<EditUserPost />} /> */}
              <Route path=':category' element={<ForumPage /> } />
              <Route path=':category/:title' element={<PostByUser />} />
              <Route path='profile' element={<UserProfile />} />
              <Route path='profile/messages' element={<PrivateMessage />} />
              <Route path='latestposts/' element={<LatestPosts />} />

           

              <Route path='searchposts' element={<SearchPostPerUser />} />
              <Route path='editprofile' element={<EditUserProfile />} />

            </Route>
          </Route>

          <Route path='helper'>
            <Route index element={<HelperDashboard />} />
            <Route path='add' element={<HelperAdd />} />
          </Route>

          


          <Route element={<RequireAuth allowedRoles={[RequireRoles.HeadAdmin, RequireRoles.CommunityManager, RequireRoles.Administrator, RequireRoles.Director, RequireRoles.Admin]} />}>
            <Route path='admin'>
              <Route index element={<DashBoard />} />
              <Route path='userslist' element={<UsersList />} />
              <Route path='notverificatedusers' element={<NotVerificatedUsers />} />
              <Route path='bannedusers' element={<BannedUsers /> } />
              <Route path='quicksearch' element={<QuickSearch/>} />
              <Route path='topiclist' element={<TopicsList />} />
              <Route path='userinfo/:id' element={<AdminUserInfo /> } />
              <Route path='accountapproves' element={<ApprovesUserAdmin />} />
              <Route element={<RequireAuth allowedRoles={[RequireRoles.Administrator]} />}>
                <Route path='overwatchposts' element={<OverWatchPosts />} />
                <Route path='overwatchusers' element={<OverWatchUsers />} />
                <Route path='sessionlist' element={<CurrentlySession />} />
              </Route>
              <Route path='news' element={<News />} />
              <Route path='removenews' element={<RemoveNews />} />
              <Route path='bannedhistorylist' element={<BannedHistory />} />
 

            </Route>
          </Route>
          </Route>

        </Routes>
        </Suspense>

      </Provider>

    </BrowserRouter>
  )
}

export default App