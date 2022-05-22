import { VALID_EMAIL, VALID_PASSWORD } from './regex'

interface validationReturnProps {
    valid: boolean
    errors: {
        password: string | null
        email: string | null
    }
}
export const validateAuthUser = (
    email: string,
    password: string
): validationReturnProps => {
    const errors = {
        email: '',
        password: ''
    }

    if (email.trim() === '') {
        errors.email = 'Email is required'
    } else if (!VALID_EMAIL.test(email)) {
        errors.email = 'Invalid email'
    }

    if (password.trim() === '') {
        errors.password = 'A password is required'
    } else if (VALID_PASSWORD.test(password)) {
        errors.password = 'Invalid password'
    }

    const isValid = Object.values(errors).some(value => value !== '')
    return {
        valid: isValid,
        errors
    }
}
