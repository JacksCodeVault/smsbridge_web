import { LOCAL_STORAGE_KEY } from './constants'

export const saveUserAndToken = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export const removeUserAndToken = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
}

export const getStoredUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export const formatPhoneNumber = (number) => {
    return number.startsWith('+') ? number : `+${number}`
}

export const validatePhoneNumbers = (numbers) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return numbers.every(number => phoneRegex.test(number))
}

export const generateQRCode = (apiKey) => {
    return `smsbridge://link?key=${apiKey}`
}

export const formatDate = (date) => {
    return new Date(date).toLocaleString()
}

export const formatApiKeyData = (apiKey) => {
    return {
        key: apiKey.key.substring(0, 8) + '...',
        fullKey: apiKey.key,
        createdAt: formatDate(apiKey.createdAt),
        status: apiKey.active ? 'Active' : 'Revoked',
        deviceName: apiKey.deviceId ? 'Linked' : 'Not Linked'
    }
}

export const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatMessageStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
}

export const getStatusColor = (status) => {
    switch (status) {
        case 'delivered':
            return 'bg-green-100 text-green-800'
        case 'sent':
            return 'bg-blue-100 text-blue-800'
        case 'failed':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}
