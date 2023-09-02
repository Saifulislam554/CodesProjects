const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
  res.render('edit');
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  const post = new Post({
    title,
    content,
  });
  post.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
