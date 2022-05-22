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
        recipes: [Recipe]
        categories: [Category]
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
        category: [Category]
        user: [User]
    }

    type Category {
        name: String!
        recipes: [Recipe]
        user: [User]
    }

    type Query {
        getUser(email: String!): [User]
        getAllUsers: [User]
    }

    type Mutation {
        register(email: String!, password: String!): User!
        login(email: String!, password: String!): User!
        deleteUser(id: String!): [User]
    }
`

export default typeDefs
