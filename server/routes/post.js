const router = require("express").Router();
const postController = require("../controllers/postController");

//get all posts data
router.get("/", postController.findAll);

//get one post data find by any
router.get("/:id", postController.find);

//update a post
router.patch("/:id", postController.update)

//delete a post
router.delete("/:id", postController.delete)

//register new post
router.post("/", postController.create);

//login a post
router.post("/login", postController.login);

module.exports = router;