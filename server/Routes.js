const express = require('express');
const router = express.Router();

const user_routes = require('./routes/user')
const record_routes = require('./routes/record')

router.use('/user', user_routes);
router.use('/record', record_routes);

module.exports = router;
