const express = require("express");
const router = express.Router();

const { firstPage } = require('../controllers/firstPage')

router.post('/getData', firstPage)

module.exports = router;
