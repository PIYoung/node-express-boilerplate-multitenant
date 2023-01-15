import express from 'express';

const router = express.Router();

router.route('/users').post().get();

router.route('/users/:id').get().put().delete();

export default router;
