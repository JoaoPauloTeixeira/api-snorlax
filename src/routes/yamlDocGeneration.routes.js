const express = require("express");
const router = express.Router();
const controller = require("../controllers/yamlDocGeneration.controller");
const multer = require("multer")
const upload = multer({dest: "src/routes/uploads"})

const yamlDocGeneration = router.post("/yaml-doc-generation", controller.post);

module.exports = router;
