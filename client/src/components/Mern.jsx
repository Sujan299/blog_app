import React from 'react';
import ArticleComponent from './ArticleComponent.jsx';
import useFetchPosts from '../hooks/useFetchPosts.jsx';

const Mern = ({ mainTheme }) => {
  const { data: items, loading, error } = useFetchPosts("MERN");

  if (loading) return <div className={`h-[80vh] flex justify-center items-center ${mainTheme}`}>
    <div class="flex justify-center items-center h-screen">
      <div class="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`px-[10%] pt-[8vh] ${mainTheme} min-h-[80vh]`}>
      <h1 className='md:text-[3vw] xl:text-[2vw] text-2xl font3'>Articles</h1>
      <div className='pt-[4vh]'>
        {
          items.length >= 1 ?
            <ArticleComponent data={items} /> :
            <h2 className='text-center h-[80vh]'>No articles yet!</h2>
        }
      </div>
    </div>
  );
};

export default Mern;
