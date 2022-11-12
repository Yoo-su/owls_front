import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import postReducer from "./slice/postSlice";
import uiReducer from "./slice/uiSlice";

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    ui: uiReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;