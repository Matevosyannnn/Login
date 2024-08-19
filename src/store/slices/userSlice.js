import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { getUserAPI, loginAPI, refreshTokenAPI } from "../API/userAPI";

const createAuthSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

const userSlice = createAuthSlice({
    name: "user",
    initialState: null,
    reducers: (create) => ({
        logOut: (state) => {
            localStorage.clear()
            return state = null
        },
        login: create.asyncThunk(
            async (data, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI
                try {
                    const response = await loginAPI(data)
                    dispatch(userActions.getUser(response.data.token))
                    return response.data
                } catch (error) {
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, {payload}) => {
                    localStorage.setItem('token', payload.token)
                    localStorage.setItem('refreshToken', payload.refreshToken)
                },
            },
        ),
        getUser: create.asyncThunk(
            async (data, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI
                try {
                    const response = await getUserAPI(data)
                    return response.data
                } catch (error) {
                    if (error.response.status === 401) {
                        dispatch(userActions.refreshToken(localStorage.getItem('refreshToken')))
                    }
                    
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, {payload}) => {
                    return state = payload
                }
            }
        ),
        refreshToken: create.asyncThunk(
            async (data, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI
                try {
                    const response = await refreshTokenAPI(data)
                    return response.data
                } catch (error) {
                    dispatch(userActions.logOut())
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, {payload}) => {
                    localStorage.setItem('token', payload.token)
                }
            }
        )
    })
})

export const selectUser = state => state.user
export const {reducer: userReducer, actions: userActions} = userSlice