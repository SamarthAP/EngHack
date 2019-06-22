//jshint esversion:6

const express = require('express');
const router = express.Router();

const controller = require("../controllers/controller");

router.get('/test', controller.test);
router.get('/testtwo', controller.testtwo)

module.exports = router;
