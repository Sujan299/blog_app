import React,{useState, useEffect} from 'react'
import ArticleComponent from './ArticleComponent.jsx'
import {getPosts} from '../api/getPosts.js'

const Mern = ({ mainTheme }) => {
  const [items, setItems] = useState([])
  useEffect(()=>{
    getPosts("MERN", setItems);
  },[])
  return (
    <div className={`px-[10%] pt-[8vh] ${mainTheme}`}>
      <h1 className='md:text-[3vw] xl:text-[2vw] text-2xl font3'>Articles</h1>
      <div className='pt-[4vh]'>
        {
          items.length >=1 ? <ArticleComponent data={items}/> : <><div className="space-y-4 h-[80vh]">
          <div className={`h-48 bg-gray-400 rounded-md animate-pulse`}></div>
          <div className={`h-48 bg-gray-400 rounded-md animate-pulse`}></div>
        </div></>
        }
      </div>
    </div>
  )
}

export default Mern