const express = require('express'),
dispose = require('./dispose'),
router = express.Router();

router
    .get('/', dispose.rootDirectory)
    .post('/login',dispose.login)
    .post('/addLink',dispose.addLink);

module.exports = router;