const fs = require("fs")
const YAML = require("js-yaml")
const JSON2YAML = require('json-to-pretty-yaml')

exports.yamlDocGeneration = async (body) => {
    try {
        const raw = fs.readFileSync("src/routes/uploads/swagger-v1.yml")
        const data = YAML.load(raw)

        fs.unlinkSync("src/routes/uploads/swagger-v1.yml")

        const lambdasName = body.lambdaName
        const definitionsName = body.definitions

        let paths = []
        let definitions = []

        if (Array.isArray(lambdasName)) {
            for (const lambda of lambdasName) {
                paths.push({ [lambda]: data.paths[lambda] })
            }
        } else {
            paths = { [lambdasName]: data.paths[lambdasName] }
        }

        if (Array.isArray(definitionsName)) {
            for (const definiton of definitionsName) {
                definitions.push({ [definiton]: data.definitions[definiton] })
            }
        } else {
            definitions = { [definitionsName]: data.definitions[definitionsName] }
        }

        let buildSwagger = {
            swagger: data.swagger,
            info: data.info,
            host: data.host,
            schemes: data.schemes,
            paths,
            securityDefinitions: data.securityDefinitions ? data.securityDefinitions : null,
            definitions
        }

        const yamlFile = JSON2YAML.stringify(buildSwagger)

        fs.writeFile('swagger-v1.yml', yamlFile, (err) => {
            if (err) throw err
        })

        return yamlFile
    } catch (error) {
        console.log("error :: ", error)

        throw error
    }
}
