import { checkSchema, validationResult } from "express-validator"
import createError from "http-errors"

const schema = {
  category: {
    in: ["body"],
    isString: {
      errorMessage: "category validation failed, type must be  string ",
    },
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage: "title validation failed, type must be string  ",
    },
  },
  content: {
    in: ["body"],
    isString: {
      errorMessage: "content validation failed, type must be string ",
    },
  },
  "author.name": {
    in: ["body"],
    isString: {
      errorMessage: "author.name validation failed, type must be string",
    },
  },
  "author.avatar": {
    in: ["body"],
    isString: {
      errorMessage: "author.avatar validation failed, type must be string",
    },
  },
  "readTime.value": {
    in: ["body"],
    isNumeric: {
      errorMessage: "readTime.value validation failed, type must be numeric",
    },
  },
  "readTime.unit": {
    in: ["body"],
    isString: {
      errorMessage: "readTime.unit validation failed, type must be string",
    },
  },
  cover: {
    in: ["body"],
    isString: {
      errorMessage: "cover validation failed, type must be string",
    },
  },
}

export const checkPostMiddleware = checkSchema(schema)

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // we had some errors!
    next(createError(400, "Validation problems in req.body", { errorsList: errors.array() }))
  } else {
    // everything is fine
    next()
  }
}