import { checkSchema, validationResult } from "express-validator"
import createError from "http-errors"

const schema = {
    category: {
        in: ["body"],
        isString: {
          errorMessage: "Category validation failed! category is a mandatory field and needs to be a string!",
        }
      },
      title: {
        in: ["body"],
        isString: {
          errorMessage: "title validation failed! title is a mandatory field and needs to be a string!",
        }
      },
      cover: {
        in: ["body"],
        isString: {
          errorMessage: "cover validation failed! cover is not in the right format!",
        }
      },
      readTime: {
        
        value:{
        in: ["body"],
        isNumber: {
          errorMessage: "value validation failed! value should be in number!",
        }
      ,
        unit:{
            in: ["body"],
            isString: {
              errorMessage: "unit validation failed! unit should be stated as minute/minutes!",
            }
      }
    }  
    },

    author: {
        name:{
        in: ["body"],
        isString: {
          errorMessage: "name validation failed! name is a mandatory field and needs to be a string!",
        }
      ,
        avatar:{
        in: ["body"],
        isString: {
          errorMessage: "avatar validation failed! avatar is not in the right format!",
        }
      }
        }
    },
    content: {
        in: ["body"],
        isString: {
          errorMessage: "content validation failed! content is a mandatory field and needs to be a string!",
        }
      },
}

export const checkUserMiddleware = checkSchema(schema)

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