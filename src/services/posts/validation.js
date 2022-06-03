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
  author: {
    in: ["body"],
    isString: {
      errorMessage: "author validation failed, type must be string",
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

const commentSchema = {
  text: {
    in: ["body"],
    isString: {
      errorMessage: "text field is required for comment",
    },
  },
  user: {
    in: ["body"],
    isString: {
      errorMessage: "user Id is required for comment",
    },
  },
  rate: {
    in: ["body"],
    isInt: {
      errorMessage: "rate field is required for comment and must be integer number between 1 and 5",
      options: {
        min: 1,
        max: 5,
      },
    },
  },
}

export const checkPostMiddleware = checkSchema(schema)

export const checkCommentSchema = checkSchema(commentSchema)

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