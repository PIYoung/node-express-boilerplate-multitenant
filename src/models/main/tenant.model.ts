import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { DEFAULT_MAIN_SCHEMA as schema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
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
type TenantCreationAttributes = SQLZ.Optional<TenantAttributes, TenantOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'tenant', modelName: 'tenant', schema })
export class Tenant extends SQLZ_TS.Model<TenantAttributes, TenantCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly name!: string;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.Column(SQLZ_TS.DataType.STRING)
  readonly description!: string;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.HasMany(() => User)
  readonly users?: User[];

  static async write(
    values: TenantCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<Tenant>>,
  ): Promise<Tenant> {
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

  static async readOrWrite(id: number, defaults: TenantCreationAttributes): Promise<Tenant> {
    const result = await this.schema(schema)
      .findOrCreate({ where: { id }, defaults })
      .catch((error) => {
        logger.error(error);
        throw error;
      });

    return result[0];
  }

  static async readOne(
    id: number,
    options?: Omit<SQLZ.FindOptions<TenantAttributes>, 'where'>,
  ): Promise<Tenant | null> {
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

  static async readAll(query: ListQuery, options?: SQLZ.FindOptions<SQLZ.Attributes<Tenant>>): Promise<Tenant[]> {
    let { page, count, sort, dir, q } = query;

    page ||= 1;
    count ||= 30;
    sort ||= 'createdAt';
    dir ||= 'DESC';
    q ||= '';

    return this.schema(schema)
      .findAll({
        nest: true,
        raw: true,
        limit: count,
        offset: (page - 1) * count,
        order: [[sort, dir]],
        where: {
          [SQLZ.Op.or]: [{ name: { [SQLZ.Op.iLike]: `%${q}%` } }, { description: { [SQLZ.Op.iLike]: `%${q}%` } }],
        },
        ...options,
      })
      .catch((error) => {
        logger.error(error);
        throw error;
      });
  }

  static async modify(
    id: number,
    values: TenantAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<Tenant>>, 'returning' | 'where'>,
  ): Promise<[number, Tenant[]]> {
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

  static async remove(id: number, options?: SQLZ.DestroyOptions<SQLZ.Attributes<Tenant>>): Promise<number> {
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
