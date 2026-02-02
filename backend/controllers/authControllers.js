import User from "../models/user.js";

//@desc Register user
//@route POST /api/auth/register

export const registreUser = async(req, res) => {
    try {

        const { name, email, password } = req.body;

        //basic validation
        if(!name || !email || !password) {
            return res.status(300).json({ message: "All fields are required" });
        }

        //Check if user exists 
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({ message: "User already Exists" });
        }

        //Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            message: "User generated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}