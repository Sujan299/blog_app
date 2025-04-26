import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./styles/fontStyle.css"

// optimization
import {lazy, Suspense} from 'react'
const Mern = lazy(() => import('./components/Mern'));
const GenAI = lazy(() => import('./components/GenAI'));
const Blog = lazy(() => import('./components/Blog'));
const UserLogin = lazy(() => import('./admin/Login'));
const AskAI = lazy(() => import('./components/AskAI'));
const CreatePost = lazy(() => import('./admin/CreatePost'));


const App = () => {
  const [dark, setDark] = useState(true);
  const navTheme = dark ? "bg-primary_dark text-white" : "bg-primary_blue text-white";
  const mainTheme = dark ? "bg-light_dark text-white" : "bg-primary_white text-primary_dark";
  const footerTheme = dark ? "bg-primary_dark text-brown_color" : "bg-primary_blue text-brown_color";
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='410849405245-a0k9kkq4g3ssecl4fv5sukc0vhh3rrf4.apps.googleusercontent.com'>
        <UserLogin />
      </GoogleOAuthProvider>
    )
  }
  return (
    <BrowserRouter>
      <div className='w-full h-screen text-primary_dark'>
        <Navbar theme={{ dark, setDark }} navTheme={navTheme} />
        <Suspense fallback={<div className='text-center h-[80vh] w-full'>Loading...</div>}>
          <Routes>
            <Route path='/' element={<AskAI mainTheme={mainTheme} />} />
            <Route path='/mern' element={<Mern mainTheme={mainTheme} />} />
            <Route path='/genai' element={<GenAI mainTheme={mainTheme} />} />
            <Route path='/blog/:id' element={<Blog mainTheme={mainTheme} />} />
            {/* admin */}
            <Route path='/admin/login' element={<GoogleAuthWrapper />} />
            <Route path='/admin/panel' element={
              <CreatePost />
            } />
          </Routes>
        </Suspense>
        <Footer footerTheme={footerTheme} />
      </div>
    </BrowserRouter>
  )
}

export default App