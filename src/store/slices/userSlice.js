import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { getUserAPI, loginAPI } from "../API/userAPI";

const createAuthSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

const userSlice = createAuthSlice({
    name: "user",
    initialState: {},
    reducers: (create) => ({
        login: create.asyncThunk(
            async (data, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI
                try {
                    const response = await loginAPI(data)
                    dispatch(userActions.getUser(response.data.token))
                    return response
                } catch (error) {

                }
            },
            {
                fulfilled: (state, {payload}) => {
                    localStorage.setItem('token', payload.data.token)
                    localStorage.setItem('refreshToken', payload.data.refreshToken)
                },
            },
        ),
        getUser: create.asyncThunk(
            async (data, thunkAPI) => {
                const { dispatch, rejectWithValue } = thunkAPI
                try {
                    const response = await getUserAPI(data)
                    return response
                } catch (error) {
                    
                }
            },
            {
                fulfilled: (state, {payload}) => {
                    return state = payload.data
                }
            }
        )
    })
})

export const selectUser = state => state.user
export const {reducer: userReducer, actions: userActions} = userSlice