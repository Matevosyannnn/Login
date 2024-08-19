import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { loginAPI } from "../API/userAPI";

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
        )
    })
})

export const selectUser = state => state.user
export const {reducer: userReducer, actions: userActions} = userSlice