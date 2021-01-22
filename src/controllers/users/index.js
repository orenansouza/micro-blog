const service = require('../../services/users');

exports.createUser = async (req, res) => {
  return service
    .createUser(req.body)
    .then((user) => res.status(201).json({ ...user }))
    .catch((err) => res.status(401).json({ success: err.success, message: err.message }));
};
