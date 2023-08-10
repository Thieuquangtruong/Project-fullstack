import bcryptjs from "bcryptjs"; // mã hoá password
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js"


// REGISTER USER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        // try {
        //     const validate = register.validate(req.body);

        //     if (validate.error) {
        //         return res.status(400).json({
        //             message: validate.error.message
        //         });
        //     }

        //     const checkExitEmail = await userModel.findOne({
        //         email: email
        //     });

        //     if (checkExitUser) {
        //         return res.status(400).json({
        //             message: "Email is already in use"
        //         });
        //     }

        const salt = await bcryptjs.genSalt(); // quy định định dạng mã hoá
        const passwordHash = await bcryptjs.hash(password, salt); // mã hoá password

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; //lấy dữ liệu email và password từ phần thân của yêu cầu (request body).
        const user = await User.findOne({ email: email }); //sử dụng phương thức findOne để tìm một người dùng trong cơ sở dữ liệu dựa trên email được cung cấp.

        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password); //bcrypt.compare để so sánh mật khẩu được cung cấp trong yêu cầu với mật khẩu đã được mã hóa của người dùng trong cơ sở dữ liệu.
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //thư viện jwt để tạo một token JWT, gồm một đối tượng payload chứa ID của người dùng.

        delete user.password; //Xóa trường password khỏi đối tượng user để không trả về thông tin nhạy cảm.
        res.status(200).json({ token, user }); //Trả về mã phản hồi HTTP 200 (OK) cùng với token và thông tin người dùng.
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

