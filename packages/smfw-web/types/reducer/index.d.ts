/// <reference types="reduxjs-toolkit-persist/types/persistReducer" />
declare function createReducer(slice: any, persistConfig?: any): import("redux").Reducer<import("reduxjs-toolkit-persist/es/persistReducer").PersistPartial, import("redux").AnyAction>;
export default createReducer;
