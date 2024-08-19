import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'user/login/rejected', 
                    'user/getUser/rejected',
                    'user/refreshToken/rejected',
                ],
            },
        }),

    ]
})

export default store