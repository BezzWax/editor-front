import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  email: string
  username: string
}

interface AuthState {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout(state) {
      state.user = null
      state.token = null
    },
  },
})

export const { setAuthData, logout } = authSlice.actions
export default authSlice.reducer
