// dependencies
const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");
const { relative } = require("path");

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
  //! Request Handling
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = Object.fromEntries(parsedUrl.searchParams);
  const headers = req.headers;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
    /*
    - Data is coming in the form of  chunks
    - Buffer (binary) → Decoder → Normal String (readable)
     */
  });

  req.on("end", () => {
    realData += decoder.end(); //if some chunks remains left, it will be added
    console.log(realData);
    res.end(realData);
  });
};

// start server
app.createServer();
