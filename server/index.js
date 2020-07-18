const express = require('express');
const next = require('next');
const correlator = require('express-correlation-id');


const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV != "production";

console.log(dev);

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const routes = require('./routes');

  server.use(express.json());
  server.use(correlator());
  server.use('/', routes);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if(err) throw err;
    console.log(`> Ready on ${PORT}`);

  });
}).catch(ex => {
  console.error(ex.stack);
  process.exit;
})




