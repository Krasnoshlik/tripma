import { combineReducers } from '@reduxjs/toolkit';
import passengerReducer from '../slices/passengerSlice';
import flightReducer from '../slices/flightSlice';

const rootReducer = combineReducers({
  passenger: passengerReducer,
  flight: flightReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;