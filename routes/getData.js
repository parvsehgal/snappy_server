const express = require("express");
const router = express.Router();

const { sports, politics, entertainment } = require('../controllers/firstPage')
const { getArticle } = require('../controllers/secondPage')
const { signUp, login } = require('../controllers/auth')

router.post('/sports', sports)
router.post('/politics', politics)
router.post('/entertainment', entertainment)

router.post('/getArticle', getArticle)
router.post('/signUp', signUp)
router.post('/login', login)

module.exports = router;


