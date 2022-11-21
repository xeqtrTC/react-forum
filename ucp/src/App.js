import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CharacterScreen from './components/Character Registration/CharacterScreen'
import Homescreen from './components/Homescreen/Homescreen'
import Profile from './components/Profile/Profile'
import Server from './components/Server/Server'
import Support from './components/Support/Support'
import { Provider } from 'react-redux';
import store from './redux/store'

export default function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Homescreen />} />
        <Route path='/server' element={<Server />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/support' element={<Support />} />
        <Route path='/login' element={<CharacterScreen />} />

      </Routes>
      </Provider>
    </BrowserRouter>
  )
}
