import dotenv from 'dotenv';
import { path } from 'app-root-path';
import { join } from 'path';

import logger from '../configs/logger.config';

export const configDotenv = () => {
  const { NODE_ENV: env } = process.env;
  let envPath = '';

  switch (env) {
    case 'development':
      envPath = join(path, '.env.local');
      break;

    case 'production':
      envPath = join(path, '.env.production');
      break;

    case 'test':
      envPath = join(path, '.env.test');
      break;
    default:
      logger.error(`${env} is not a valid environment`);
      throw new Error();
  }

  dotenv.config();
  dotenv.config({ path: envPath });
};
