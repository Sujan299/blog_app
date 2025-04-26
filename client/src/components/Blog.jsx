import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';  // Make sure to import relevant language
import 'prismjs/components/prism-python';
import "prismjs/themes/prism-okaidia.css";
import axios from 'axios';

const Blog = ({ mainTheme }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`https://blog-app-rdnu.onrender.com/post/${id}`,
          {
            withCredentials: true
          }
        );
        // const response = await axios.get(`http://localhost:3000/post/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching article:", err);
      }
    };

    getItem();
  }, [id, mainTheme]);

  useEffect(() => {
    // Highlight code blocks with Prism
    if (item) {
      Prism.highlightAll();
    }
  }, [item]);

  const processContent = (content) => {
    // Replace all code blocks that have the ql-syntax class with the correct language class
    return content.replace(/<pre class="ql-syntax"[^>]*>/g, (match) => {
      // Adding language-javascript class to the code block for highlighting
      return match.replace('<pre class="ql-syntax"', '<pre class="ql-syntax language-javascript"');
    });
  };

  // const processContent = (content) => {
  //   return content.replace(
  //     /<pre class="ql-syntax"[^>]*>([\s\S]*?)<\/pre>/g,
  //     (match, code) => {
  //       // Escape HTML entities to avoid rendering issues
  //       const escapedCode = code
  //         .replace(/&/g, '&amp;')
  //         .replace(/</g, '&lt;')
  //         .replace(/>/g, '&gt;');

  //       return `<pre><code class="language-javascript">${escapedCode}</code></pre>`;
  //     }
  //   );
  // };

  return (
    <>
      {
        loading ? <div className={`h-[80vh] flex justify-center items-center ${mainTheme}`}>
          <div class="flex justify-center items-center h-screen">
            <div class="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        </div> : <div className={`px-[10%] pt-[8vh] ${mainTheme} flex flex-col items-center pb-[5vh]`}>
        <div className='md:w-[80%] w-[100%]'>
          <h1 className='md:text-[2.5vw] text-[5vw] font4'>{item[0].title}</h1>
          <img src={item[0].image} alt="" className='font5 w-[100%] md:h-[70vh] h-[40vh] object-cover pt-[5vh]' />
          <p
            className='pt-[5vh]'
            dangerouslySetInnerHTML={{
              __html: processContent(item[0].content) // Process content to add language classes
            }}
          ></p>
        </div>
      </div>
      }
    </>
  );
};

export default Blog;
