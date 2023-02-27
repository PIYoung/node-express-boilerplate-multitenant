import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { GroupRole } from './group-role.model';
import { PermissionRole } from './permission-role.model';
import { UserRole } from './user-role.model';

interface RoleAttributes {
  id: number;
  code: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  groupRoles: GroupRole[];
  userRoles: UserRole[];
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

  @SQLZ.AllowNull(false)
  @SQLZ.Unique(true)
  @SQLZ.Column(SQLZ.DataType.STRING)
  readonly code!: string;

  @SQLZ.AllowNull(false)
  @SQLZ.Column(SQLZ.DataType.STRING)
  readonly name!: string;

  @SQLZ.AllowNull(false)
  @SQLZ.Column(SQLZ.DataType.STRING)
  readonly description!: string;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.HasMany(() => GroupRole)
  readonly groupRoles?: GroupRole[];

  @SQLZ.HasMany(() => UserRole)
  readonly userRoles?: UserRole[];

  @SQLZ.HasMany(() => PermissionRole)
  readonly permissionRoles?: PermissionRole[];
}
