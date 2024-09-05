
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import flightReducer from './reducers/flightReducer';

const store = configureStore({
    reducer: {
        flight: flightReducer,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
