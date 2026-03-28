// dependencies
const http = require("http");

// app object
const app = {};

// configuration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listenning to port ${app.config.port}`);
  });
};

// handle request and response
app.handleReqRes = (req, res) => {
  res.end("Hello World");
};

// start server
app.createServer();
