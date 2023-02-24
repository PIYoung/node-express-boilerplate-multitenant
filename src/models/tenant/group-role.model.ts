import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { Group } from './group.model';
import { Role } from './role.model';

interface GroupRoleAttributes {
  id: number;
  groupId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  group: Group;
  roles: Role[];
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

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => Group)
  readonly group!: Group;

  @SQLZ.HasMany(() => Role)
  readonly roles?: Role[];
}
