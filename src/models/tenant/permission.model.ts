import * as SQLZ from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { PermissionRole } from './permission-role.model';

interface PermissionAttributes {
  id: number;
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

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ.HasMany(() => PermissionRole)
  readonly permissionRoles?: PermissionRole[];
}
