const router = require("express").Router();
const collections = require("./collections");
const teams = require("./teams");
const website = require("./website");
const donations = require("./donations");

router.use("/collections", collections);
router.use("/teams", teams);
router.use("/website", website);
router.use("/donations", donations);

module.exports = router;
