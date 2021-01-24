const jwt = require('jsonwebtoken')
const service = require('../../services/posts')

exports.createPost = async (req, res) => {
  let authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({ success: false, message: 'Token não informado' })
  }

  authorization = authorization.replace('Bearer ', '')

  const decoded = jwt.verify(authorization, process.env.PRIVATE_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token inválido' })
    }

    return decoded
  })

  const post = await service.createPost({ ...req.body, user_id: decoded.user_id })

  if (!post.success) {
    return res.status(422).json({ success: false, message: post.message })
  }

  return res.status(201).json({ ...post })
}

exports.listAllPosts = async (req, res) => {
  const posts = await service.listAllPosts(req.query)

  res.status(200).json({ success: true, pagination: posts.pagination, content: posts.posts })
}
