import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: number
  email: string
  username: string
}

interface AuthState {
  user: User | null
  access_token: string | null
}

const initialState: AuthState = {
  user: null,
  access_token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<AuthState>) {
      console.log(action)
      state.user = action.payload.user
      state.access_token = action.payload.access_token

      localStorage.setItem('token', action.payload.access_token || '')
    },
    logout(state) {
      state.user = null
      state.access_token = null
    },
  },
})

export const { setAuthData, logout } = authSlice.actions
export default authSlice.reducer
