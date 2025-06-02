import { User } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});


export const {
  loginSuccess,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
