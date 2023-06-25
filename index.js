const express = require("express");
const cors = require("cors")
const routes = require('./server/Routes.js');
const logger = require('./services/logger')

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended:false}));
server.use(cors());

server.use('',routes);
server.listen(8080, () => {
    console.clear();
    logger.green("\n[server] running on port 8080")
})