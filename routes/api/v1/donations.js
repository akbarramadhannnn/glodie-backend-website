const router = require("express").Router();
const {
  getAllDonations,
  getDonationsById,
} = require("../../../controllers/donations");

router.get("/", getAllDonations);
router.get("/:id", getDonationsById);

module.exports = router;
