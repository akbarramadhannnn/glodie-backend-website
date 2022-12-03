const router = require("express").Router();
const {
  getAllCollections,
  getCollectionsById,
} = require("../../../controllers/collections");

router.get("/", getAllCollections);
router.get("/:id", getCollectionsById);

module.exports = router;
