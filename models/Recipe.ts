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
    notes: Array
})

export default model('Recipe', recipeSchema)
