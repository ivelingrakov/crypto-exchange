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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(publicPath));

const publicPath = path.join(__dirname, '..', 'public');
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

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   console.log('Server is up!');
});