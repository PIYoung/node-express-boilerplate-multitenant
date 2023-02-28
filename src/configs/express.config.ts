import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';

import loggerMorgan from './morgan.config';
import apiRouter from '../routes';
import { jwtStrategy } from './passport.config';

const app = express();

app.use(loggerMorgan);

app.use(compression());
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/', apiRouter);

app.use('/', (_req, res) => {
  res.status(200).send('<h1>Express + TypeScript Server</h1>');
});

export default app;
