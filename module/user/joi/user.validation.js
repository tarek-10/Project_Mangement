const Joi = require("joi");
module.exports = {
  userSignupSchema: {
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().required().min(5).max(20),
        email: Joi.string().required().max(50).email(),
        password: Joi.string().min(3).max(15).required().label("Password"),
        password_confirmation: Joi.any()
          .equal(Joi.ref("password"))
          .required()
          .label("Confirm password")
          .options({ messages: { "any.only": "{{#label}} does not match" } }),
      }),
  },
  userVerifySchema: {
    params: Joi.object().required().keys({
      token: Joi.string().required(),
    }),
  },
  userLoginSchema: {
    body: Joi.object().required().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
};
