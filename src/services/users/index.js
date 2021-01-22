const models = require('../../../models');

function validatePayload({ name, email, password }) {
  if (!name) {
    return { isValid: false, message: 'Favor informar o nome' };
  }

  if (!email) {
    return { isValid: false, message: 'Favor informar o email' };
  }

  if (!password) {
    return { isValid: false, message: 'Favor informar a senha' };
  }

  return { isValid: true };
}

exports.createUser = async ({ name, email, password }) => {
  const { isValid, message } = validatePayload({ name, email, password });
  if (!isValid) {
    return { success: false, message };
  }

  return models.User.create({ name, email, password })
    .then(user => { return { success: true, user } })
    .catch(err => {
      if (err.parent.code === '23505') {
        return { success: false, message: 'Já existe um usuário com este e-mail' }

      }

      return { success: false, message: err.message }
    })
};

exports.login = async ({ email, password }) => {
  const user = await models.User.findOne({ where: { email } })

  if (!user) {
    return { success: false, message: "Usuário não existe" }
  }

  if (user.password !== password) {
    return { success: false, message: "Email ou senha inválido" }
  }

  return { success: true, message: "Login realizado com sucesso" }
}