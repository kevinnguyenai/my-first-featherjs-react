const path = require('path');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const proxy = require('http-proxy-middleware');

app.use(express.static(path.join(__dirname, 'build')));

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/auth',
  proxy({ 
    target: 'https://www.myfirstfeatherjsapp.tk:30000', 
    changeOrigin: true,
    logLevel: 'debug'
  })
);
// Host the public folder
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const server = https.createServer({
  key: fs.readFileSync('./crt/private.key'),
  cert: fs.readFileSync('./crt/certificate.crt'),
  ca: fs.readFileSync('./crt/ca_bundle.crt'),
}, app).listen('3000');

server.on('listening', () =>
  console.log('Feathers application starts on https://%s:%d', '0.0.0.0', 3000)
);