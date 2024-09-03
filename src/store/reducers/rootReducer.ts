import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';

// Combine your reducers
const rootReducer = combineReducers({
    user: userReducer,
    // Add more slice reducers here as needed
});

export default rootReducer;