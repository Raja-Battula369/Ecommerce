import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features';

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';




const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persiststore = persistStore(store);