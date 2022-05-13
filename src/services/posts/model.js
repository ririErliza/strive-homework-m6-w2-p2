// In this file we define two Mongoose Objects: Schema, Model

// Schema = shape of the data we gonna have in a certain collection
// Model = functionalities, interactions with a specific collection (find, save, update, delete)

import mongoose from "mongoose"

const { Schema, model } = mongoose

const postsSchema = new Schema(
  {
    category:  { type: String, required: true },
    title: { type: String, required: true } ,
    cover: { type: String, required: true } ,
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true }
 },
    author: {
      name: { type: String, required: true },
      avatar:{ type: String, required: true }
    },
    content:{ type: String, required: true }
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  }
)

export default model("Post", postsSchema) // this is going to be connected to the users collection


