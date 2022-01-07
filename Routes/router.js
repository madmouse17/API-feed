const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AuthController = require("../Controllers/AuthController");
const keysController = require("../Controllers/keysController");

//auth
router.post("/", AuthController.login);
router.post("/register", AuthController.register);
// keys
router.get("/keys", auth, keysController.showAll);
router.post("/keys", auth, keysController.create);

//PUT And Delete
router.put("/:id", AuthController.update);
router.delete("/:id", AuthController.deletes);

module.exports = router;