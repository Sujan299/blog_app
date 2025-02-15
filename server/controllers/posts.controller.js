const Post = require("../models/posts.model.js")

const posts = async (req,res) =>{
    try{
        const {category} = req.params;
        const response = await Post.find({category});
        console.log(response)
        res.status(200).json(response)
    }
    catch(err){
        console.log("I got error while finding posts ", err)
    }
}

const post = async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    try{
        const response = await Post.find({_id: id})
        res.status(200).json(response);
    }catch(err){
        console.log("can not get a post here !", err)
    }
}

// create post
const create_post = async (req, res) => {
    console.log("Received data:", req.body); // Add this log to check the body
    
    try {
        const { title, image, content, category } = req.body;
        const post = new Post({ title, image, content, category });
        await post.save();
        res.status(201).send("Post created successfully!");
    } catch (err) {
        console.log("Error saving post:", err);
        res.status(500).send("Error creating post");
    }
};


module.exports = { posts, post, create_post };