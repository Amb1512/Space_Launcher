const express = require("express");
const router = express.Router();

const { getCrew } = require("../controllers/crewController");

router.get("/", getCrew);

module.exports = router;