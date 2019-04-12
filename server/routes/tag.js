const router = require("express").Router();
const tagController = require("../controllers/tagController")
const createFilePath = require('../middlewares/createFilePath')

//create new tag
router.post("/", createFilePath, tagController.create);
// router.get("/", tagController.findTag)

module.exports = router;