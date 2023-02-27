import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { Post } from './post.model';
import { UserInfo } from './user-info.model';

interface CommentAttributes {
  id: number;
  content: string;
  postId: number;
  userInfoId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  post: Post;
  userInfo: UserInfo;
}

type CommentOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type CommentCreationAttributes = SQLZ.Optional<CommentAttributes, CommentOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'comment', modelName: 'comment' })
export class Comment extends SQLZ_TS.Model<CommentAttributes, CommentCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly content!: string;

  @SQLZ_TS.ForeignKey(() => Post)
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly postId!: number;

  @SQLZ_TS.ForeignKey(() => UserInfo)
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly userInfoId!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.BelongsTo(() => Post)
  readonly post!: Post;

  @SQLZ_TS.BelongsTo(() => UserInfo)
  readonly userInfo!: UserInfo;

  static async write(
    schema: TenantSchema,
    values: CommentCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<Comment>>,
  ): Promise<Comment> {
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
    options?: Omit<SQLZ.FindOptions<CommentAttributes>, 'where'>,
  ): Promise<Comment | null> {
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
    options?: SQLZ.FindOptions<SQLZ.Attributes<Comment>>,
  ): Promise<Comment[]> {
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
    values: CommentAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<Comment>>, 'returning' | 'where'>,
  ): Promise<[number, Comment[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<Comment>>,
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
