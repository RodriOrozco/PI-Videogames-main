const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame } = require("../db.js");

module.exports = router;
