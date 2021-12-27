import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';

import * as defaultSlices from '../../slices';
import * as appSlices from '../slices';
import createStore from '../../store';
import createReducer from '../../reducer';

const mode = process.env.mode ? process.env.mode : 'development';
const middlewares = mode === 'development' ? [thunk, logger] : [thunk];

const rootPersistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    blacklist: ['navMenu', 'extraMenu', 'sideMenu']
};

const store = createStore(createReducer({ ...defaultSlices, ...appSlices }, rootPersistConfig), middlewares);

export default store;
