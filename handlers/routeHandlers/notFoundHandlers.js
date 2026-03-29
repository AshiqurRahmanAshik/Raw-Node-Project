const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(404, {
    messege: "Your Requested URL was not found",
  });
};

module.exports = handler;
