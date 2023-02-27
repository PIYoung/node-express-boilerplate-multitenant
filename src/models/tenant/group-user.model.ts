import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { Group } from './group.model';
import { UserInfo } from './user-info.model';

interface GroupUserAttributes {
  id: number;
  groupId: number;
  userInfoId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  group: Group;
  userInfo: UserInfo;
}

type GroupUserOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupUserCreationAttributes = SQLZ.Optional<GroupUserAttributes, GroupUserOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'group_user', modelName: 'groupUser' })
export class GroupUser extends SQLZ_TS.Model<GroupUserAttributes, GroupUserCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.ForeignKey(() => Group)
  @SQLZ_TS.Unique('group_user_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly groupId!: number;

  @SQLZ_TS.ForeignKey(() => UserInfo)
  @SQLZ_TS.Unique('group_user_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly userInfoId!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.BelongsTo(() => Group)
  readonly group!: Group;

  @SQLZ_TS.BelongsTo(() => UserInfo)
  readonly userInfo!: UserInfo;

  static async write(
    schema: TenantSchema,
    values: GroupUserCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<GroupUser>>,
  ): Promise<GroupUser> {
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
    options?: Omit<SQLZ.FindOptions<GroupUserAttributes>, 'where'>,
  ): Promise<GroupUser | null> {
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
    query: ListQuery,
    schema: TenantSchema,
    options?: SQLZ.FindOptions<SQLZ.Attributes<GroupUser>>,
  ): Promise<GroupUser[]> {
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
    values: GroupUserAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<GroupUser>>, 'returning' | 'where'>,
  ): Promise<[number, GroupUser[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<GroupUser>>,
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
