import { checkSchema, validationResult } from "express-validator"
import createError from "http-errors"

const schema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "name validation failed, type must be string",
    },
  },
  surname: {
    in: ["body"],
    isString: {
      errorMessage: "surname validation failed, type must be string",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "email validation failed, must be valid email",
    },
  },
  dateOfBirth: {
    in: ["body"],
    isDate: {
      errorMessage: "dateOfBirth validation failed, must be valid date",
    },
  },
}

export const checkAuthorSchema = checkSchema(schema)

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    next(createError(400, "Validation problems", { errorsList: errors.array() }))
  } else {
    next()
  }
}
