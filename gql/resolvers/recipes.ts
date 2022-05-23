import { UserInputError } from 'apollo-server'

import Recipe from '../../models/Recipe'
import { validateRequiredFields } from '../../utils/validators'

type recipeMutationProps = {
    name: string
    rating: number
    skill: number
    servings: number
    ingredients: [string]
    directions: [string]
    notes: [string]
    category: string
    userID: string
}

type editRecipeMutationProps = {
    name: string | null
    rating: number | null
    skill: number | null
    servings: number | null
    ingredients: [string] | null
    directions: [string] | null
    notes: [string] | null
    category: string | null
    recipeID: string
}

export const Mutation = {
    async createRecipe(
        _: any,
        {
            name,
            rating,
            skill,
            servings,
            ingredients,
            directions,
            notes,
            category,
            userID
        }: recipeMutationProps
    ) {
        if (!userID) {
            throw new UserInputError('Missing User ID', {
                errors: {
                    general: 'User ID missing'
                }
            })
        }

        const { valid, errors } = validateRequiredFields({
            name,
            rating,
            skill,
            servings,
            ingredients,
            directions,
            category
        })

        if (!valid) {
            throw new UserInputError('Missing Required Fields', {
                errors
            })
        }

        try {
            const newRecipe = new Recipe({
                name,
                rating,
                skill,
                servings,
                ingredients,
                directions,
                notes,
                category,
                userID
            })

            await newRecipe.save()
            const userRecipes = await Recipe.find({ userID })

            return [...userRecipes]
        } catch (error: any) {
            throw new Error(error)
        }
    },
    async editRecipe(
        _: any,
        {
            name,
            rating,
            skill,
            servings,
            ingredients,
            directions,
            notes,
            category,
            recipeID
        }: editRecipeMutationProps
    ) {
        try {
            const recipesById = await Recipe.find({ _id: recipeID })
            const currentRecipe = recipesById[0]
            currentRecipe.name = name ?? currentRecipe.name
            currentRecipe.rating = rating ?? currentRecipe.rating
            currentRecipe.skill = skill ?? currentRecipe.skill
            currentRecipe.servings = servings ?? currentRecipe.servings
            currentRecipe.ingredients = ingredients ?? currentRecipe.ingredients
            currentRecipe.directions = directions ?? currentRecipe.directions
            currentRecipe.notes = notes ?? currentRecipe.notes
            currentRecipe.category = category ?? currentRecipe.category
            await currentRecipe.save()

            const allRecipesByUser = await Recipe.find({
                userID: currentRecipe.userID
            })
            return [...allRecipesByUser]
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export const Query = {
    async getAllRecipes() {
        try {
            const allRecipes = await Recipe.find()
            return allRecipes
        } catch (error: any) {
            throw new Error(error)
        }
    },
    async getRecipesByUser(_: any, { userID }: { userID: string }) {
        try {
            const userRecipes = await Recipe.find({ userID })

            return [...userRecipes]
        } catch (error: any) {
            throw new Error(error)
        }
    }
}
