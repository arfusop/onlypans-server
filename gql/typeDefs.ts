import { gql } from 'apollo-server'

const typeDefs = gql`
    scalar Date

    # input UpdateUserInput {
    #     firstName: String
    #     lastName: String
    #     dob: Date
    #     gender: String
    #     height: Float
    #     weight: Float
    #     goalWeight: Float
    #     bodyFat: Float
    #     goalBodyFat: Float
    #     activityLevel: String
    #     email: String!
    # }

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
        userID: ID!
    }

    type Query {
        getUser(email: String!): [User]
        getAllUsers: [User]
    }

    type Mutation {
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
    }
`

export default typeDefs
