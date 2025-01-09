import * as Joi from '@hapi/joi';

export default () => ({
  validationSchema: Joi.object({
    PORT: Joi.number(),
    JWT_SECRET: Joi.string().required(),
  }),
});
