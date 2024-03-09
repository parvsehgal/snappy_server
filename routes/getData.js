const express = require("express");
const router = express.Router();

const { sports, politics, entertainment } = require('../controllers/firstPage')
const { getArticle } = require('../controllers/secondPage')

router.post('/sports', sports)
router.post('/politics', politics)
router.post('/entertainment', entertainment)
router.post('/article', getArticle)

module.exports = router;


