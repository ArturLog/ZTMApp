import * as Joi from '@hapi/joi';

export default () => ({
  validationSchema: Joi.object({
    PORT: Joi.number(),
    JWT_SECRET: Joi.string().required(),
    STOPS_API: Joi.string().required(),
    DEPARTURE_API_WITHOUT_ID: Joi.string().required(),
  }),
});
