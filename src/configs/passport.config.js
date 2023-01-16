import Sequelize from 'sequelize';
import { Strategy } from 'passport-local';

import logger from './logger.config.js';

export const strategy = new Strategy();
