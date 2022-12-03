const router = require("express").Router();
const { getAllTeams, getTeamsById } = require("../../../controllers/teams");

router.get("/", getAllTeams);
router.get("/:id", getTeamsById);

module.exports = router;
