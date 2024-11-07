import { LOCAL_STORAGE_KEY } from './constants'

export const saveUserAndToken = (user, token) => {
    localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(user))
    localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token)
}

export const removeUserAndToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER)
    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN)
}

export const getStoredUser = () => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY.USER)
    return user ? JSON.parse(user) : null
}

export const formatPhoneNumber = (number) => {
    return number.startsWith('+') ? number : `+${number}`
}

export const validatePhoneNumbers = (numbers) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return numbers.every(number => phoneRegex.test(number))
}