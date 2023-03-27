const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const cors = require("cors");
const yamlDocGenerationRoute = require("./routes/yamlDocGeneration.routes");
const multer = require("multer")


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/routes/uploads')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, 'swagger-v1' + ext)
    }
});

const upload = multer({storage})

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api-snorlax", upload.single("file"),yamlDocGenerationRoute);

const route = router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.1",
  });
});

app.use("/", route);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
