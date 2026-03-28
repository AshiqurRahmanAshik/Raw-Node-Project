// dependencies
const http = require("http");
const { parse } = require("path");
const url = require("url"); // this dependencies is required to work with path

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
  // Request Handling
  //const parsedUrl = url.parse(req.url, true); //(Older Method)
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`); // New Method
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  console.log(trimmedPath);

  // Response Handling
  res.end("Hello World");
};

// start server
app.createServer();
