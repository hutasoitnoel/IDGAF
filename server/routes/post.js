const router = require("express").Router();
const postController = require("../controllers/postController");
const tagController = require('../controllers/tagController')
const upload = require('../helpers/googleUpload');
// const tagController = require('../controllers/tagController');

//get all posts data
router.get("/", postController.findAll);

//get one post data find by any
router.get("/:id", postController.find);

//update a post
router.patch("/:id", postController.update)

//delete a post
router.delete("/:id", postController.delete)

//register new post
router.post("/", upload.uploads, upload.goToGCS, postController.create);

//generate tags
// router.post("/tags", upload.multer.single('image'), upload.sendUploadToGCS, tagController.create, postController.generateTags);
// router.post("/tags", upload.uploads, upload.goToGCS);


module.exports = router;