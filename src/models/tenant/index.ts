import { Sequelize } from 'sequelize';

const TENANT = {};

export async function generateTenant(seq: Sequelize, schema: string) {
  await seq.createSchema(schema, { logging: false });
}
