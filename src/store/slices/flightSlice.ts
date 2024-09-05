
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlightState } from '../types';

const initialState: FlightState = {
    FromWhereFlight: '',
    ToWhereFlight: '',
    DateFlight: 0,
    PersonsFlight: 0,
};

const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        setFlight(state, action: PayloadAction<FlightState>) {
            state.FromWhereFlight = action.payload.FromWhereFlight;
            state.ToWhereFlight = action.payload.ToWhereFlight;
            state.DateFlight = action.payload.DateFlight;
            state.PersonsFlight = action.payload.PersonsFlight;
        },
    }
});

export const { setFlight } = flightSlice.actions;

export default flightSlice.reducer;
