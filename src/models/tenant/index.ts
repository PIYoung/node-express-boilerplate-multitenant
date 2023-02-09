import { Sequelize } from 'sequelize';

let TENANT = {};

export async function generateTenant(seq: Sequelize, schema: string) {
  await seq.createSchema(schema, { logging: false });
}
