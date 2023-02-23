import { Sequelize } from 'sequelize-typescript';

export type TenantSchema = `tenant_${number}`;
export type Schema = {
  main: 'main';
  [key: TenantSchema]: TenantSchema;
};

export const DEFAULT_MAIN_SCHEMA = 'main';
export const TENANT_SCHEMA_PREFIX = 'tenant_';
export const ALL_SCHEMAS: Schema = {
  [DEFAULT_MAIN_SCHEMA]: DEFAULT_MAIN_SCHEMA,
};

export const createSchema = async (seq: Sequelize, schema: keyof Schema) => {
  await seq.createSchema(schema, { logging: false });
  await seq.query(`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ${schema} TO ${process.env['POSTGRES_USER']};`, {
    logging: false,
  });
};

export const getTenantSchema = (tenantId: number) => `${TENANT_SCHEMA_PREFIX}${tenantId}` as TenantSchema;
