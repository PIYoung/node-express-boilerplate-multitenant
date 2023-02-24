import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { Role } from './role.model';
import { UserInfo } from './user-info.model';

interface UserRoleAttributes {
  id: number;
  userInfoId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userInfo: UserInfo;
  roles: Role[];
}

type UserRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type UserRoleCreationAttributes = Optional<UserRoleAttributes, UserRoleOmitAttributes>;

@SQLZ.Table({ tableName: 'user_role', modelName: 'userRole' })
export class UserRole extends SQLZ.Model<UserRoleAttributes, UserRoleCreationAttributes> {
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

  @SQLZ.HasMany(() => Role)
  readonly roles?: Role[];
}
