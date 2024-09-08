import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PassengerStateType } from '../types';

const initialState = {
    pFirstName: '',
    pMiddleName: '',
    pLastName: '',
    suffix: '',
    birthDate: '',
    pEmail: '',
    pPhone: 0,
    pRedressPhone: 0,
    pKnowPhone: 0,
    pEmergencyFirstName: '',
    pEmergencyLastName: '',
    pEmergencyEmail: '',
    pEmergencyPhone: 0,
  };

const passengerSlice = createSlice({
    name: 'passenger',
    initialState,
    reducers: {
        setPassengerSlice(state, action: PayloadAction<PassengerStateType>) {
            state.pFirstName = action.payload.pFirstName;
            state.pMiddleName = action.payload.pMiddleName;
            state.pLastName = action.payload.pLastName;
            state.suffix = action.payload.suffix;
            state.birthDate = action.payload.birthDate;
            state.pEmail = action.payload.pEmail;
            state.pPhone = action.payload.pPhone;
            state.pRedressPhone = action.payload.pRedressPhone;
            state.pKnowPhone = action.payload.pKnowPhone;

            state.pEmergencyFirstName = action.payload.pEmergencyFirstName;
            state.pEmergencyLastName = action.payload.pEmergencyLastName;
            state.pEmergencyEmail = action.payload.pEmergencyEmail;
            state.pEmergencyPhone = action.payload.pEmergencyPhone;
        }
    }
});

export const { setPassengerSlice } = passengerSlice.actions;

export default passengerSlice.reducer;