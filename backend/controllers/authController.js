import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const register = async (req, res) => {

    try {

        const { full_name, email, password, phone, role } = req.body;

        if (!full_name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });

        }

        const existingUser = await User.findByEmail(email);

        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            full_name,
            email,
            password: hashedPassword,
            phone,
            role: role || "customer"
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findByEmail(email);

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });

        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {

            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.json({
            success: true,
            token,
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};