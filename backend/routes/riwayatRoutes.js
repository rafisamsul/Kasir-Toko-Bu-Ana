const express = require("express");
const router = express.Router();
const { getRiwayat } = require("../controllers/riwayatController");

router.get("/", getRiwayat);

module.exports = router;
