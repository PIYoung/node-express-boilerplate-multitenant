import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { Permission } from './permission.model';
import { Role } from './role.model';

interface PermissionRoleAttributes {
  id: number;
  permissionId: number;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  permission: Permission;
  role: Role;
}

type PermissionRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type PermissionRoleCreationAttributes = Optional<PermissionRoleAttributes, PermissionRoleOmitAttributes>;

@SQLZ.Table({ tableName: 'permission_role', modelName: 'permissionRole' })
export class PermissionRole extends SQLZ.Model<PermissionRoleAttributes, PermissionRoleCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.ForeignKey(() => Permission)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly permissionId!: number;

  @SQLZ.ForeignKey(() => Role)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly roleId!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => Permission)
  readonly permission!: Permission;

  @SQLZ.BelongsTo(() => Role)
  readonly role!: Role;
}
