import jwt from 'jsonwebtoken'

export const generateToken = (user: any) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? ''
        },
        process.env?.TOKEN_SECRET ?? '',
        { expiresIn: process.env?.TOKEN_EXPIRE ?? '24hr' }
    )
}
