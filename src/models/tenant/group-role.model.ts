import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { Group } from './group.model';
import { Role } from './role.model';

interface GroupRoleAttributes {
  id: number;
  groupId: number;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  group: Group;
  role: Role;
}

type GroupRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupRoleCreationAttributes = Optional<GroupRoleAttributes, GroupRoleOmitAttributes>;

@SQLZ.Table({ tableName: 'group_role', modelName: 'groupRole' })
export class GroupRole extends SQLZ.Model<GroupRoleAttributes, GroupRoleCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.ForeignKey(() => Group)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly groupId!: number;

  @SQLZ.ForeignKey(() => Role)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly roleId!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => Group)
  readonly group!: Group;

  @SQLZ.BelongsTo(() => Role)
  readonly role!: Role;
}
