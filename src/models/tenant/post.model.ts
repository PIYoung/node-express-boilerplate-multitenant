import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { UserInfo } from './user-info.model';

interface PostAttributes {
  id: number;
  content: string;
  userInfoId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: UserInfo;
}

type PostOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type PostCreationAttributes = SQLZ.Optional<PostAttributes, PostOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'post', modelName: 'post' })
export class Post extends SQLZ_TS.Model<PostAttributes, PostCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly content!: string;

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

  static async write(
    schema: TenantSchema,
    values: PostCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<Post>>,
  ): Promise<Post> {
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
    options?: Omit<SQLZ.FindOptions<PostAttributes>, 'where'>,
  ): Promise<Post | null> {
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
    options?: SQLZ.FindOptions<SQLZ.Attributes<Post>>,
  ): Promise<Post[]> {
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
    values: PostAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<Post>>, 'returning' | 'where'>,
  ): Promise<[number, Post[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<Post>>,
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
