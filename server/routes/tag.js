const router = require("express").Router();
const tagController = require("../controllers/tagController")

//create new tag
router.post("/", tagController.create);
router.get("/", tagController.findTag)

module.exports = router;