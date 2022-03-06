const jwt = require("jsonwebtoken");

const verifySocketToken = (socket, next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = decoded;
  } catch (error) {
    return next(new Error("NOT_AUTHORIZED"));
  }

  return next();
};

module.exports = verifySocketToken;
