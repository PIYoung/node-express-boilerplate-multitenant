import { Options, Sequelize } from 'sequelize';

import logger from './logger.config.js';

export const connectPostgres = async () => {
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
  const seq = new Sequelize({
    ...config,
  });

  await seq.authenticate();

  logger.info('✨ Connected to Postgres');

  return seq;
};
