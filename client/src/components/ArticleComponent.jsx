import React from 'react';
import { Link } from "react-router-dom"

const ArticleComponent = ({data}) => {
  return (
    <>
      {
        data.map((blog) => {
          return <Link to={`/blog/${blog._id}`}>
            <div className='pb-[4vh] lg:w-[80%] w-[100%] md:flex-row flex flex-col md:gap-[2vw] gap-[3vh]'>
              <img className='md:h-[20vw] xl:h-[20vh] md:w-[15vw] h-[30vh] object-cover rounded-lg' src={blog.image} alt="article image" />
              <div className='md:h-[28vh]'>
                <h1 className='text-[150%] font4'>{blog.title}</h1>
                <p className='opacity-60'  dangerouslySetInnerHTML={{ __html:blog.content.slice(0, 100) + '...'}}></p>
              </div>
            </div>
          </Link>
        })
      }
    </>
  )
}

export default ArticleComponent