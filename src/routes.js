const express = require('express')
const UserController = require('./controllers/users')
const PostController = require('./controllers/posts')
const CommentController = require('./controllers/comments')

const routes = express.Router()

// route users
routes.post('/user', UserController.createUser)
routes.post('/user/login', UserController.login)

// route posts
routes.post('/post', PostController.createPost)
routes.get('/posts', PostController.listAllPosts)

// route comments
routes.post('/comment', CommentController.createComment)

module.exports = routes
