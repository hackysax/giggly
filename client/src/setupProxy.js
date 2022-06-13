const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1", //api calls to node.js server
    createProxyMiddleware({
      target: "http://localhost:5000", //node.js sever local host 5000
      changeOrigin: true,
    })
  );
};
