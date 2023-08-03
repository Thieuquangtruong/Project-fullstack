import router from 'express-router';
import multer from 'multer';
import { getUser, register, deleteUser, login } from '../controllers/user';
// import authentication from '../middlewares/authentication';

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// router.post('/login', login);
// router.get('/', authentication, getUser);
router.post('/register', upload.single("picture"), register);
// router.delete('/:id', deleteUser);

module.exports = router;