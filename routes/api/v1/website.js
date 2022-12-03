const router = require("express").Router();
const { getWebsiteByMenuName } = require("../../../controllers/website");

router.get("/:menuName", getWebsiteByMenuName);

module.exports = router;
