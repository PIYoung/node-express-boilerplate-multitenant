import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { DEFAULT_MAIN_SCHEMA as schema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
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
type UserCreationAttributes = SQLZ.Optional<UserAttributes, UserOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'user', modelName: 'user', schema })
export class User extends SQLZ_TS.Model<UserAttributes, UserCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Unique('user_id_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly userId!: string;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column({
    type: SQLZ_TS.DataType.STRING,
    set(val: string) {
      this.setDataValue('password', generateHash(val));
    },
  })
  readonly password!: string;

  @SQLZ_TS.ForeignKey(() => Tenant)
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly tenantId!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt?: Date;

  @SQLZ_TS.BelongsTo(() => Tenant)
  readonly tenant!: Tenant;

  static async write(
    values: UserCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<User>>,
  ): Promise<User> {
    return this.schema(schema)
      .create(values, {
        returning: true,
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async readOne(id: number, options?: Omit<SQLZ.FindOptions<UserAttributes>, 'where'>): Promise<User | null> {
    return this.schema(schema)
      .findByPk(id, {
        nest: true,
        raw: true,
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async readAll(query: ListQuery, options?: SQLZ.FindOptions<SQLZ.Attributes<User>>): Promise<User[]> {
    let { page, count, sort, dir } = query;

    page ||= 1;
    count ||= 30;
    sort ||= 'createdAt';
    dir ||= 'DESC';

    return this.schema(schema)
      .findAll({
        nest: true,
        raw: true,
        limit: count,
        offset: (page - 1) * count,
        order: [[sort, dir]],
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async modify(
    id: number,
    values: UserAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<User>>, 'returning' | 'where'>,
  ): Promise<[number, User[]]> {
    return this.schema(schema)
      .update(values, {
        where: { id },
        returning: true,
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async remove(id: number, options?: SQLZ.DestroyOptions<SQLZ.Attributes<User>>): Promise<number> {
    return this.schema(schema)
      .destroy({
        where: { id },
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }
}
