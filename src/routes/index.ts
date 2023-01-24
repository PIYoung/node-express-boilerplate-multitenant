import express from 'express';

import v1Router from './v1';

const { APP_NAME } = process.env;
const router = express.Router();

router.use(`/api/${APP_NAME}`, [v1Router]);

export default router;
