import React,{useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Mern from './components/Mern'
import GenAI from './components/GenAI'
import Blog from './components/Blog'
import UserLogin from './admin/Login'
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreatePost from './admin/CreatePost'
import AskAI from './components/AskAI'
import "./styles/fontStyle.css"

// import "./styles/app.css"


const App = () => {
  const [dark, setDark] = useState(false);
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
        <Navbar theme={{dark,setDark}} navTheme={navTheme}/>
        <Routes>
          <Route path='/' element={<AskAI mainTheme={mainTheme}/>}/>
          <Route path='/mern' element={<Mern mainTheme={mainTheme}/>}/>
          <Route path='/genai' element={<GenAI mainTheme={mainTheme}/>}/>
          <Route path='/blog/:id' element={<Blog mainTheme={mainTheme}/>}/>
          {/* admin */}
          <Route path='/admin/login' element={<GoogleAuthWrapper/>}/>
          <Route path='/admin/panel' element={
              <CreatePost/>
          }/>
        </Routes>
        <Footer footerTheme={footerTheme}/>
      </div>
    </BrowserRouter>
  )
}

export default App