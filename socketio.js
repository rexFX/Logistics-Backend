const router = require('express').Router();

module.exports = (io) => {
  io.on('connection', function (socket) {
    socket.on('join', function (ID) {
      socket.join(ID);
    });

    socket.on('leave', function (ID) {
      socket.leave(ID);
    });

    socket.on('send_message', function (message) {
      socket.broadcast.to(message.orderID).emit(message.orderID, message.payload);
    });

    socket.on('disconnect', function () {
      socket.removeAllListeners();
    });
  });

  return router;
}