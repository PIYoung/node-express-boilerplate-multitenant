import * as SQLZ_TS from 'sequelize-typescript';
import * as SQLZ from 'sequelize';

import logger from '../../configs/logger.config';
import { TenantSchema } from '../../configs/schema.config';
import { ListQuery } from '../../dtos';
import { Group } from './group.model';
import { Role } from './role.model';

interface GroupRoleAttributes {
  id: number;
  groupId: number;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  group: Group;
  role: Role;
}

type GroupRoleOmitAttributes = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
type GroupRoleCreationAttributes = SQLZ.Optional<GroupRoleAttributes, GroupRoleOmitAttributes>;

@SQLZ_TS.Table({ tableName: 'group_role', modelName: 'groupRole' })
export class GroupRole extends SQLZ_TS.Model<GroupRoleAttributes, GroupRoleCreationAttributes> {
  @SQLZ_TS.PrimaryKey
  @SQLZ_TS.AutoIncrement
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  override readonly id!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.ForeignKey(() => Group)
  @SQLZ_TS.Unique('group_role_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly groupId!: number;

  @SQLZ_TS.AllowNull(false)
  @SQLZ_TS.ForeignKey(() => Role)
  @SQLZ_TS.Unique('group_role_unique')
  @SQLZ_TS.Column(SQLZ_TS.DataType.INTEGER)
  readonly roleId!: number;

  @SQLZ_TS.CreatedAt
  override readonly createdAt!: Date;

  @SQLZ_TS.UpdatedAt
  override readonly updatedAt!: Date;

  @SQLZ_TS.DeletedAt
  override readonly deletedAt!: Date;

  @SQLZ_TS.BelongsTo(() => Group)
  readonly group!: Group;

  @SQLZ_TS.BelongsTo(() => Role)
  readonly role!: Role;

  static async write(
    schema: TenantSchema,
    values: GroupRoleCreationAttributes,
    options?: SQLZ.CreateOptions<SQLZ.Attributes<GroupRole>>,
  ): Promise<GroupRole> {
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
    options?: Omit<SQLZ.FindOptions<GroupRoleAttributes>, 'where'>,
  ): Promise<GroupRole | null> {
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
    options?: SQLZ.FindOptions<SQLZ.Attributes<GroupRole>>,
  ): Promise<GroupRole[]> {
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
    values: GroupRoleAttributes,
    options?: Omit<SQLZ.UpdateOptions<SQLZ.Attributes<GroupRole>>, 'returning' | 'where'>,
  ): Promise<[number, GroupRole[]]> {
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
    options?: SQLZ.DestroyOptions<SQLZ.Attributes<GroupRole>>,
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
