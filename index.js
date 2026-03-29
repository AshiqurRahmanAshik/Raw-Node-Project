// dependencies
const http = require("http");

const { handleReqRes } = require("././helpers/handleReqRes");
const environment = require("./helpers/environment");
// app object
const app = {};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listenning to port ${environment.port}`);
  });
};

// handle request and response
app.handleReqRes = handleReqRes;
// start server
app.createServer();
