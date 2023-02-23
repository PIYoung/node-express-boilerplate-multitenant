import { Sequelize } from 'sequelize-typescript';

import { ALL_SCHEMAS, createSchema, TenantSchema } from '../../configs/schema.config';

export async function generateTenantModels(seq: Sequelize, schema: TenantSchema) {
  await createSchema(seq, schema);

  ALL_SCHEMAS[schema] = schema;
}
