import Joi from 'joi';

export type ListQuery = {
  page: number;
  count: number;
  sort: string;
  dir: string;
  q: string;
};

type ReadList = {
  query: Joi.ObjectSchema<ListQuery>;
};

export const readListDto: ReadList = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    count: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('id', 'name').default('id'),
    dir: Joi.string().valid('ASC', 'DESC').default('ASC'),
    q: Joi.string().allow('').default(''),
  }),
};
