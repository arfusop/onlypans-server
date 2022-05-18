import { VALID_EMAIL, VALID_PASSWORD } from './regex'

interface validateRegisterUserProps {
    valid: boolean
    errors: {
        password: string | null
        email: string | null
    }
}
export const validateRegisterUser = (
    email: string,
    password: string
): validateRegisterUserProps => {
    const errors = {
        email: '',
        password: ''
    }

    if (email.trim() === '') {
        errors.email = 'Email is required'
    } else if (!VALID_EMAIL.test(email)) {
        errors.email = 'Invalid email'
    }
    console.log('valid password: ', VALID_PASSWORD.test(password))
    if (password.trim() === '') {
        errors.password = 'A password is required'
    } else if (VALID_PASSWORD.test(password)) {
        errors.password = 'Invalid password'
    }

    const isValid = Object.values(errors).some(value => value !== '')
    console.log('isValid: ', isValid)
    return {
        valid: isValid,
        errors
    }
}
