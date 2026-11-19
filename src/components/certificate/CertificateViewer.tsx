import React, { useRef } from 'react';
import { Certificate } from '../../types';
import { Award, CheckCircle, Printer, Download, ShieldCheck, Share2 } from 'lucide-react';
import { Button } from '../common/Button';

interface CertificateViewerProps {
  certificate: Certificate;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-emerald-600" />
          <span className="text-xs font-bold text-slate-700">
            Verified Credential: <span className="font-mono text-teal-600">{certificate.verificationCode}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // Create a canvas-based download
              const canvas = document.createElement('canvas');
              canvas.width = 1200;
              canvas.height = 800;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                // Background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, 1200, 800);

                // Outer double border
                ctx.lineWidth = 14;
                ctx.strokeStyle = '#1e1b4b';
                ctx.strokeRect(30, 30, 1140, 740);

                ctx.lineWidth = 2;
                ctx.strokeStyle = '#f59e0b';
                ctx.strokeRect(45, 45, 1110, 710);

                // Watermark header
                ctx.fillStyle = '#4f46e5';
                ctx.font = 'bold 20px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('EDUPATH INDIAN INSTITUTE OF TECHNOLOGY (BENGALURU)', 600, 140);

                // Title
                ctx.fillStyle = '#0f172a';
                ctx.font = 'bold 50px serif';
                ctx.fillText('Certificate of Completion', 600, 210);

                // Conferral
                ctx.fillStyle = '#64748b';
                ctx.font = '18px sans-serif';
                ctx.fillText('THIS IS PROUDLY CONFERRED UPON', 600, 280);

                // Student Name
                ctx.fillStyle = '#1e1b4b';
                ctx.font = 'bold 44px sans-serif';
                ctx.fillText(certificate.studentName, 600, 350);

                // Description
                ctx.fillStyle = '#334155';
                ctx.font = '18px sans-serif';
                ctx.fillText('for successfully fulfilling all curriculum requirements and laboratory examinations for:', 600, 420);

                // Course Title
                ctx.fillStyle = '#4338ca';
                ctx.font = 'bold 32px sans-serif';
                ctx.fillText(certificate.courseTitle, 600, 480);

                // Grade
                if (certificate.grade) {
                  ctx.fillStyle = '#059669';
                  ctx.font = 'bold 20px sans-serif';
                  ctx.fillText(certificate.grade, 600, 540);
                }

                // Signatures
                ctx.fillStyle = '#0f172a';
                ctx.font = 'italic 24px serif';
                ctx.fillText(certificate.instructorName, 300, 670);
                ctx.font = 'bold 14px sans-serif';
                ctx.fillText('Lead Instructor', 300, 695);

                ctx.font = 'bold 16px monospace';
                ctx.fillText(certificate.issueDate, 900, 670);
                ctx.font = 'bold 14px sans-serif';
                ctx.fillText(`ID: ${certificate.verificationCode}`, 900, 695);

                // Trigger download
                const link = document.createElement('a');
                link.download = `EduPath-Certificate-${certificate.studentName.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
              }
            }}
            leftIcon={<Download size={14} />}
          >
            Download PNG
          </Button>
          <Button size="sm" variant="outline" onClick={handlePrint} leftIcon={<Printer size={14} />}>
            Print / PDF
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Certificate verification URL copied to clipboard!');
            }}
            leftIcon={<Share2 size={14} />}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Official Certificate Visual Canvas Card */}
      <div
        ref={certificateRef}
        className="relative bg-gradient-to-br from-amber-50/40 via-white to-teal-50/40 rounded-3xl p-8 sm:p-14 border-8 border-double border-teal-950/20 shadow-2xl text-center overflow-hidden max-w-4xl mx-auto"
      >
        {/* Subtle decorative background watermark / borders */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-teal-200/50 pointer-events-none rounded-2xl" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-teal-500/5 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-amber-500/5 blur-2xl" />

        {/* Certificate Header */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 mb-4">
            <Award size={36} />
          </div>
          <span className="text-xs font-black tracking-widest text-teal-700 uppercase">
            EduPath Indian Institute of Technology (Bengaluru)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-serif tracking-tight">
            Certificate of Completion
          </h2>
          <div className="w-24 h-1 bg-amber-500 rounded-full mt-3 mb-6" />
        </div>

        {/* Recipient Section */}
        <div className="relative z-10 space-y-3 my-6">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            This is proudly conferred upon
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-950 underline decoration-teal-300 underline-offset-8">
            {certificate.studentName}
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto pt-4 leading-relaxed">
            for successfully fulfilling all curriculum requirements, continuous hands-on laboratory exercises, and capstone examinations for:
          </p>
          <h4 className="text-xl sm:text-2xl font-bold text-slate-900 pt-2">
            {certificate.courseTitle}
          </h4>
          {certificate.grade && (
            <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 inline-block px-3 py-1 rounded-full border border-emerald-200">
              {certificate.grade}
            </p>
          )}
        </div>

        {/* Signatures & Seal */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 mt-8 border-t border-slate-200 items-end">
          <div className="text-center">
            <div className="font-serif italic text-lg text-slate-800 border-b border-slate-300 pb-1">
              {certificate.instructorName}
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">Lead Instructor</p>
            <p className="text-[10px] text-slate-400">EduPath Academy</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-amber-500 bg-amber-50/50 flex flex-col items-center justify-center text-amber-700 shadow-inner">
              <CheckCircle size={22} className="text-amber-600" />
              <span className="text-[8px] font-black uppercase tracking-tighter mt-0.5">Verified</span>
              <span className="text-[7px] text-amber-800">EduPath Seal</span>
            </div>
          </div>

          <div className="text-center">
            <div className="font-mono text-sm text-slate-800 border-b border-slate-300 pb-1">
              {certificate.issueDate}
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">Date of Issuance</p>
            <p className="text-[10px] font-mono text-slate-400">ID: {certificate.verificationCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

