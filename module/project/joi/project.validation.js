const Joi = require("joi");

module.exports = {
  createProjectSchema: {
    body: Joi.object()
      .required()
      .keys({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(10).max(1000).required(),
        status: Joi.string()
          .valid("pending", "in-progress", "completed")
          .optional(),
      }),
  },
  getSingleProjectByIdSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
  },
  updateProjectSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object()
      .min(1)
      .required()
      .keys({
        title: Joi.string().min(3).max(100).optional(),
        description: Joi.string().min(10).max(1000).optional(),
        status: Joi.string()
          .valid("pending", "in-progress", "completed")
          .optional(),
      }),
  },
  deleteProjectSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
  },
};
