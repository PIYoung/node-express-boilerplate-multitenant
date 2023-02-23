import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

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

type UserOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type UserCreationAttributes = Optional<UserAttributes, UserOmitAttributes>;

@Table({
  modelName: 'User',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override readonly id!: number;

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  readonly userId!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  readonly password!: string;

  @ForeignKey(() => Tenant)
  @Column(DataType.INTEGER)
  readonly tenantId!: number;

  @CreatedAt
  override readonly createdAt!: Date;

  @UpdatedAt
  override readonly updatedAt!: Date;

  @DeletedAt
  override readonly deletedAt?: Date;

  @BelongsTo(() => Tenant)
  readonly tenant!: Tenant;
}
