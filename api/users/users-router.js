const express = require('express');

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const User = require('./users-model');
const Post = require('../posts/posts-model');
const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert({ name: req.name})
  .then(newUser => {
    //throw new Error('testing')
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // const { id, changes } = req.body
  // User.update({ id, changes })
  // .then(editedUser => {
  //   res.status(200).json({
  //     name, 
  //   })
  // })
  console.log(req.user);
  console.log(req.name);
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.text);
});

router.use((err, req, res, next) => {//eslint-disable-line
  res.status(err.status || 500).json({
    customerMessage: "Something tragic happened inside posts router ",
    message: err.message, 
    stack: err.stack,
  })
})

module.exports = router;
