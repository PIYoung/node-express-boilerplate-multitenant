import { Sequelize } from 'sequelize-typescript';

import logger from './logger.config';
import { generateMainModels } from '../models/main';

export const connectPostgres = async () => {
  logger.info('🔌 Connecting to Postgres...');

  const seq = new Sequelize({
    host: process.env['POSTGRES_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DATABASE'],
    dialect: 'postgres',
    timezone: process.env['TZ'],
    define: {
      charset: 'utf8mb4_unicode_ci',
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    },
    logging: (msg) => logger.debug(msg),
  });

  await seq.authenticate();

  await generateMainModels(seq);

  logger.info('✨ Connected to Postgres');

  return seq;
};
