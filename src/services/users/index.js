const models = require('../../models/user');

function validatePayload({ name, email, password }) {
  if (!name) {
    return { isValid: false, message: 'Favor informar o nome' };
  }

  if (!email) {
    return { isValid: false, message: 'Favor informar o email' };
  }

  if (!password) {
    return { isValid: false, message: 'Favor informar o password' };
  }

  return { isValid: true };
}

exports.createUser = (payload) => {
  const { isValid, message } = validatePayload(payload);
  if (!isValid) {
    throw new Error({ success: false, message });
  }

  return models.User.create({ ...payload })
    .then((userCreated) => {
      return { success: true, user: userCreated };
    })
    .catch((err) => {
      throw new Error({ success: false, message: err.message });
    });
};
