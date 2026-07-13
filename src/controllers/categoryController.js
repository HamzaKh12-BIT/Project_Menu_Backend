const prisma = require("../models/prisma");

const getCategories = async(req,res)=>{

    const categories =
    await prisma.categories.findMany({
        include:{
            products:true
        }
    });

    res.json(categories);
};

module.exports = {
    getCategories
};