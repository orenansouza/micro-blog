const jwt = require('jsonwebtoken')
const service = require('../comments')

exports.createComment = async (req, res) => {
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

  const comment = await service.createComment({ ...req.body, user_id: decoded.user_id })
  if (!comment.success) {
    return res.status(422).json({ success: false, message: comment.message })
  }

  return res.status(201).json({ ...comment })
}
