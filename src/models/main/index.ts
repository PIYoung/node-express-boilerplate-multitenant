import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { DEFAULT_MAIN_SCHEMA as schema, createSchema } from '../../configs/schema.config';
import { generateDefaultTenantModels } from '../tenant';
import { Tenant } from './tenant.model';
import { User } from './user.model';

export const generateMainModels = async (seq: Sequelize) => {
  await createSchema(seq, schema);

  const models: ModelCtor[] = [Tenant, User];

  seq.addModels(models);

  for (const model of models) {
    await model.schema(schema).sync();
  }

  for (const model of models) {
    await model.schema(schema).sync({ alter: true });
  }

  await generateDefaultTenantModels(seq);
};
