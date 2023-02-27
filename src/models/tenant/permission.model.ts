import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { PermissionRole } from './permission-role.model';

interface PermissionAttributes {
  id: number;
  target: string;
  read: boolean;
  write: boolean;
  remove: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  permissionRoles?: PermissionRole[];
}

type PermissionOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type PermissionCreationAttributes = Optional<PermissionAttributes, PermissionOmitAttributes>;

@SQLZ.Table({ tableName: 'permission', modelName: 'permission' })
export class Permission extends SQLZ.Model<PermissionAttributes, PermissionCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.AllowNull(false)
  @SQLZ.Column(SQLZ.DataType.STRING)
  readonly target!: string;

  @SQLZ.AllowNull(false)
  @SQLZ.Default(false)
  @SQLZ.Column(SQLZ.DataType.BOOLEAN)
  readonly read!: boolean;

  @SQLZ.AllowNull(false)
  @SQLZ.Default(false)
  @SQLZ.Column(SQLZ.DataType.BOOLEAN)
  readonly write!: boolean;

  @SQLZ.AllowNull(false)
  @SQLZ.Default(false)
  @SQLZ.Column(SQLZ.DataType.BOOLEAN)
  readonly remove!: boolean;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.HasMany(() => PermissionRole)
  readonly permissionRoles?: PermissionRole[];
}
