import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { UserInfo } from './user-info.model';

interface PostAttributes {
  id: number;
  userInfoId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  user: UserInfo;
}

type PostOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type PostCreationAttributes = Optional<PostAttributes, PostOmitAttributes>;

@SQLZ.Table({ tableName: 'post', modelName: 'post' })
export class Post extends SQLZ.Model<PostAttributes, PostCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.ForeignKey(() => UserInfo)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly userInfoId!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => UserInfo)
  readonly userInfo!: UserInfo;
}
