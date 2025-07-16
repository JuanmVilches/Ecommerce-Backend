function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Desautorizado, no es admin." });
  }
  next();
}

module.exports = isAdmin;
