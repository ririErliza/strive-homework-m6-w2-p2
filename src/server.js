import express from 'express';
import listEndpoints from 'express-list-endpoints';
import authorsRouter from './services/authors/index.js';
import postsRouter from './services/posts/index.js';
import mongoose from 'mongoose';
import cors from "cors";
import { badRequestHandler, unauthorizedHandler, forbiddenHandler, notFoundHandler, genericErrorHandler } from "./errorsHandlers.js"

const server = express()

const port = 3002


// _____________ MIDDLEWARES______________

const loggerMiddleware = (req, res, next) => {
    console.log(`Incoming request --> ${req.method} -- ${new Date()}`)
    next()
  }
  
  //  GLOBAL LEVEL MIDDLEWARES

server.use(cors()) // YOU NEED THIS TO CONNECT YOUR FE TO THIS BE
server.use(loggerMiddleware)
server.use(express.json()) // if you don't add this line BEFORE the endpoints, all requests' bodies will be UNDEFINED

// _____________ Endpoints ______________

server.use("/authors", authorsRouter)
server.use("/blogPosts", postsRouter) // all the endpoints in the usersRouter will have http://localhost:3001/users as a URL

// ______________ ERROR HANDLERS _____________________

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)
// _____________ Database Connection ______________

mongoose.connect(process.env.MONGO_CONNECTION_URL)

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB`)
server.listen(port, () =>{
    console.table(listEndpoints(server))
    console.log(`Server is running on port ${port}`) // backtick (don't forget)
})

})