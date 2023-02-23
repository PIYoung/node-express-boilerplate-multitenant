import { Optional } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from '../main/user.model';

interface UserInfoAttributes {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type UserInfoOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';

type UserInfoCreationAttributes = Optional<UserInfoAttributes, UserInfoOmitAttributes>;

@Table({
  modelName: 'UserInfo',
})
export class UserInfo extends Model<UserInfoAttributes, UserInfoCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER({ length: 11, unsigned: true }))
  override readonly id!: number;

  @Column({
    type: DataType.INTEGER({
      length: 11,
      unsigned: true,
    }),
    allowNull: false,
  })
  readonly userId!: number;

  @CreatedAt
  override readonly createdAt!: Date;

  @UpdatedAt
  override readonly updatedAt!: Date;

  @DeletedAt
  override readonly deletedAt!: Date;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
  })
  readonly user!: User;
}
