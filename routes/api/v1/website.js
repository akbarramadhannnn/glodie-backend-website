const router = require("express").Router();
const { getWebsiteByMenuName } = require("../../../controllers/website");
const { getToken } = require("../../../middleware/auth");

router.get("/:menuName", getToken, getWebsiteByMenuName);

module.exports = router;
