const fs = require("fs");
const YAML = require("js-yaml");
const JSON2YAML = require('yaml');

exports.yamlDocGeneration = async (body) => {
    try {
        const raw = fs.readFileSync("src/routes/uploads/swagger-v1.yml");
        const data = YAML.load(raw);

        fs.unlinkSync("src/routes/uploads/swagger-v1.yml")

        const lambdasName = body.lambdaName
        const definitionsName = body.definitions

        let paths = []
        let definitions = []

        for (const lambda of lambdasName) {
            paths.push({[lambda]: data.paths[lambda]})
        }

        for (const definiton of definitionsName) {
            definitions.push({[definiton]: data.definitions[definiton]})
        }

        let buildSwagger = {
            swagger: data.swagger,
            info: data.info,
            host: data.host,
            schemes: data.schemes,
            paths,
            definitions
        }

        const doc = new JSON2YAML.Document()
        doc.contents = buildSwagger;

        fs.writeFile('swagger-gerado-pela-api.yml', doc.toString(), (err) => {
            if (err) throw err;
        })

        return true;
    } catch (error) {
        console.log("error :: ", error);

        throw error
    }
}
