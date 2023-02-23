import { Optional } from 'sequelize';
import * as SQLZ from 'sequelize-typescript';

interface GroupUserAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type GroupUserOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupUserCreationAttributes = Optional<GroupUserAttributes, GroupUserOmitAttributes>;

@SQLZ.Table
export class GroupUser extends SQLZ.Model<GroupUserAttributes, GroupUserCreationAttributes> {
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
