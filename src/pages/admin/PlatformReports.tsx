import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';
import { useAppSelector } from '../../redux/store';
import {
  FileText,
  Download,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Server,
  Zap,
} from 'lucide-react';

export const PlatformReports: React.FC = () => {
  const { certificates } = useAppSelector((state) => state.enrollment);
  const { courses } = useAppSelector((state) => state.courses);

  const reportItems = [
    {
      title: 'Q4 Global Learner Retention & Completion Audit',
      description: 'Comprehensive analysis of video lecture retention, quiz completion rates, and certificate issuances.',
      date: 'Generated today',
      size: '3.4 MB',
      type: 'PDF',
    },
    {
      title: 'Instructor Revenue Disbursements & Tax 1099 Summary',
      description: 'Breakdown of gross sales, net commission withholding, and verified instructor payouts.',
      date: 'Generated Nov 14, 2024',
      size: '1.8 MB',
      type: 'XLSX',
    },
    {
      title: 'Curriculum Quality & Accreditation Standards Report',
      description: 'Audit of course reviews, student satisfaction scores, and technical exam difficulty benchmarks.',
      date: 'Generated Nov 10, 2024',
      size: '4.2 MB',
      type: 'PDF',
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Reports & Audit Logs</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Download system-wide telemetry, accreditation summaries, and financial audit files.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => alert('Generating full platform report bundle...')}
            leftIcon={<Download size={14} />}
          >
            Generate New Audit
          </Button>
        </div>

        {/* System Health Overview */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-base font-bold flex items-center gap-2 mb-4">
            <Server size={18} className="text-teal-400" />
            Infrastructure & Verification Health
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 block font-semibold">API Availability</span>
              <span className="text-emerald-400 font-extrabold text-lg flex items-center gap-1.5">
                <Zap size={16} /> 99.98%
              </span>
              <span className="text-slate-400 text-[11px]">All microservices nominal</span>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 block font-semibold">Total Verified Credentials</span>
              <span className="text-amber-300 font-extrabold text-lg flex items-center gap-1.5">
                <Award size={16} /> {certificates.length} Issued
              </span>
              <span className="text-slate-400 text-[11px]">Cryptographically verifiable</span>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 block font-semibold">Active Course Catalog</span>
              <span className="text-teal-300 font-extrabold text-lg flex items-center gap-1.5">
                <CheckCircle size={16} /> {courses.length} Published
              </span>
              <span className="text-slate-400 text-[11px]">100% video playback verified</span>
            </div>
          </div>
        </div>

        {/* Audit Reports List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-base font-bold text-slate-900">Official System Reports</h3>
          <div className="divide-y divide-slate-100">
            {reportItems.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span className="font-bold uppercase text-teal-600">{item.type}</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => alert(`Downloaded ${item.title}`)}
                  leftIcon={<Download size={14} />}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

