import dotenv from 'dotenv';

import app from '../src/configs/express.config';
import { connectPostgres } from '../src/configs/postgres.config';

export default async function setup() {
  dotenv.config();

  global.__APP__ = app;

  globalThis.__POSTGRES__ = await connectPostgres();
}
