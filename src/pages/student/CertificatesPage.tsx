import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppSelector } from '../../redux/store';
import { CertificateViewer } from '../../components/certificate/CertificateViewer';
import { Modal } from '../../components/common/Modal';
import { Certificate } from '../../types';
import { Award, Eye, Download, ShieldCheck, Calendar, BookOpen } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const CertificatesPage: React.FC = () => {
  const { certificates } = useAppSelector((state) => state.enrollment);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Earned Certificates</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official verifiable credentials issued upon passing 100% of curriculum lectures and capstone exams.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
            <Award size={44} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No certificates earned yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Finish 100% of your course chapters and pass the final knowledge checks to unlock your accredited certificate.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Award size={24} />
                    </div>
                    <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md font-semibold border border-teal-200">
                      {cert.verificationCode}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mt-4 leading-snug">
                    {cert.courseTitle}
                  </h3>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <p className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      Recipient: <span className="font-semibold text-slate-800">{cert.studentName}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      Issued: <span className="text-slate-700">{cert.issueDate}</span>
                    </p>
                    {cert.grade && (
                      <p className="text-emerald-600 font-semibold">{cert.grade}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    className="flex-1"
                    onClick={() => setSelectedCert(cert)}
                    leftIcon={<Eye size={14} />}
                  >
                    View Official Certificate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Viewer */}
        <Modal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          title="Official Certificate of Completion"
          maxWidth="4xl"
        >
          {selectedCert && <CertificateViewer certificate={selectedCert} />}
        </Modal>
      </div>
    </DashboardLayout>
  );
};

