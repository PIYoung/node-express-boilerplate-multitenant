import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { GroupRole } from './group-role.model';
import { GroupUser } from './group-user.model';

interface GroupAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  groupRoles?: GroupRole[];
  groupUsers?: GroupUser[];
}

type GroupOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupCreationAttributes = SQLZ.Optional<GroupAttributes, GroupOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'group', modelName: 'group' })
export class Group extends SQLZ_TS.Model<GroupAttributes, GroupCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.HasMany(() => GroupRole)
  readonly groupRoles?: GroupRole[];

  @SQLZ_TS.HasMany(() => GroupUser)
  readonly groupUsers?: GroupUser[];

  static async write(
    schema: TenantSchema,
    values: GroupCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<Group>>,
  ): Promise<Group> {
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

  static async readOne(
    schema: TenantSchema,
    id: number,
    options?: Omit<SQLZ.FindOptions<GroupAttributes>, 'where'>,
  ): Promise<Group | null> {
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

  static async readAll(
    schema: TenantSchema,
    query: ListQuery,
    options?: SQLZ.FindOptions<SQLZ.Attributes<Group>>,
  ): Promise<Group[]> {
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
    schema: TenantSchema,
    id: number,
    values: GroupAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<Group>>, 'returning' | 'where'>,
  ): Promise<[number, Group[]]> {
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

  static async remove(
    schema: TenantSchema,
    id: number,
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<Group>>,
  ): Promise<number> {
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
