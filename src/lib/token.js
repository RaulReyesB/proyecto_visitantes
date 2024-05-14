import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UUID } from "sequelize";
dotenv.config({
    path: ".env",
});

console.log(UUID);

// Generacion de token 
const generateToken = () => Math.random().toString(32).substring(3) + Date.now().toString(32) + Math.random().toString(32).substring(3);
//generacion de JWT
const generateJWT = (userID) =>
    jwt.sign(
        {
            domain: process.env.JWT_DOMAIN,
            author: process.env.JWT_AUTHOR,
            year: process.env.JWT_YEAR,
            userID,
        },
        process.env.JWT_HASHSTRING,
        {
            expiresIn: "1d",
        }
    );

export { generateJWT, generateToken };
