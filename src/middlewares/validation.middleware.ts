import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { pick } from '../utils';

export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validationSchema));
    const { value, error } = Joi.compile(validationSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');

      return res.status(400).json({ message: errorMessage });
    }

    Object.assign(req, value);

    return next();
  };
}
