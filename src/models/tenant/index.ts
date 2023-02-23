import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { ALL_SCHEMAS, createSchema, TenantSchema } from '../../configs/schema.config';
import { GroupRole } from './group-role.model';
import { Group } from './group.model';
import { UserInfo } from './user-info.model';
import { UserRole } from './user-role.model';

export async function generateTenantModels(seq: Sequelize, schema: TenantSchema) {
  await createSchema(seq, schema);

  ALL_SCHEMAS[schema] = schema;

  const models: ModelCtor[] = [GroupRole, Group, UserInfo, UserRole];

  seq.addModels(models);

  models.forEach((model) => {
    model.options.schema = schema;
  });

  await seq.sync({ alter: true });
}
