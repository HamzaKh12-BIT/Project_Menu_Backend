const prisma = require("../models/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req,res)=>{

    const { username,password } = req.body;

    const user = await prisma.user.findUnique({
        where:{
            username
        },
        include:{
            role:true
        }
    });

    if(!user){

        return res.status(400).json({
            message:"Invalid credentials"
        });
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if(!validPassword){

        return res.status(400).json({
            message:"Invalid credentials"
        });
    }

    const token = jwt.sign(
        {
            id:user.id,
            role:user.role.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    });

    res.json({
        message:"Login success"
    });
};

module.exports = {
    login
};