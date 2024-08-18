import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const createAuthSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

const userSlice = createAuthSlice({
    name: "user",
    initialState: {},
    reducers: (create) => {

    }
})

export const selectUser = state => state.user
export const {reducer: userReducer, actions: userActions} = userSlice