import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {calculationsSlice} from "redux/calculationsSlice";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    calculations: calculationsSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)