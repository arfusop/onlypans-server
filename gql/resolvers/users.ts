import { UserInputError } from 'apollo-server'
import bcrypt from 'bcryptjs'

import User from '../../models/User'
import { validateAuthUser } from '../../utils/validators'
import { VALID_PASSWORD } from '../../utils/regex'
import { generateToken } from '../../utils/token'

export const Mutation = {
    async register(
        _: any,
        { email, password }: { email: string; password: string },
        context: any
    ) {
        try {
            const { valid, errors } = validateAuthUser(email, password)
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
            const salt = bcrypt.genSaltSync()
            const hashedPw = bcrypt.hashSync(password, salt)
            const newUser = new User({
                email,
                password: hashedPw
            })
            const savedUser = await newUser.save()
            const token = generateToken(savedUser)
            return { ...savedUser._doc, id: savedUser._id, token }
        } catch (error: any) {
            return new Error(error)
        }
    },
    async login(
        _: any,
        { email, password }: { email: string; password: string }
    ) {
        const { errors, valid } = validateAuthUser(email, password)
        if (!valid) {
            throw new UserInputError('Login Error', { errors })
        }

        try {
            const sanitizedEmail = email.toLowerCase()
            const user = await User.findOne({ email: sanitizedEmail })

            if (!user) {
                throw new UserInputError('Not Found', {
                    errors: { general: 'User not found' }
                })
            }

            const passwordMatches = await bcrypt.compare(
                password,
                user.password
            )
            if (!passwordMatches) {
                throw new UserInputError('Wrong password', {
                    errors: {
                        general: 'Invalid credentials'
                    }
                })
            }

            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        } catch (error: any) {
            return new Error(error)
        }
    },
    async updateUser(
        _: any,
        {
            firstName,
            lastName,
            dob,
            gender,
            height,
            weight,
            goalWeight,
            bodyFat,
            goalBodyFat,
            activityLevel,
            email
        }: {
            email: string
            firstName: string
            lastName: string
            dob: Date
            gender: string
            height: number
            weight: number
            goalWeight: number
            bodyFat: number
            goalBodyFat: number
            activityLevel: string
        }
    ) {
        if (!email) {
            throw new UserInputError('Invalid Credentials', {
                errors: {
                    general: 'Email is required'
                }
            })
        }

        try {
            const sanitizedEmail = email.toLowerCase()
            const user = await User.findOne({ email: sanitizedEmail })

            if (!user) {
                throw new UserInputError('Not Found', {
                    errors: { general: 'User not found' }
                })
            }

            user.firstName = firstName ?? user.firstName
            user.lastName = lastName ?? user.lastName
            user.dob = dob ?? user.dob
            user.gender = gender ?? user.gender
            user.height = height ?? user.height
            user.weight = weight ?? user.weight
            user.goalWeight = goalWeight ?? user.goalWeight
            user.bodyFat = bodyFat ?? user.bodyFat
            user.goalBodyFat = goalBodyFat ?? user.goalBodyFat
            user.activityLevel = activityLevel ?? user.activityLevel

            const updated = await user.save()
            const token = generateToken(user)
            return { ...updated._doc, id: updated._id, token }
        } catch (error: any) {
            return new Error(error)
        }
    },
    async updatePassword(
        _: any,
        {
            email,
            password,
            newPassword
        }: {
            email: string
            password: string
            newPassword: string
        }
    ) {
        if (!VALID_PASSWORD.test(newPassword)) {
            throw new UserInputError('Invalid Credentials', {
                errors: {
                    password: 'Invalid password'
                }
            })
        }

        const { errors, valid } = validateAuthUser(email, password)
        if (!valid) {
            throw new UserInputError('Login Error', { errors })
        }
        try {
            const sanitizedEmail = email.toLocaleLowerCase()
            const user = await User.findOne({ email: sanitizedEmail })

            if (!user) {
                throw new UserInputError('Not Found', {
                    errors: { general: 'User not found' }
                })
            }

            const salt = bcrypt.genSaltSync()
            const hashedPw = bcrypt.hashSync(password, salt)
            user.password = hashedPw

            const updated = await user.save()
            const token = generateToken(user)

            return { ...updated._doc, id: updated._id, token }
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
