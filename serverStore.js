const connectedUsers = new Map();

let io = null;

const setSocketServerInctance = (ioInctance) => {
  io = ioInctance;
};

const getSocketServerInctance = () => {
  return io;
};

const addNewConnectedUser = (socketId, userId) => {
  connectedUsers.set(socketId, { userId });
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
  }
};

const getUserActiveConnection = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach((value, key) => {
    if ((value.userId = userId)) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getUserActiveConnection,
  setSocketServerInctance,
  getSocketServerInctance,
};
