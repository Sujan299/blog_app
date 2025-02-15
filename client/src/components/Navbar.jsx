import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ImCross } from "react-icons/im";

// light icon
import { MdOutlineLightMode } from "react-icons/md";
// dark icons
import { MdOutlineDarkMode } from "react-icons/md";

import { CiMenuFries } from "react-icons/ci";

// import "../styles/navbar.css"

const Navbar = ({ theme, navTheme }) => {
    const location = useLocation("");
    const { pathname } = location;
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <nav className={`px-[10%] h-1/9 flex justify-between items-center ${navTheme}`}>
            <div className='text-3xl font-semibold font2'>Sujan<span className='text-brown_color'>.dev</span></div>
            <div className=''>
                <ul className='md:flex hidden gap-[8vw] font1 text-md'>
                    <li>
                        <Link to='/' className={`${pathname === "/"
                            ? (theme.dark ? "text-gray-500" : "text-primary_dark")
                            : ""
                            }`}>Ask AI</Link>
                    </li>
                    <li>
                        <Link
                            to="/mern"
                            className={`${pathname === "/mern"
                                ? (theme.dark ? "text-gray-500" : "text-primary_dark")
                                : ""
                                }`}
                        >
                            MERN
                        </Link>
                    </li>
                    <li>
                        <Link to='/genai' className={`${pathname === "/genai"
                            ? (theme.dark ? "text-gray-500" : "text-primary_dark")
                            : ""
                            }`}>Generative AI</Link>
                    </li>

                </ul>
            </div>
            <div className='bg-primary_dark rounded-full shadow-amber-950 text-4xl p-1 text-primary_white cursor-pointer'>
                {
                    !theme.dark ? <MdOutlineDarkMode onClick={() => { theme.setDark(true) }} className="md:block hidden" /> : <MdOutlineLightMode onClick={() => { theme.setDark(false) }} className="md:block hidden " />
                }
                <div className='md:hidden block' onClick={handleClick}>
                    <CiMenuFries />
                </div>

            </div>

            {
                open && <ul className={`md:hidden flex flex-col md:gap-[8vw] gap-[4vw] fixed top-0 left-0 h-[100vh] w-[50vw] pt-[5vh] px-[5vw] z-10 ${navTheme}`}>
                    <li  className='flex justify-between'>
                        <Link to='/' className={`${pathname === "/"
                            ? (theme.dark ? "text-gray-500" : "text-primary_dark")
                            : ""
                            }`} onClick={handleClick}>Ask AI</Link>
                            
                        <div><ImCross onClick={handleClick} /></div>
                    </li>
                    <li>
                        <Link
                            to="/mern"
                            className={`${pathname === "/mern"
                                ? (theme.dark ? "text-gray-500" : "text-primary_dark")
                                : ""
                                }`}
                            onClick={handleClick}
                        >
                            MERN
                        </Link>
                    </li>
                    <li>
                        <Link to='/genai' className={`${pathname === "/genai"
                            ? (theme.dark ? "text-gray-500" : "text-primary_dark")
                            : ""
                            }`} onClick={handleClick}>Generative AI</Link>
                    </li>

                    <li className='text-primary_white cursor-pointer' onClick={handleClick}>
                        {
                            !theme.dark ? <MdOutlineDarkMode onClick={() => { theme.setDark(true) }} className="text-2xl" /> : <MdOutlineLightMode onClick={() => { theme.setDark(false) }} className="text-2xl rounded-full" />
                        }
                    </li>
                </ul>
            }
        </nav>
    )
}

export default Navbar