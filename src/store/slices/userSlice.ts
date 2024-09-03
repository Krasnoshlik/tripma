
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string;
    email: string;
}

const initialState: UserState = {
    name: '',
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        clearUser(state) {
            state.name = '';
            state.email = '';
        }
    }
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
