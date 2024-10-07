import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'production'),
  DATABASE_URL: Joi.string().required(),
});
