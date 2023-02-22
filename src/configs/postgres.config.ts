import { Options, Sequelize } from 'sequelize';

import logger from './logger.config';

export const connectPostgres = async () => {
  logger.info('🔌 Connecting to Postgres...');

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
    dialect: 'postgres',
    define: {
      paranoid: true,
      timestamps: true,
    },
  };

  const seq = new Sequelize({
    ...config,
  });

  await seq.authenticate();

  logger.info('✨ Connected to Postgres');

  return seq;
};
