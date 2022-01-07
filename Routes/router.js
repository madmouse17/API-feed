const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.post("/", AuthController.login);
router.post("/register", AuthController.register);
router.put("/:id", AuthController.update);
router.delete("/:id", AuthController.deletes);

module.exports = router;