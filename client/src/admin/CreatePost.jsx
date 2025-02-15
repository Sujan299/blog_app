import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const quillRef = useRef();


  useEffect(() => {
    try {
      const user = localStorage.getItem("user-info");
      if (!user) return;
      const parsedUser = JSON.parse(user);
      if (parsedUser.email === "mrsujan321@gmail.com") {
        setAuth(true);
      }
    } catch (err) {
      console.error("Error parsing user-info:", err);
    }
  }, []);
  console.log(content)

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post("https://blogorbit.onrender.com/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        const imageUrl = response.data.url;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "code-block"],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: { image: imageHandler },
    },
  }), []);

  const formats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "bullet", "link", "image", "code-block", "align"
  ];

  const handleSubmit = async () => {
    console.log(content);
    try {
      const response = await axios.post("http://localhost:3000/create_post/", {
        title, image, content, category
      });
      if (response.status === 201) {
        toast.success("Post created successfully!");
        navigate("/");
      } else {
        toast.error("Error creating post.");
      }
    } catch (err) {
      console.error("Cannot insert data:", err);
      toast.error("Failed to create post.");
    }
  };

  return auth ? (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg my-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Post</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the post title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Image Link:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the image URL"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Content:</label>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          formats={formats}
          modules={modules}
          placeholder="Write something amazing..."
          className="border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the category ID"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
      >
        POST
      </button>
    </div>
  ) : null;
};

export default CreatePost;


