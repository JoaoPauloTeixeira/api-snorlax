const service = require("../service/yamlDocGeneration.service")

exports.post = async (req, res, next) => {
    try {
        const response = await service.yamlDocGeneration(req.body)

        res.status(200).send(response)
    } catch (err) {
        res.status(500).send({
            message: "Falha ao processar sua requisição.",
            error: err
        });
    }
};
