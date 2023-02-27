import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { Permission } from './permission.model';
import { Role } from './role.model';

interface PermissionRoleAttributes {
  id: number;
  permissionId: number;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  permission: Permission;
  role: Role;
}

type PermissionRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type PermissionRoleCreationAttributes = SQLZ.Optional<PermissionRoleAttributes, PermissionRoleOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'permission_role', modelName: 'permissionRole' })
export class PermissionRole extends SQLZ_TS.Model<PermissionRoleAttributes, PermissionRoleCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.ForeignKey(() => Permission)
  @SQLZ_TS.Unique('permission_role_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly permissionId!: number;

  @SQLZ_TS.ForeignKey(() => Role)
  @SQLZ_TS.Unique('permission_role_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly roleId!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.BelongsTo(() => Permission)
  readonly permission!: Permission;

  @SQLZ_TS.BelongsTo(() => Role)
  readonly role!: Role;

  static async write(
    schema: TenantSchema,
    values: PermissionRoleCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<PermissionRole>>,
  ): Promise<PermissionRole> {
    return this.schema(schema)
      .create(values, {
        returning: true,
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async readOne(
    schema: TenantSchema,
    id: number,
    options?: Omit<SQLZ.FindOptions<PermissionRoleAttributes>, 'where'>,
  ): Promise<PermissionRole | null> {
    return this.schema(schema)
      .findByPk(id, {
        nest: true,
        raw: true,
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async readAll(
    schema: TenantSchema,
    query: ListQuery,
    options?: SQLZ.FindOptions<SQLZ.Attributes<PermissionRole>>,
  ): Promise<PermissionRole[]> {
    let { page, count, sort, dir } = query;

    page ||= 1;
    count ||= 30;
    sort ||= 'createdAt';
    dir ||= 'DESC';

    return this.schema(schema)
      .findAll({
        nest: true,
        raw: true,
        limit: count,
        offset: (page - 1) * count,
        order: [[sort, dir]],
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async modify(
    schema: TenantSchema,
    id: number,
    values: PermissionRoleAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<PermissionRole>>, 'returning' | 'where'>,
  ): Promise<[number, PermissionRole[]]> {
    return this.schema(schema)
      .update(values, {
        where: { id },
        returning: true,
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async remove(
    schema: TenantSchema,
    id: number,
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<PermissionRole>>,
  ): Promise<number> {
    return this.schema(schema)
      .destroy({
        where: { id },
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }
}
