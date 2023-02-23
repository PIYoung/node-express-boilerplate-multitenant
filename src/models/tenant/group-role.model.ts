import { Optional } from 'sequelize';
import * as SQLZ from 'sequelize-typescript';

interface GroupRoleAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type GroupRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupRoleCreationAttributes = Optional<GroupRoleAttributes, GroupRoleOmitAttributes>;

@SQLZ.Table
export class GroupRole extends SQLZ.Model<GroupRoleAttributes, GroupRoleCreationAttributes> {
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
}
