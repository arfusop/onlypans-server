import { model, Schema } from 'mongoose'

const categorySchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    name: { type: String, unqiue: true }
})

export default model('Category', categorySchema)
