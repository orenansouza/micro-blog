const service = require('../../services/users')

exports.createUser = async (req, res) => {
  const user = await service.createUser(req.body)

  if (!user.success) {
    return res.status(422).json({ success: false, message: user.message })
  }

  return res.status(201).json({ ...user })
}

exports.login = async (req, res) => {
  const login = await service.login(req.body)

  if (!login.success) {
    return res.status(422).json({ success: login.success, message: login.message })
  }

  return res.status(200).json({ ...login })
}
