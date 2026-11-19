import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateCommission } from '../../redux/slices/adminSlice';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { formatINR } from '../../utils/formatCurrency';
import {
  DollarSign,
  CreditCard,
  Percent,
  CheckCircle,
  Download,
  Calendar,
  Search,
  TrendingUp,
} from 'lucide-react';

export const EnrollmentRevenue: React.FC = () => {
  const dispatch = useAppDispatch();
  const { revenueHistory, platformCommissionPercent } = useAppSelector((state) => state.admin);

  const [commissionInput, setCommissionInput] = useState(platformCommissionPercent);
  const [savedFee, setSavedFee] = useState(false);

  const totalGMV = revenueHistory.reduce((acc, r) => acc + r.revenue, 0);
  const netPlatformRevenue = Math.round(totalGMV * (platformCommissionPercent / 100));
  const instructorPayouts = totalGMV - netPlatformRevenue;

  // Mock Transactions Table with Indian student accounts
  const transactions = [
    {
      id: 'tx-98214',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@example.com',
      courseTitle: 'Full-Stack React 18, Next.js & TypeScript Mastery',
      amount: 2499,
      platformFee: 374.85,
      instructorShare: 2124.15,
      date: '2024-11-12 14:22',
      status: 'Settled',
    },
    {
      id: 'tx-98215',
      studentName: 'Tanvi Kulkarni',
      studentEmail: 'tanvi.k@example.com',
      courseTitle: 'Generative AI & Machine Learning with Python',
      amount: 3499,
      platformFee: 524.85,
      instructorShare: 2974.15,
      date: '2024-11-10 18:05',
      status: 'Settled',
    },
    {
      id: 'tx-98216',
      studentName: 'Rohan Deshmukh',
      studentEmail: 'rohan.d@example.com',
      courseTitle: 'Modern UI/UX Design Systems with Figma',
      amount: 1999,
      platformFee: 299.85,
      instructorShare: 1699.15,
      date: '2024-11-08 09:30',
      status: 'Settled',
    },
    {
      id: 'tx-98217',
      studentName: 'Aditi Sundaram',
      studentEmail: 'aditi.s@example.com',
      courseTitle: 'Cloud Native DevOps: Kubernetes & AWS',
      amount: 2999,
      platformFee: 449.85,
      instructorShare: 2549.15,
      date: '2024-11-07 16:40',
      status: 'Settled',
    },
  ];

  const handleUpdateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateCommission(commissionInput));
    setSavedFee(true);
    setTimeout(() => setSavedFee(false), 3000);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Financial & Revenue Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Platform gross merchandizing value, commission distributions, and payout settlements.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <StatCard
            title="Total Gross Revenue (GMV)"
            value={formatINR(totalGMV * 10)}
            change="+18.9% QoQ"
            isPositive={true}
            subtitle="All processed course enrollments in ₹"
            icon={<TrendingUp size={18} />}
            iconColor="bg-emerald-50 text-emerald-700 border border-emerald-200/60"
          />
          <StatCard
            title="Net Platform Revenue"
            value={formatINR(netPlatformRevenue * 10)}
            subtitle={`At ${platformCommissionPercent}% platform commission`}
            icon={<Percent size={18} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
          <StatCard
            title="Instructor Payouts"
            value={formatINR(instructorPayouts * 10)}
            subtitle="Disbursed to certified educators"
            icon={<CreditCard size={18} />}
            iconColor="bg-amber-50 text-amber-700 border border-amber-200/60"
          />
        </div>

        {/* Commission Configuration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Platform Commission Rate</h3>
              <p className="text-xs text-slate-500">
                Determines percentage retained by the LMS on each verified course transaction.
              </p>
            </div>

            <form onSubmit={handleUpdateCommission} className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="number"
                  min={5}
                  max={50}
                  value={commissionInput}
                  onChange={(e) => setCommissionInput(parseInt(e.target.value) || 0)}
                  className="w-24 px-3 py-2 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-right pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  %
                </span>
              </div>
              <Button type="submit" size="sm" variant="primary">
                Update Rate
              </Button>
            </form>
          </div>
          {savedFee && (
            <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle size={14} /> Platform commission rate updated successfully!
            </p>
          )}
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Enrollment Transactions</h3>
              <p className="text-xs text-slate-500">Live payment audit trail</p>
            </div>
            <button
              onClick={() => alert('Simulated CSV ledger export downloaded!')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              <Download size={13} /> Export Ledger (CSV)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Transaction ID</th>
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Course Purchased</th>
                  <th className="pb-3">Gross</th>
                  <th className="pb-3">Platform ({platformCommissionPercent}%)</th>
                  <th className="pb-3">Instructor</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 pl-2 font-mono font-semibold text-slate-800">{tx.id}</td>
                    <td className="py-3.5">
                      <p className="font-bold text-slate-900">{tx.studentName}</p>
                      <span className="text-[10px] text-slate-400">{tx.studentEmail}</span>
                    </td>
                    <td className="py-3.5 text-slate-700 font-medium max-w-xs truncate">{tx.courseTitle}</td>
                    <td className="py-3.5 font-bold text-slate-900">{formatINR(tx.amount)}</td>
                    <td className="py-3.5 font-semibold text-teal-600">{formatINR(tx.platformFee)}</td>
                    <td className="py-3.5 font-semibold text-emerald-600">{formatINR(tx.instructorShare)}</td>
                    <td className="py-3.5 text-slate-400 font-mono text-[11px]">{tx.date}</td>
                    <td className="py-3.5 pr-2 text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

