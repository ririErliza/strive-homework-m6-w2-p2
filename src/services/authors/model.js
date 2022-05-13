// In this file we define two Mongoose Objects: Schema, Model

// Schema = shape of the data we gonna have in a certain collection
// Model = functionalities, interactions with a specific collection (find, save, update, delete)

import mongoose from "mongoose"

const { Schema, model } = mongoose

const authorsSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    avatar: {type: String, required: false}
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt fields
  }
)

export default model("Author", authorsSchema) // this is going to be connected to the users collection


