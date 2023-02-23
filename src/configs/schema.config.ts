type Schema = {
  main: 'main';
  [key: `TENANT_SCHEMA_PREFIX${number}`]: `tenant_${number}`;
};

export const DEFAULT_MAIN_SCHEMA = 'main';
export const TENANT_SCHEMA_PREFIX = 'tenant_';
export const ALL_SCHEMAS: Schema = {
  [DEFAULT_MAIN_SCHEMA]: DEFAULT_MAIN_SCHEMA,
};
