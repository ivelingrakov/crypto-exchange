const express = require("express");
const httpProxy = require('http-proxy');

const proxy = new httpProxy.createProxyServer();
proxy.on('proxyRes', (proxyRes, req, res) => {
  if (req.headers.origin) {
    res.setHeader('access-control-allow-origin', req.headers.origin);
  }
})

const server = express();
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.all('*', (req, res) => {
  const { target } = req.query;
  proxy.web(req, res, {
    target,
    changeOrigin: true,
    autoRewrite: true,
    ignorePath: true
  },
    err => res.status(500).send(err));
});
server.listen(3003, () => {
  console.log(`${3003} listening!`);
});