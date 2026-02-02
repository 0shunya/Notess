import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async(req, res, next) => {
    let token;

    //Check Authorization Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token =  req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //attach user to request (without password)
            req.User = await User.findById(decoded.id).select("-password");

            next(); //Move to controller
        }
        catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" })
        }
    };

    if(!token) {
        return res.status(401).json({ message: "Not authorized, No token" })
    }
};