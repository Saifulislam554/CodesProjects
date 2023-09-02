const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// View all blog posts on the home page
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).maxTimeMS(30000).exec();

    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
