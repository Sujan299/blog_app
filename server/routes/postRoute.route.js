const express = require("express");
const router = express.Router();
const {posts, post, create_post} = require("../controllers/posts.controller.js");

router.get("/post/:id", post);
router.get("/:category", posts);
router.post("/create_post", create_post);


module.exports = router;