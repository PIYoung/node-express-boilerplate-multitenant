import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import apiRouter from '../routes';

const app = express();

app.use(morgan('dev'));

app.use(compression());
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/', apiRouter);

app.use('/', (_req, res) => {
  res.status(200).send('<h1>Express + TypeScript Server</h1>');
});

export default app;
