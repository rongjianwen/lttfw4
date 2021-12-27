import _ from 'lodash';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';

function createStore(rootReducer: any, middleware: any = null) {
    return configureStore({
        reducer: rootReducer,
        middleware:
            middleware ||
            getDefaultMiddleware({
                serializableCheck: {
                    /* ignore persistance actions */
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            }),
        devTools: process.env.NODE_ENV === 'development'
    });
}

export default createStore;
