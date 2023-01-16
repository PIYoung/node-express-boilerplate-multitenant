import Sequelize from 'sequelize';

import logger from './logger.config.js';

const {
  POSTGRES_HOST: host,
  POSTGRES_PORT: port,
  POSTGRES_USER: username,
  POSTGRES_PASSWORD: password,
  POSTGRES_DATABASE: database,
} = process.env;

export default async function connectPostgres() {}
