import express from 'express';

const router = express.Router();

router.use('/user', user);
router.use('/todo', todo);

export default router;