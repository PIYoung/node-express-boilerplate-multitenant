import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { GroupRole } from './group-role.model';
import { PermissionRole } from './permission-role.model';
import { UserRole } from './user-role.model';

interface RoleAttributes {
  id: number;
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  groupRoles: GroupRole[];
  userRoles: UserRole[];
  permissionRoles?: PermissionRole[];
}

type RoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type RoleCreationAttributes = SQLZ.Optional<RoleAttributes, RoleOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'role', modelName: 'role' })
export class Role extends SQLZ_TS.Model<RoleAttributes, RoleCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Unique('role_code_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly code!: string;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly name!: string;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly description!: string;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.HasMany(() => GroupRole)
  readonly groupRoles?: GroupRole[];

  @SQLZ_TS.HasMany(() => UserRole)
  readonly userRoles?: UserRole[];

  @SQLZ_TS.HasMany(() => PermissionRole)
  readonly permissionRoles?: PermissionRole[];

  static async write(
    schema: TenantSchema,
    values: RoleCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<Role>>,
  ): Promise<Role> {
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
    options?: Omit<SQLZ.FindOptions<RoleAttributes>, 'where'>,
  ): Promise<Role | null> {
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
    options?: SQLZ.FindOptions<SQLZ.Attributes<Role>>,
  ): Promise<Role[]> {
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
    values: RoleAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<Role>>, 'returning' | 'where'>,
  ): Promise<[number, Role[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<Role>>,
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
