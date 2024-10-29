const express = require('express');
const { getWeatherData } = require('../controllers/weatherController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',auth,  getWeatherData);

module.exports = router;
