
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FlightStateTypes } from '../types';

const initialState: FlightStateTypes = {
    FromWhereFlight: '',
    ToWhereFlight: '',
    DateFlight: 0,
    PersonsFlight: 0,
    PickedFlight: {
      img: '',
      companyTitle: '',
      travelTime: '',
      price: 0,
      duration: '',
      stop: '',
      stopTime: '',
    },
  };

const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        setFlight(state, action: PayloadAction<FlightStateTypes>) {
            state.FromWhereFlight = action.payload.FromWhereFlight;
            state.ToWhereFlight = action.payload.ToWhereFlight;
            state.DateFlight = action.payload.DateFlight;
            state.PersonsFlight = action.payload.PersonsFlight;
        },
        setPickedFlight(state,action: PayloadAction<typeof state.PickedFlight>) {
            state.PickedFlight.companyTitle = action.payload.companyTitle;
            state.PickedFlight.img = action.payload.img;
            state.PickedFlight.travelTime = action.payload.travelTime;
            state.PickedFlight.price = action.payload.price;
            state.PickedFlight.duration = action.payload.duration;
            state.PickedFlight.stop = action.payload.stop;
            state.PickedFlight.stopTime = action.payload.stopTime;
        }
    }
});

export const { setFlight, setPickedFlight } = flightSlice.actions;

export default flightSlice.reducer;
