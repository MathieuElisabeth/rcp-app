import Joi from '@hapi/joi'

export const registerValidation = (data) => {
  const schema = Joi.object({
    // name: Joi.string().min(4).required(),
    username: Joi.string().min(4).max(25).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Champs obligatoire";
            break;
          case "string.min":
            err.message = `Votre pseudo doit contenir au minimum ${err.local.limit} caractères!`;
            break;
          case "string.max":
            err.message = `Votre pseudo doit contenir au maximum ${err.local.limit} caractères!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    email: Joi.string().required().email().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Champs obligatoire";
            break;
          case "string.email":
            err.message = `E-mail invalide`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    password: Joi.string().min(6).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Champs obligatoire";
            break;
          case "string.min":
            err.message = `Votre mot de passe doit contenir au minimum ${err.local.limit} caractères!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  })
  return schema.validate(data)
}

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Champs obligatoire";
            break;
          case "string.email":
            err.message = `E-mail invalide`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    password: Joi.string().required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Champs obligatoire";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  })
  return schema.validate(data)
}

export const recipeValidation = data => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "string.empty":
            err.message = "Champs obligatoire";
            break;
          case "string.min":
            err.message = `Votre pseudo doit contenir au minimum ${err.local.limit} caractères!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    type: Joi.string().required(),
    price: Joi.string().required(),
    difficulty: Joi.string().required(),
    number_persons: Joi.number().required(),
    preparation_time: Joi.number().required().error(errors => {
      errors.forEach(err => {
        switch (err.code) {
          case "any.empty":
            err.message = "Champs obligatoire";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
    ingredients: Joi.array().items(ingredient).min(1).required(),
    steps: Joi.array().items(step).min(1).required(),
    image: Joi.any(),
    author: Joi.object(),
    comments: Joi.array(),
    ratings: Joi.array()

  })
  return schema.validate(data)
}

const ingredient = Joi.object().keys({
  name: Joi.string().required().error(errors => {
    errors.forEach(err => {
      console.log('error code: ', err.code)
      switch (err.code) {
        case "string.empty":
          err.message = "Champs obligatoire";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  quantity: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case "string.empty":
          err.message = "Champs obligatoire";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  unity: Joi.string().allow(""),
  _id: Joi.string(),
});

const step = Joi.object().keys({
  description: Joi.string().required().error(errors => {
    errors.forEach(err => {
      // console.log('error code: ', err.code)
      switch (err.code) {
        case "string.empty":
          err.message = "Champs obligatoire";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  step_number: Joi.number(),
  _id: Joi.string(),
});