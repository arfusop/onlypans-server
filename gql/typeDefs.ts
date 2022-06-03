import { gql } from 'apollo-server'

const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        email: String!
        password: String!
        firstName: String
        lastName: String
        dob: Date
        gender: String
        height: Float
        weight: Float
        goalWeight: Float
        bodyFat: Float
        goalBodyFat: Float
        activityLevel: String
        token: String
    }

    type Recipe {
        id: ID!
        name: String!
        rating: Float!
        skill: Float!
        servings: Float!
        ingredients: [String!]!
        directions: [String!]!
        notes: [String]
        category: String!
        userID: String!
    }

    type Query {
        # USERS
        getUser(email: String!): User
        getAllUsers: [User]

        # RECIPES
        getAllRecipes: [Recipe]
        getRecipesByUser(userID: String!): [Recipe]
    }

    type Mutation {
        # USERS
        register(email: String!, password: String!): User!
        login(email: String!, password: String!): User!
        updateUser(
            firstName: String
            lastName: String
            dob: Date
            gender: String
            height: Float
            weight: Float
            goalWeight: Float
            bodyFat: Float
            goalBodyFat: Float
            activityLevel: String
            email: String!
        ): User!
        updatePassword(
            email: String!
            password: String!
            newPassword: String!
        ): User!
        deleteUser(id: String!): [User]
        sendPasswordResetEmail(email: String!): [User]

        # RECIPES
        createRecipe(
            name: String!
            rating: Float!
            skill: Float!
            servings: Float!
            ingredients: [String!]!
            directions: [String!]!
            notes: [String]
            category: String!
            userID: String!
        ): [Recipe]
        editRecipe(
            recipeID: String!
            name: String
            rating: Float
            skill: Float
            servings: Float
            ingredients: [String]
            directions: [String]
            notes: [String]
            category: String
        ): [Recipe]
        deleteRecipe(recipeID: String!): [Recipe]
        bulkDeleteRecipes(ids: [String!]!, userID: String!): [Recipe]
    }
`

export default typeDefs
