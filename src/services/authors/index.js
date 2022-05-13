// 1. Author 
// 2. GET 
// 3. GET (FOR SINGLE Author)
// 4. PUT 
// 5. DELETE 

import express from "express";
import authorsModel from "./model.js";
import createError from "http-errors";
import q2m from "query-to-mongo";



const authorsRouter = express.Router()

//1.
authorsRouter.post("/", async (req,res)=>{
try {
    console.log("REQUEST BODY: ", req.body)

    const newAuthor = new authorsModel(req.body) // this is going to VALIDATE the req.body
    const savedAuthor = await newAuthor.save() // This saves the validated body into the authors' collection

    res.send(savedAuthor)
    
} catch (error) {
    next(error)
}
   
})

//2.
authorsRouter.get("/", async (req,res)=>{
    try {
        console.log("REQ.QUERY --> ", req.query)
        console.log("MONGO QUERY --> ", q2m(req.query))

        const mongoQuery = q2m(req.query)

        const total = await authorsModel.countDocuments(mongoQuery.criteria)

        // Safety measure //
        if (!mongoQuery.options.skip) mongoQuery.options.skip = 0
        if (!mongoQuery.options.limit || mongoQuery.options.limit > 10) mongoQuery.options.limit = 20
        
        const authors = await authorsModel.find(mongoQuery.criteria, mongoQuery.options.fields)
        .skip(mongoQuery.options.skip)
        .limit(mongoQuery.options.limit)
        .sort(mongoQuery.options.sort)

        res.send({
            links: mongoQuery.links("http://localhost:3002/authors", total),
            total,
            totalPages: Math.ceil(total / mongoQuery.options.limit),
            authors
        })
    } catch (error) {
        next(error)
    }
    
})

//3.
authorsRouter.get("/:id", async (req,res)=>{
    try {
        const Author = await authorsModel.findById(req.params.id)
        if(Author){
            res.send(Author)
        }else{
            next(createError(404, `Sorry, Cannot find Author with id ${req.params.id}!`))
        }
    } catch (error) {
        next(error)
    }
    
})

//4.
authorsRouter.put("/:id", async (req,res)=>{
    try {
        const updatedAuthor = await authorsModel.findByIdAndUpdate(
            req.params.id, // WHO
            req.body, // HOW
            { new: true } // OPTIONS (if you want to obtain the updated Author you should specify new: true)
          )
        if(updatedAuthor){  
            res.send(updatedAuthor)
        }else{
            next(createError(404, `Sorry, Cannot find Author with id ${req.params.id}!`)) 
    }
    } catch (error) {
        next(error)
    }
   
})

//5.
authorsRouter.delete("/:id", async (req,res)=>{
    try {
        const deletedAuthor = await authorsModel.findByIdAndDelete(req.params.id)
        if(deletedAuthor){
        res.status(204).send()
        }else{
        next(createError(404, `Sorry, Cannot find Author with id ${req.params.id}!`)) 
        }
    } catch (error) {
        next(error)
    }
    
})



export default authorsRouter