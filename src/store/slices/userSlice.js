import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { getUserAPI, loginAPI, refreshTokenAPI } from "../API/userAPI";
import handleErrorMessage from "../../utils/handleErrorMessage";

const createAuthSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

const userSlice = createAuthSlice({
    name: "user",
    initialState: {
        user: null,
        error: '',
    },
    selectors: {
        selectUser: (state) => state.user,
        selectError: (state) => state.error,
    },
    reducers: (create) => ({
        setError: (state, {payload}) => {
            state.error = payload
        },
        logOut: (state) => {
            localStorage.clear()
            state.user = null
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
                    state.error = ''
                },
                rejected: (state, {payload}) => {    
                    state.error = handleErrorMessage(payload)
                }
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
                    state.user = payload
                }
            }
        ),
        refreshToken: create.asyncThunk(
            async (data, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI
                try {
                    const response = await refreshTokenAPI(data)
                    dispatch(userActions.getUser(response.data.token))
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

export const { selectError, selectUser } = userSlice.selectors
export const {reducer: userReducer, actions: userActions} = userSlice