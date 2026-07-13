const prisma = require("../models/prisma");

const getProducts = async(req,res)=>{

    const products = await prisma.product.findMany({
        include:{
            category:true
        }
    });

    res.json(products);
};

const getProductsByCategory = async(req,res)=>{

    const { categoryId } = req.params;

    const products = await prisma.product.findMany({
        where:{
            categoryId:Number(categoryId)
        }
    });

    res.json(products);
};

module.exports = {
    getProducts,
    getProductsByCategory
};