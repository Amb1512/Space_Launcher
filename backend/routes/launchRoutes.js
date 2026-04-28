const express = require("express");
const router = express.Router();

const { getLaunch } = require("../controllers/launchController");

router.get("/", getLaunch);

module.exports = router;