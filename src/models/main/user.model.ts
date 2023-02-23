import { Optional } from 'sequelize';
import * as SQLZ from 'sequelize-typescript';

import { generateHash } from '../../utils';
import { Tenant } from './tenant.model';

interface UserAttributes {
  id: number;
  userId: string;
  password: string;
  tenantId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  tenant: Tenant;
}

type UserOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'tenant';
type UserCreationAttributes = Optional<UserAttributes, UserOmitAttributes>;

@SQLZ.Table
export class User extends SQLZ.Model<UserAttributes, UserCreationAttributes> {
  @SQLZ.PrimaryKey
  @SQLZ.AutoIncrement
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ.AllowNull(false)
  @SQLZ.Unique(true)
  @SQLZ.Column(SQLZ.DataType.STRING)
  readonly userId!: string;

  @SQLZ.AllowNull(false)
  @SQLZ.Column({
    type: SQLZ.DataType.STRING,
    set(val: string) {
      this.setDataValue('password', generateHash(val));
    },
  })
  readonly password!: string;

  @SQLZ.ForeignKey(() => Tenant)
  @SQLZ.Column(SQLZ.DataType.INTEGER)
  readonly tenantId!: number;

  @SQLZ.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ.DeletedAt
  override readonly deletedAt?: Date;

  @SQLZ.BelongsTo(() => Tenant)
  readonly tenant!: Tenant;
}
