import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Prism from 'prismjs';
// Default theme (or choose another)
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/plugins/line-numbers/prism-line-numbers'; // Optional plugin
import axios from 'axios'
import "prismjs/themes/prism-okaidia.css" 
const Blog = ({ mainTheme }) => {
  const { id } = useParams();
  console.log(id)
  const [item, setItem] = useState(null)

  console.log(item)
  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post/${id}`);
        console.log(response.data);
        setItem(response.data)

      } catch (err) {
        console.log("Getting error when fetching articles", err)
      }
    }
    getItem();
  }, [id, mainTheme]);
  useEffect(() => {
    Prism.highlightAll()
  }, [item]);
  if (!item) return null;
  return (
    <div className={`px-[10%] pt-[8vh] ${mainTheme} flex flex-col items-center pb-[5vh]`}>
      <div className='md:w-[80%] sm:w-[100%]'>
        <h1 className='md:text-[2.5vw] text-[5vw] font4'>{item[0].title}</h1>
        <img src={item[0].image} alt="" srcset="" className='font5 w-[100%] md:h-[70vh] h-[40vh] object-cover pt-[5vh]' />
        <p className='pt-[5vh] text-[1.5vw]' dangerouslySetInnerHTML={{ __html: item[0].content }}>
        </p>
      </div>
    </div>
  )
}

export default Blog