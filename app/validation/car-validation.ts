import Joi from "joi";
const sizeCarEnum = ["small", "medium", "large"];

export class CarsValidation {
  static readonly CREATE = Joi.object({
    size: Joi.string()
      .valid(...sizeCarEnum)
      .required(),
    name: Joi.string().min(1).max(255).required(),
    price: Joi.number().positive().required(),
    category: Joi.string().min(1).max(255).required(),
    start_rent: Joi.date().required(),
    finish_rent: Joi.date().greater(Joi.ref("start_rent")).required(),
    created_by: Joi.string().min(1).max(255).required(),
  });

  static readonly UPDATE = Joi.object({
    id: Joi.number(),
    size: Joi.string()
      .valid(...sizeCarEnum)
      .optional(),
    name: Joi.string().min(1).max(255).optional(),
    price: Joi.number().positive().optional(),
    category: Joi.string().min(1).max(255).optional(),
    start_rent: Joi.date().optional(),
    finish_rent: Joi.date().greater(Joi.ref("start_rent")).optional(),
    updated_by: Joi.string().min(1).max(255).required(),
  });
}
