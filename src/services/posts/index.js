// 1. POST 
// 2. GET 
// 3. GET (FOR SINGLE Post)
// 4. PUT 
// 5. DELETE 

import express from "express";
import q2m from "query-to-mongo"
import postsModel from "./model.js";
import createError from "http-errors";
import { checkPostMiddleware, checkValidationResult } from "./validation.js"

const postsRouter = express.Router()

//1.
postsRouter.post("/", checkPostMiddleware, checkValidationResult, async (req,res,next)=>{
    try {
        console.log("REQUEST BODY: ", req.body)

        const newPost = new postsModel(req.body) // this is going to VALIDATE the req.body
        const savedPost = await newPost.save() // This saves the validated body into the posts' collection
    
        res.send(savedPost)
    } catch (error) {
        next(error)
    }

})

//2.
postsRouter.get("/", async (req,res,next)=>{
    try {
        console.log("REQ.QUERY --> ", req.query)
        console.log("MONGO QUERY --> ", q2m(req.query))

        const mongoQuery = q2m(req.query)

        const total = await postsModel.countDocuments(mongoQuery.criteria)

        // Safety measure //
        if (!mongoQuery.options.skip) mongoQuery.options.skip = 0
        if (!mongoQuery.options.limit || mongoQuery.options.limit > 10) mongoQuery.options.limit = 20
        

        const posts = await postsModel.find(mongoQuery.criteria, mongoQuery.options.fields)
        .skip(mongoQuery.options.skip)
        .limit(mongoQuery.options.limit)
        .sort(mongoQuery.options.sort)

        res.send({
        links: mongoQuery.links("http://localhost:3002/blogPosts", total),
        total,
        totalPages: Math.ceil(total / mongoQuery.options.limit),
        posts,
    })
    } catch (error) {
        next(error)
    }
    
})

//3.
postsRouter.get("/:id", async (req,res,next)=>{
    try {
        const posts = await postsModel.findById(req.params.id)
        if(posts){
            res.send(posts)
        }else{
            next(createError(404, `Sorry, Cannot find Post with id ${req.params.id}!`))
        }
        
    } catch (error) {
        next(error)
    }
    
})

//4.
postsRouter.put("/:id", async (req,res,next)=>{
    try {
        const updatedPost = await postsModel.findByIdAndUpdate(
        req.params.id, // WHO
        req.body, // HOW
        { new: true } // OPTIONS (if you want to obtain the updated Post you should specify new: true)
        )
        if(updatedPost){
            res.send(updatedPost)
        }else{
            next(createError(404, `Sorry, Cannot find Post with id ${req.params.id}!`)) 
        }
    } catch (error) {
        next(error)
    }
})  

//5.
postsRouter.delete("/:id", async (req,res,next)=>{
    try {
        const deletedPost = await postsModel.findByIdAndDelete(req.params.id)
        if(deletedPost){
            res.status(204).send()
        }else{
            next(createError(404, `Sorry, Cannot find Post with id ${req.params.id}!`)) 
        }
        
    } catch (error) {
        next(error)
    }
    
})

//-----------------------------EMBEDDING COMMENTS--------------------------


//POST
postsRouter.post("/:id/comments", async (req, res, next) => {
    try {
        const commentToInsert = {...req.body, commentDate:new Date()}
        const modifiedPost = await postsModel.findByIdAndUpdate(
            req.params.id, //WHO
            { $push: { comments:commentToInsert} }, // HOW
            { new: true }
          )
          if (modifiedPost) {
            res.send(modifiedPost)
          } else {
            next(createError(404, `Post with id ${req.params.id} not found!`))
          }
    } catch (error) {
      next(error)
    }
  })

//GET
postsRouter.get("/:id/comments", async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  })

//GET byID
postsRouter.get("/:id/comments/:commentId", async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  })

//PUT
postsRouter.get("/:id/comment/:commentId", async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  })

//DELETE
postsRouter.get("/:id/comment/:commentId", async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  })

export default postsRouter