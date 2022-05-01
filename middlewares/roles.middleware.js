
const hasRoles = (...roles) => {
  return (req, res, next) => {

    const user = req.user;
    if (!user) {
      return res.status(501).json({
        error: "dsadasdas",
      });
    }
    if (!roles.includes(user.role)) {
      return res.status(401).json({
        error: `No tienes rol ${roles}`,
      });
    }

    return next();
  }
}

module.exports = {
  hasRoles,
}