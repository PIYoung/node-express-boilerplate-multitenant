import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { Comment } from './comment.model';
import { GroupUser } from './group-user.model';
import { Post } from './post.model';
import { User } from '../main/user.model';
import { UserRole } from './user-role.model';

interface UserInfoAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: User;
  comments?: Comment[];
  groupUsers?: GroupUser[];
  posts?: Post[];
  userRoles?: UserRole[];
}

type UserInfoOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type UserInfoCreationAttributes = SQLZ.Optional<UserInfoAttributes, UserInfoOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'user_info', modelName: 'userInfo' })
export class UserInfo extends SQLZ_TS.Model<UserInfoAttributes, UserInfoCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly name!: string;

  @SQLZ_TS.Unique('user_info_email_unique')
  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly email!: string;

  @SQLZ_TS.Unique('user_info_phone_unique')
  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly phone!: string;

  @SQLZ_TS.ForeignKey(() => User)
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly userId!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.BelongsTo(() => User)
  readonly user!: User;

  @SQLZ_TS.HasMany(() => Comment)
  readonly comments?: Comment[];

  @SQLZ_TS.HasMany(() => GroupUser)
  readonly groupUsers?: GroupUser[];

  @SQLZ_TS.HasMany(() => Post)
  readonly posts?: Post[];

  @SQLZ_TS.HasMany(() => UserRole)
  readonly userRoles?: UserRole[];

  static async write(
    schema: TenantSchema,
    values: UserInfoCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<UserInfo>>,
  ): Promise<UserInfo> {
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
    options?: Omit<SQLZ.FindOptions<UserInfoAttributes>, 'where'>,
  ): Promise<UserInfo | null> {
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
    options?: SQLZ.FindOptions<SQLZ.Attributes<UserInfo>>,
  ): Promise<UserInfo[]> {
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
    values: UserInfoAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<UserInfo>>, 'returning' | 'where'>,
  ): Promise<[number, UserInfo[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<UserInfo>>,
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
