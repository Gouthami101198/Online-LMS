import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '../../types';
import { INITIAL_USERS } from '../../api/mockData';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  users: User[];
  token: string | null;
}

// Safely load any active session from localStorage
const loadSavedAuth = (): { currentUser: User | null; isAuthenticated: boolean; activeRole: UserRole; token: string | null } => {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('edupath_auth') : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.currentUser && parsed?.isAuthenticated) {
        return {
          currentUser: parsed.currentUser,
          isAuthenticated: true,
          activeRole: parsed.activeRole || 'student',
          token: parsed.token || 'mock-jwt-token-edupath',
        };
      }
    }
  } catch (e) {
    // ignore
  }
  return {
    currentUser: null,
    isAuthenticated: false,
    activeRole: 'student',
    token: null,
  };
};

// Default to unauthenticated so user sees the login page first
const getInitialState = (): AuthState => {
  const saved = loadSavedAuth();
  return {
    currentUser: saved.currentUser,
    isAuthenticated: saved.isAuthenticated,
    activeRole: saved.activeRole,
    users: INITIAL_USERS,
    token: saved.token,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    login: (state, action: PayloadAction<{ email: string; role?: UserRole }>) => {
      const found = state.users.find(u => u.email.toLowerCase() === action.payload.email.toLowerCase());
      if (found) {
        state.currentUser = found;
        state.activeRole = found.role;
      } else {
        // fallback create demo session
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: action.payload.email.split('@')[0],
          email: action.payload.email,
          avatar: '',
          role: action.payload.role || 'student',
          joinedDate: new Date().toISOString().split('T')[0],
          status: 'active',
        };
        state.users.push(newUser);
        state.currentUser = newUser;
        state.activeRole = newUser.role;
      }
      state.isAuthenticated = true;
      state.token = 'mock-jwt-token-edupath';
      try {
        localStorage.setItem(
          'edupath_auth',
          JSON.stringify({
            currentUser: state.currentUser,
            isAuthenticated: true,
            activeRole: state.activeRole,
            token: state.token,
          })
        );
      } catch (e) {
        // ignore
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      try {
        localStorage.removeItem('edupath_auth');
      } catch (e) {
        // ignore
      }
    },
    switchRole: (state, action: PayloadAction<UserRole>) => {
      state.activeRole = action.payload;
      // Find a matching user profile for this role if current user is not in that role
      const matchedUser = state.users.find(u => u.role === action.payload);
      if (matchedUser) {
        state.currentUser = matchedUser;
      } else if (state.currentUser) {
        state.currentUser.role = action.payload;
      }
      try {
        localStorage.setItem(
          'edupath_auth',
          JSON.stringify({
            currentUser: state.currentUser,
            isAuthenticated: state.isAuthenticated,
            activeRole: state.activeRole,
            token: state.token,
          })
        );
      } catch (e) {
        // ignore
      }
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        // also sync in users array
        const idx = state.users.findIndex(u => u.id === state.currentUser?.id);
        if (idx !== -1) {
          state.users[idx] = { ...state.users[idx], ...action.payload };
        }
      }
    },
    updateUserStatus: (state, action: PayloadAction<{ userId: string; status: 'active' | 'suspended' | 'pending' }>) => {
      const user = state.users.find(u => u.id === action.payload.userId);
      if (user) {
        user.status = action.payload.status;
      }
      if (state.currentUser && state.currentUser.id === action.payload.userId) {
        state.currentUser.status = action.payload.status;
      }
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    }
  },
});

export const { login, logout, switchRole, updateProfile, updateUserStatus, addUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;

