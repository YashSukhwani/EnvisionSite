const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    fname: Joi.string().min(3).required().trim(),
    lname: Joi.string().min(3).required().trim(),
    email: Joi.string().min(6).required().email().required().trim(),
    password: Joi.string().min(6).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/),
    con_pass: Joi.string().min(6).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,30}$/),
    country_code: Joi.string().min(2).max(3).required(),
    phone: Joi.string().min(10).max(10).required(),
    nearest_office: Joi.string().required(),
    destination: Joi.string().required(),
    intake: Joi.string().required()
  });
  return schema.validate(data);
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;