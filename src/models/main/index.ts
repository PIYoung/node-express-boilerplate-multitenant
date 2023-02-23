import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { DEFAULT_MAIN_SCHEMA } from '../../configs/schema.config';
import { Tenant } from './tenant.model';
import { User } from './user.model';

export const generateMainModels = async (seq: Sequelize) => {
  const models: ModelCtor[] = [Tenant, User];

  await seq.createSchema(DEFAULT_MAIN_SCHEMA, { logging: false });

  seq.addModels(models);

  models.forEach((model) => {
    model.options.schema = DEFAULT_MAIN_SCHEMA;
  });

  await seq.sync({ alter: true });
};
