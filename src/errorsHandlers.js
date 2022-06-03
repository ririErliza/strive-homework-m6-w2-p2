import mongoose from "mongoose"

export const badRequestHandler = (err, req, res, next) => {
  if (err.status === 400) {
    // If the error received has status of 400, I am responsible of sending a response, otherwise I'm sending the error to who comes next
    res.status(400).send({ message: err.message, errorsList: err.errorsList })
  } else {
    next(err)
  }
} // 400s Bad request ⇒ there is something wrong with user request

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    // If the error received has status of 401, I am responsible of sending a response, otherwise I'm sending the error to who comes next
    res.status(401).send({ message: err.message })
  } else {
    next(err)
  }
} // 401s Unauthorized ⇒ user are not authorized

export const forbiddenHandler = (err, req, res, next) => {
  if (err.status === 403) {
    // If the error received has status of 403, I am responsible of sending a response, otherwise I'm sending the error to who comes next
    res.status(403).send({ message: err.message })
  } else {
    next(err)
  }
} // 403s Forbidden => 

export const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404 || err instanceof mongoose.CastError) {
    // If the error received has status of 404, I am responsible of sending a response, otherwise I'm sending the error to who comes next
    res.status(404).send({ message: err.message, status: "error" })
  } else {
    next(err)
  }
} // 404s Not found ⇒ cannot find the info user looking for

export const genericErrorHandler = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ error: "Generic error, error on server side" })
} // 500 Internal server error ⇒ something wrong, server side
