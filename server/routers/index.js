import router from 'express-router';
import userRouter from './user';

router.use('/user', userRouter);

module.exports = router;