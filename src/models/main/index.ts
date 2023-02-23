import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { DEFAULT_MAIN_SCHEMA, createSchema, getTenantSchema } from '../../configs/schema.config';
import { generateTenantModels } from '../tenant';
import { Tenant } from './tenant.model';
import { User } from './user.model';

const generateDefaultTenant = async (seq: Sequelize) => {
  const tenant = await Tenant.schema(DEFAULT_MAIN_SCHEMA).findOrCreate({
    where: { id: 1 },
    defaults: {
      name: 'Default Tenant',
      description: 'Default Tenant',
    },
  });
  const tenantId = tenant[0].id;
  const defaultTenantSchema = getTenantSchema(tenantId);

  await User.schema(DEFAULT_MAIN_SCHEMA).findOrCreate({
    where: { id: 1 },
    defaults: {
      userId: 'sample',
      password: 'sample1!',
      tenantId,
    },
  });

  await generateTenantModels(seq, defaultTenantSchema);
};

export const generateMainModels = async (seq: Sequelize) => {
  await createSchema(seq, DEFAULT_MAIN_SCHEMA);

  const models: ModelCtor[] = [Tenant, User];

  seq.addModels(models);

  models.forEach((model) => {
    model.options.schema = DEFAULT_MAIN_SCHEMA;
  });

  await seq.sync({ alter: true });

  await generateDefaultTenant(seq);
};
