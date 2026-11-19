import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RevenueRecord, CategoryDistribution } from '../../types';
import { INITIAL_REVENUE_ANALYTICS, INITIAL_CATEGORY_DISTRIBUTION } from '../../api/mockData';

interface AdminState {
  revenueHistory: RevenueRecord[];
  categoryDistribution: CategoryDistribution[];
  platformCommissionPercent: number;
  totalPayouts: number;
}

const initialState: AdminState = {
  revenueHistory: INITIAL_REVENUE_ANALYTICS,
  categoryDistribution: INITIAL_CATEGORY_DISTRIBUTION,
  platformCommissionPercent: 15,
  totalPayouts: 184500,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateCommission: (state, action: PayloadAction<number>) => {
      state.platformCommissionPercent = action.payload;
    },
    addRevenueRecord: (state, action: PayloadAction<RevenueRecord>) => {
      state.revenueHistory.push(action.payload);
    },
  },
});

export const { updateCommission, addRevenueRecord } = adminSlice.actions;
export default adminSlice.reducer;

