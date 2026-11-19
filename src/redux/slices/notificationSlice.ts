import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types';
import { INITIAL_NOTIFICATIONS } from '../../api/mockData';

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: INITIAL_NOTIFICATIONS,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find(n => n.id === action.payload);
      if (notif) {
        notif.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => {
        n.read = true;
      });
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
