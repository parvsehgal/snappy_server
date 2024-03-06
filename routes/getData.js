const express = require("express");
const router = express.Router();

const { sports, politics, entertainment } = require('../controllers/firstPage')

router.post('/sports', sports)
router.post('/politics', politics)
router.post('/entertainment', entertainment)

module.exports = router;


