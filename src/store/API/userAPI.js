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