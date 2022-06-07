import jwt from 'jsonwebtoken'

export const generateToken = (user: any) => {
    const userData = {
        id: user._id,
        email: user.email,
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        dob: user?.dob ?? null,
        gender: user?.gender ?? '',
        height: user?.height ?? null,
        weight: user?.weight ?? null,
        goalWeight: user?.goalWeight ?? null,
        bodyFat: user?.bodyFat ?? null,
        goalBodyFat: user?.goalBodyFat ?? null,
        activityLevel: user?.activityLevel ?? ''
    }

    return jwt.sign({ ...userData }, process.env?.TOKEN_SECRET ?? '', {
        expiresIn: process.env?.TOKEN_EXPIRE ?? '24hr'
    })
}

export const generateResetPwToken = (user: any) => {
    const userData = {
        id: user._id,
        email: user.email,
        password: user.password,
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? ''
    }

    return jwt.sign({ ...userData }, process.env?.TOKEN_SECRET ?? '', {
        expiresIn: process.env?.TOKEN_EXPIRE ?? '1hr'
    })
}
