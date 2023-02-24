import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { Post } from './post.model';
import { UserInfo } from './user-info.model';

interface CommentAttributes {
  id: number;
  postId: number;
  userInfoId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  post: Post;
  userInfo: UserInfo;
}

type CommentOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type CommentCreationAttributes = Optional<CommentAttributes, CommentOmitAttributes>;

@SQLZ.Table({ tableName: 'comment', modelName: 'comment' })
export class Comment extends SQLZ.Model<CommentAttributes, CommentCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.AllowNull(false)
  @SQLZ.Column(SQLZ.DataType.STRING)
  readonly content!: string;

  @SQLZ.ForeignKey(() => Post)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly postId!: number;

  @SQLZ.ForeignKey(() => UserInfo)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly userInfoId!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => Post)
  readonly post!: Post;

  @SQLZ.BelongsTo(() => UserInfo)
  readonly userInfo!: UserInfo;
}
