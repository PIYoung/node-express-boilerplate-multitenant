import { Optional } from 'sequelize';
import * as SQLZ from 'sequelize-typescript';

interface UserRoleAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type UserRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type UserRoleCreationAttributes = Optional<UserRoleAttributes, UserRoleOmitAttributes>;

@SQLZ.Table
export class UserRole extends SQLZ.Model<UserRoleAttributes, UserRoleCreationAttributes> {
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
