import { combineReducers } from '@reduxjs/toolkit';
import flightReducer from '../slices/flightSlice';

const rootReducer = combineReducers({
    flight: flightReducer,
});

export default rootReducer;