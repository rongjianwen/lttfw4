import _ from 'lodash';
import { persistCombineReducers } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';

function createReducer(slice: any, persistConfig: any = null) {
    const defaultPersistConfig = {
        key: 'root',
        storage,
        stateReconciler: autoMergeLevel1,
        blacklist: []
    };

    const reducer: any = {};
    _.forEach(slice, (v: any, i: any) => {
        reducer[i] = v.reducer;
    });
    return persistCombineReducers(persistConfig || defaultPersistConfig, reducer);
}

export default createReducer;
