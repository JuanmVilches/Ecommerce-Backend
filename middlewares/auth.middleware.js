const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "No se ha proporcionado un token" });
  }

  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .send({ message: "Token inválido, no puede realizar esta acción." });
    }
    req.user = decoded;
    next();
  });
}

module.exports = auth;
