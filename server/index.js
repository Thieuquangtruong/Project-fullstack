import express, { Router } from 'express';
import bodyParser from 'body-parser'; //để trích xuất thông tin từ các loại dữ liệu như JSON, url encoded, hay text từ request body để xử lý trong ứng dụng.
import mongoose from 'mongoose'; //Thư viện này được sử dụng để kết nối với cơ sở dữ liệu MongoDB 
import cors from 'cors'; //: Thư viện này được sử dụng để xử lý việc chia sẻ tài nguyên đa nguồn giữa các tên miền khác nhau. 
import dotenv from 'dotenv'; //Thư viện này được sử dụng để đọc các biến môi trường từ file .env và đưa chúng vào trong process.env an toàn
import multer from 'multer'; // Thư viện này được sử dụng để xử lý tải lên các tệp tin (files) trong ứng dụng web. Nó hỗ trợ cho phép người dùng tải lên nhiều tệp tin cùng một lúc 
import helmet from 'helmet'; //Thư viện này giúp bảo vệ ứng dụng web bằng cách thiết lập các tiêu chuẩn bảo mật HTTP
import morgan from 'morgan'; //Thư viện này được sử dụng để ghi lại các hoạt động của ứng dụng web vào console
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from './middleware/auth.js';
import User from "./models/user.model.js"
import Post from "./models/posts.model.js"
import { users, posts} from "./data/index.js"


/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost)

/* ROUTES */
app.use("/auth", authRoutes);
app.use('/users', userRoutes)
app.use('posts', postRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    /* ADD DATA ONE TIME(da them) */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));