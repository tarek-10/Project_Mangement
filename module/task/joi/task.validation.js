const Joi = require("joi");
module.exports = {
  createTaskSchema: {
    body: Joi.object()
      .required()
      .keys({
        title: Joi.string().min(3).max(100).required(),

        description: Joi.string().min(10).max(1000).required(),

        status: Joi.string().valid("Pending", "In Progress", "Done").optional(),

        priority: Joi.string().valid("Low", "Medium", "High").optional(),

        dueDate: Joi.date().required(),
      }),

    params: Joi.object().required().keys({
      projectId: Joi.string().required(),
    }),
  },
  getSingleTaskSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
  },
  getProjectTasksSchema: {
    params: Joi.object().required().keys({
      projectId: Joi.string().required(),
    }),
  },
  updateTaskSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object()
      .min(1)
      .required()
      .keys({
        title: Joi.string().min(3).max(100).optional(),

        description: Joi.string().min(10).max(1000).optional(),

        status: Joi.string().valid("Pending", "In Progress", "Done").optional(),

        priority: Joi.string().valid("Low", "Medium", "High").optional(),

        dueDate: Joi.date().optional(),
      }),
  },
  filterTasksSchema: {
    params: Joi.object().required().keys({
      projectId: Joi.string().required(),
    }),
  },
};
