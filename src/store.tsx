import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import characterSlice from './reducers/characterSlice';
import attributeSlice from './reducers/attributeSlice';

const rootReducer = combineReducers({
    characters : characterSlice,
    attributes : attributeSlice,
})

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;