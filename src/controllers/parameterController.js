const prisma = require("../models/prisma");

const getTemplate = async (req, res) => {

    const parameter = await prisma.parameter.findFirst();

    res.json(parameter);
};

const updateTemplate = async (req, res) => {

    const { template } = req.body;

    const parameter = await prisma.parameter.findFirst();

    if (!parameter) {

        const created = await prisma.parameter.create({
            data: {
                template
            }
        });

        return res.json(created);
    }

    const updated = await prisma.parameter.update({
        where: {
            id: parameter.id
        },
        data: {
            template
        }
    });

    res.json(updated);
};

module.exports = {
    getTemplate,
    updateTemplate
};