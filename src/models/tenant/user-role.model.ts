import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { Role } from './role.model';
import { UserInfo } from './user-info.model';

interface UserRoleAttributes {
  id: number;
  roleId: number;
  userInfoId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userInfo: UserInfo;
  role: Role;
}

type UserRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type UserRoleCreationAttributes = SQLZ.Optional<UserRoleAttributes, UserRoleOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'user_role', modelName: 'userRole' })
export class UserRole extends SQLZ_TS.Model<UserRoleAttributes, UserRoleCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.ForeignKey(() => Role)
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly roleId!: number;

  @SQLZ_TS.ForeignKey(() => UserInfo)
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly userInfoId!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.BelongsTo(() => UserInfo)
  readonly userInfo!: UserInfo;

  @SQLZ_TS.BelongsTo(() => Role)
  readonly role!: Role;

  static async write(
    schema: TenantSchema,
    values: UserRoleCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<UserRole>>,
  ): Promise<UserRole> {
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
    options?: Omit<SQLZ.FindOptions<UserRoleAttributes>, 'where'>,
  ): Promise<UserRole | null> {
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
    options?: SQLZ.FindOptions<SQLZ.Attributes<UserRole>>,
  ): Promise<UserRole[]> {
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
    values: UserRoleAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<UserRole>>, 'returning' | 'where'>,
  ): Promise<[number, UserRole[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<UserRole>>,
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
