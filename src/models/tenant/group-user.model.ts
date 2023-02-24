import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

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
type GroupUserCreationAttributes = Optional<GroupUserAttributes, GroupUserOmitAttributes>;

@SQLZ.Table({ tableName: 'group_user', modelName: 'groupUser' })
export class GroupUser extends SQLZ.Model<GroupUserAttributes, GroupUserCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.ForeignKey(() => Group)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly groupId!: number;

  @SQLZ.ForeignKey(() => UserInfo)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly userInfoId!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => Group)
  readonly group!: Group;

  @SQLZ.BelongsTo(() => UserInfo)
  readonly userInfo!: UserInfo;
}
