import { Optional } from 'sequelize';
import * as SQLZ from 'sequelize-typescript';

interface GroupAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type GroupOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupCreationAttributes = Optional<GroupAttributes, GroupOmitAttributes>;

@SQLZ.Table
export class Group extends SQLZ.Model<GroupAttributes, GroupCreationAttributes> {
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
