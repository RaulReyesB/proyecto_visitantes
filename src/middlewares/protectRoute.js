import dotenv from "dotenv";
import jsonWebToken from "jsonwebtoken";
import User from "../models/user";
dotenv.config({
    path:".env",
});
const protectRoute = async (req,res, next)=>{
    const { _token } = req.cookies;
    // Verificar existencia del token
    if (!_token) {
        return res.redirect("/inciarSesion");
    }
    try {
        const decoded = jsonWebToken.verify(_token, process.env.JWT_HASHSTRING);
        const loggedUser = await User.findByPk(decoded.userID);

        if (loggedUser) {
            req.user = loggedUser;
        } else {
            return res.redirect("/inciarSesion");
        }
    } catch (err) {
        console.log(err);
    }
    next();
}

export { protectRoute };
