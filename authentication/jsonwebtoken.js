const jwt = require('jsonwebtoken');

const syncIn = (user, secret) => {
  const token = jwt.sign(
    {
      uid: user._id,
      email: user.email,
      rol: user.rol,
    },
    secret,
    { expiresIn: '5m' }
  );
  return token;
}

module.exports = { syncIn } 