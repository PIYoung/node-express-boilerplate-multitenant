import { ModelCtor, Sequelize } from 'sequelize-typescript';

import { ALL_SCHEMAS, getTenantSchema, createSchema } from '../../configs/schema.config';
import { Tenant } from '../main/tenant.model';
import { Comment } from './comment.model';
import { GroupRole } from './group-role.model';
import { GroupUser } from './group-user.model';
import { Group } from './group.model';
import { PermissionRole } from './permission-role.model';
import { Permission } from './permission.model';
import { Post } from './post.model';
import { Role } from './role.model';
import { UserInfo } from './user-info.model';
import { UserRole } from './user-role.model';

const syncModels = async (seq: Sequelize, tenant: Tenant) => {
  const tenantId = tenant.id;
  const schema = getTenantSchema(tenantId);
  const models: ModelCtor[] = [
    Comment,
    GroupRole,
    GroupUser,
    Group,
    PermissionRole,
    Permission,
    Post,
    Role,
    UserInfo,
    UserRole,
  ];

  await createSchema(seq, schema);

  ALL_SCHEMAS[schema] = schema;

  seq.addModels(models);

  for (const model of models) {
    await model.schema(schema).sync();
  }

  for (const model of models) {
    await model.schema(schema).sync({ alter: true });
  }
};

export const generateTenantModels = async (seq: Sequelize, tenantName: string, tenantDescription: string) => {
  const tenant = await Tenant.write({
    name: tenantName,
    description: tenantDescription,
  });

  await syncModels(seq, tenant);
};

export const generateDefaultTenantModels = async (seq: Sequelize) => {
  const tenant = await Tenant.readOrWrite(1, {
    name: 'Default Tenant',
    description: 'Default Tenant',
  });

  await syncModels(seq, tenant);
};
