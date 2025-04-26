import React from "react";
import { FaHeart } from "react-icons/fa6";

const Footer = ({ footerTheme }) => {
    return (

        <nav className={`px-[10%] h-1/9 flex justify-center items-center ${footerTheme} text-[2.5vh] gap-[1vh]`}>

            <span>By</span>
            <FaHeart className="text-red-600 animate-pulse" />
            <span>Sujan</span>
        </nav>
    );
};

export default Footer;
