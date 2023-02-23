import { Optional } from 'sequelize';
import * as SQLZ from 'sequelize-typescript';

import { User } from './user.model';

interface TenantAttributes {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  users?: User[];
}

type TenantOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type TenantCreationAttributes = Optional<TenantAttributes, TenantOmitAttributes>;

@SQLZ.Table
export class Tenant extends SQLZ.Model<TenantAttributes, TenantCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

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

  @SQLZ.HasMany(() => User)
  readonly users?: User[];
}
