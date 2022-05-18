import { UserInputError } from 'apollo-server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../../models/User'
import { validateRegisterUser } from '../../utils/validators'

export const Mutation = {
    async register(
        _: any,
        { email, password }: { email: string; password: string },
        context: any
    ) {
        try {
            const { valid, errors } = validateRegisterUser(email, password)
            if (!valid) {
                throw new UserInputError('Registration Errors', { errors })
            }

            const user = await User.findOne({ email })
            if (user) {
                throw new UserInputError('User Exists', {
                    errors: {
                        email: 'User already exists with these credentials'
                    }
                })
            }

            const newUser = new User({
                email,
                password
            })
            const savedUser = await newUser.save()
            return savedUser
        } catch (error: any) {
            return new Error(error)
        }
    },
    async deleteUser(_: any, { id }: { id: string }) {
        try {
            const userToDelete = await User.findById(id)
            await userToDelete.delete()
            const users = await User.find()
            return users
        } catch (error: any) {
            return new Error(error)
        }
    }
}

export const Query = {
    async getUser(_: any, { email }: { email: string }) {
        try {
            const user = await User.findOne({ email })
            if (user) {
                return user
            }
            throw new UserInputError("User Doesn't Exist ", {
                errors: {
                    user: 'No user found with those credentials'
                }
            })
        } catch (error: any) {
            throw new Error(error)
        }
    },
    async getAllUsers() {
        try {
            const users = await User.find()
            if (users?.length) {
                return users
            }
            throw new UserInputError('No Users ', {
                errors: {
                    user: 'No users found'
                }
            })
        } catch (error: any) {
            throw new Error(error)
        }
    }
}
