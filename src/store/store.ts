

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
    reducer: rootReducer,
    // Optional: Add middleware here if needed, such as `redux-thunk`
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export a typed version of the `useDispatch` hook
export const useAppDispatch: () => AppDispatch = useDispatch;

// Export the store
export default store;
