const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.headers?.token) {
    return res.status(403).json({
      message: "Error token middleware",
    });
  }

  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err || !user?.isAdmin) {
      return res.status(400).json({
        message: "Error authMiddleWare",
      });
    } else if (user?.isAdmin) {
      next();
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  if (!req.headers?.token) {
    return res.status(403).json({
      message: "Error token middleware",
    });
  }
  const token = req.headers.token.split(" ")[1];
  const userID = req.params.id;

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Error access_token expired",
      });
    } else if (user?.isAdmin || user?.id === userID || user?.email) {
      next();
    } else if (user?.id !== userID) {
      return res.status(400).json({
        message: "Error information",
      });
    }
  });
};

module.exports = { authMiddleware, authUserMiddleware };
