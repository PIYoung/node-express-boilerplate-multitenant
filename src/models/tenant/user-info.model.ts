import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { Comment } from './comment.model';
import { GroupUser } from './group-user.model';
import { Post } from './post.model';
import { User } from '../main/user.model';
import { UserRole } from './user-role.model';

interface UserInfoAttributes {
  id: number;
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
type UserInfoCreationAttributes = Optional<UserInfoAttributes, UserInfoOmitAttributes>;

@SQLZ.Table({ tableName: 'user_info', modelName: 'userInfo' })
export class UserInfo extends SQLZ.Model<UserInfoAttributes, UserInfoCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.ForeignKey(() => User)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly userId!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => User)
  readonly user!: User;

  @SQLZ.HasMany(() => Comment)
  readonly comments?: Comment[];

  @SQLZ.HasMany(() => Post)
  readonly posts?: Post[];

  @SQLZ.HasMany(() => UserRole)
  readonly userRoles?: UserRole[];

  @SQLZ.HasMany(() => GroupUser)
  readonly groupUsers?: GroupUser[];
}
