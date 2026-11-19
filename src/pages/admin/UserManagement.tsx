import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateUserStatus, deleteUser } from '../../redux/slices/authSlice';
import { Button } from '../../components/common/Button';
import { UserAvatar } from '../../components/common/UserAvatar';
import { UserRole } from '../../types';
import {
  Users,
  Search,
  Shield,
  Trash2,
  CheckCircle,
  Ban,
  UserCheck,
  UserX,
  Filter,
} from 'lucide-react';

export const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.auth);

  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    dispatch(updateUserStatus({ userId, status: nextStatus }));
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user profile?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">User Management Center</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Oversee registered students, certified instructors, and system administrators.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Role Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                All ({users.length})
              </button>
              <button
                onClick={() => setRoleFilter('student')}
                className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === 'student' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                Students ({users.filter((u) => u.role === 'student').length})
              </button>
              <button
                onClick={() => setRoleFilter('instructor')}
                className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === 'instructor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                Instructors ({users.filter((u) => u.role === 'instructor').length})
              </button>
              <button
                onClick={() => setRoleFilter('admin')}
                className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === 'admin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                Admins
              </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 pl-6">User Profile</th>
                  <th className="py-3.5">Assigned Role</th>
                  <th className="py-3.5">Member Since</th>
                  <th className="py-3.5">Status</th>
                  <th className="py-3.5 pr-6 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} role={user.role} size="md" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                          <p className="text-[11px] text-slate-400">{user.email}</p>
                          {user.title && (
                            <p className="text-[10px] text-teal-600 truncate max-w-xs">{user.title}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 font-bold text-xs capitalize">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full ${user.role === 'admin'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : user.role === 'instructor'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 text-slate-500 font-mono text-[11px]">{user.joinedDate}</td>

                    <td className="py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${user.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="py-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${user.status === 'active'
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                      >
                        {user.status === 'active' ? (
                          <>
                            <Ban size={12} /> Suspend
                          </>
                        ) : (
                          <>
                            <CheckCircle size={12} /> Unban
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete user profile"
                      >
                        <Trash2 size={14} />
                      </button>
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

