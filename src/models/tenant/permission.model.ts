import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { PermissionRole } from './permission-role.model';

interface PermissionAttributes {
  id: number;
  target: string;
  read: boolean;
  write: boolean;
  remove: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  permissionRoles?: PermissionRole[];
}

type PermissionOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type PermissionCreationAttributes = SQLZ.Optional<PermissionAttributes, PermissionOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'permission', modelName: 'permission' })
export class Permission extends SQLZ_TS.Model<PermissionAttributes, PermissionCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Unique('permission_target_read_write_remove_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly target!: string;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Default(false)
  @SQLZ_TS.Unique('permission_target_read_write_remove_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.BOOLEAN)
  readonly read!: boolean;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Default(false)
  @SQLZ_TS.Unique('permission_target_read_write_remove_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.BOOLEAN)
  readonly write!: boolean;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Default(false)
  @SQLZ_TS.Unique('permission_target_read_write_remove_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.BOOLEAN)
  readonly remove!: boolean;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.HasMany(() => PermissionRole)
  readonly permissionRoles?: PermissionRole[];

  static async write(
    schema: TenantSchema,
    values: PermissionCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<Permission>>,
  ): Promise<Permission> {
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
    options?: Omit<SQLZ.FindOptions<PermissionAttributes>, 'where'>,
  ): Promise<Permission | null> {
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
    options?: SQLZ.FindOptions<SQLZ.Attributes<Permission>>,
  ): Promise<Permission[]> {
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
    values: PermissionAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<Permission>>, 'returning' | 'where'>,
  ): Promise<[number, Permission[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<Permission>>,
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
