const express = require("express");
const router = express.Router();

const { sports } = require('../controllers/firstPage')

router.post('/sports', sports)

module.exports = router;


