const jwt = require('jsonwebtoken');

const signIn = (user, secret) => {
  const token = jwt.sign(
    {
      uid: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '1h' }
  );

  return token;
};

module.exports = { signIn };