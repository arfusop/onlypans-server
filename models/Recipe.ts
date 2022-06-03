import { model, Schema } from 'mongoose'

const recipeSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    name: { type: String, unqiue: true },
    rating: Number,
    skill: Number,
    servings: Number,
    ingredients: Array,
    directions: Array,
    notes: Array,
    category: String,
    userID: String
})

export default model('Recipe', recipeSchema)
