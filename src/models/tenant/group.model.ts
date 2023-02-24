import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { GroupRole } from './group-role.model';
import { GroupUser } from './group-user.model';

interface GroupAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  groupRoles?: GroupRole[];
  groupUsers?: GroupUser[];
}

type GroupOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupCreationAttributes = Optional<GroupAttributes, GroupOmitAttributes>;

@SQLZ.Table({ tableName: 'group', modelName: 'group' })
export class Group extends SQLZ.Model<GroupAttributes, GroupCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.HasMany(() => GroupRole)
  readonly groupRoles?: GroupRole[];

  @SQLZ.HasMany(() => GroupUser)
  readonly groupUsers?: GroupUser[];
}
