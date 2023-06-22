const net = require('net');

exports.tryConnect = (host, port = 80) => {
  return new Promise(resolve => {
    const socket = net.createConnection(port, host, () => {
      resolve(`success to connect ${host}:${port}`);
      socket.end();
    });
    socket.setTimeout(3000);
    socket.on('error', err => {
      resolve(`error: ${err.message}`);
      socket.end();
    });

    socket.on('timeout', () => {
      resolve(`timeout to connect ${host}:${port}`);
      socket.end();
    });
  });
};
