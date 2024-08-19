import axios from "axios"

const authAxios = axios.create({
    baseURL: 'https://dummyjson.com/auth'
})

export const loginAPI = async ({username, password}) => {
    const response = await authAxios({
        method: 'POST',
        url: '/login',
        headers: { 'Content-Type': 'application/json' },
        data: {
            username,
            password,
            expiresInMins: 1,
        }
    })

    return response
}

export const getUserAPI = async (token) => {
    const response = await authAxios({
        method: 'GET',
        url: '/me',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
    })

    return response
}

export const refreshTokenAPI = async (refreshToken) => {
    const response = await authAxios({
        method: 'POST',
        url: '/refresh',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            refreshToken: refreshToken,
            expiresInMins: 1,
        }
    })

    return response
}