const url = require("url");
const path = require("path");
const { StringDecoder } = require("string_decoder");

const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandlers");

const handler = {};

handler.handleReqRes = (req, res) => {
  //! Request Handling
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = Object.fromEntries(parsedUrl.searchParams);
  const headers = req.headers;

  const requestProperties = {
    parsedUrl,
    trimmedPath,
    method,
    queryStringObject,
    headers,
  };
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};
    const payLoadString = JSON.stringify(payload);
    res.writeHead(statusCode);
    res.end(payLoadString);
  });

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

module.exports = handler;
