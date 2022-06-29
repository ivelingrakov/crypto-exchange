const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');

const proxy = new httpProxy.createProxyServer();
proxy.on('proxyRes', (proxyRes, req, res) => {
  if (req.headers.origin) {
    res.setHeader('access-control-allow-origin', req.headers.origin);
  }
})

const app = express();
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("build"));

const port = process.env.PORT || 3000;


app.get('/proxy', (req, res) => {
  const { target } = req.query;
  proxy.web(req, res, {
    target,
    changeOrigin: true,
    autoRewrite: true,
    ignorePath: true
  },
    err => res.status(500).send(err));
});

app.get('*', (req, res) =>
  res.sendFile(path.join(buildPath, 'index.html'))
);

app.listen(port, () =>
  console.log(`Server is up as ${port}!`)
);