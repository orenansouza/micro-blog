const models = require('../../../models')

exports.createComment = async ({ text, post_id, user_id }) => {
  return models.Comment.create({ text, post_id, user_id })
    .then((comment) => {
      return { success: true, comment }
    })
    .catch((err) => {
      if (err.parent.code === '23503') {
        return { success: false, message: 'Usuário ou publição não existe' }
      }

      return { success: false, message: err.message }
    })
}

exports.listCommentByPost = async (post_id) => {
  return models.Comment.findAndCountAll({ order: [['createdAt', 'DESC']], where: { post_id }, include: models.User })
}
