import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { GroupRole } from './group-role.model';
import { PermissionRole } from './permission-role.model';
import { UserRole } from './user-role.model';

interface RoleAttributes {
  id: number;
  groupRoleId: number;
  userRoleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  groupRole: GroupRole;
  userRole: UserRole;
  permissionRoles?: PermissionRole[];
}

type RoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type RoleCreationAttributes = Optional<RoleAttributes, RoleOmitAttributes>;

@SQLZ.Table({ tableName: 'role', modelName: 'role' })
export class Role extends SQLZ.Model<RoleAttributes, RoleCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.AllowNull(true)
  @SQLZ.ForeignKey(() => GroupRole)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly groupRoleId?: number;

  @SQLZ.AllowNull(true)
  @SQLZ.ForeignKey(() => UserRole)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly userRoleId?: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.BelongsTo(() => GroupRole)
  readonly groupRole?: GroupRole;

  @SQLZ.BelongsTo(() => UserRole)
  readonly userRole?: UserRole;

  @SQLZ.HasMany(() => PermissionRole)
  readonly permissionRoles?: PermissionRole[];
}
