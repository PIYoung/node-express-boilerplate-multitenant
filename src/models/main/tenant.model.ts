import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';

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

@Table({
  modelName: 'Tenant',
})
export class Tenant extends Model<TenantAttributes, TenantCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override readonly id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  readonly name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  readonly description!: string;

  @CreatedAt
  override readonly createdAt!: Date;

  @UpdatedAt
  override readonly updatedAt!: Date;

  @DeletedAt
  override readonly deletedAt!: Date;

  @HasMany(() => User)
  readonly users?: User[];
}
