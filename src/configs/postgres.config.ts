import { Options, Sequelize } from 'sequelize';

import logger from './logger.config.js';

const {
  POSTGRES_HOST: host,
  POSTGRES_PORT: port,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
  POSTGRES_DATABASE: database,
} = process.env;

const config: Options = {
  host,
  port: Number(port),
  username,
  password,
  database,
};

export default async function connectPostgres() {
  const seq = new Sequelize({
    ...config,
    retry: {
      match: [
        /ConnectionError/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /SequelizeConnectionAcquireTimeoutError/,
        /Connection terminated unexpectedly/,
      ],
      max: 5,
    },
  });

  await seq.authenticate();

  logger.info('✨ Connected to Postgres');

  return seq;
}
