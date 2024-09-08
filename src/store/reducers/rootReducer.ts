import { combineReducers } from '@reduxjs/toolkit';
import flightReducer from '../slices/flightSlice';
import passengerSlice from '../slices/passengerSlice';

const rootReducer = combineReducers({
    flight: flightReducer,
    passenger: passengerSlice,
});

export default rootReducer;