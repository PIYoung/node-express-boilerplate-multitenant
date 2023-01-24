import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import apiRouter from '../routes/index.js';

const app = express();

app.use(morgan('dev'));

app.use(compression());
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/', apiRouter);

export default app;
