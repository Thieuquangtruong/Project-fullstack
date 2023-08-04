import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'; // mã hoá password
import userModel from '../models/user.model';
import { register } from "../validations/user"

// REGISTER USER
const register = async (res, req) => {
    const {
        firstName,
        lastName,
        email,
        password,
        picture,
        friend,
        location,
        occupation,
        viewedProfile,
        impressions,
    } = req.body;

    try {
        const validate = register.validate(req.body);

        if (validate.error) {
            return res.status(400).json({
                message: validate.error.message
            });
        }

        const checkExitEmail = await userModel.findOne({
            email: email
        });

        if (checkExitUser) {
            return res.status(400).json({
                message: "Email is already in use"
            });
        }

        const salt = bcryptjs.genSaltSync(); // quy định định dạng mã hoá
        const hash = bcryptjs.hashSync(password, salt); // mã hoá password

        const user = new userModel({
            firstName,
            lastName,
            email,
            password: hash,
            picture,
            friend,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })

        const result = user.save();

        return res.status(200).json({
            message: "User created successfully",
            user
        })

    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}
