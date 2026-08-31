const express = require('express');
const router = express.Router();
const divideController = require('../controllers/divideController');

router.get('/', divideController.divide);

module.exports = router;
