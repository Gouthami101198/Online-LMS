import React, { useState } from 'react';
import { ResourceItem } from '../../types';
import { Download, FileText, ExternalLink, Code, Check } from 'lucide-react';

interface LessonResourcesTabProps {
  resources?: ResourceItem[];
}

export const LessonResourcesTab: React.FC<LessonResourcesTabProps> = ({ resources = [] }) => {
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleDownload = (res: ResourceItem) => {
    setDownloadedIds((prev) => [...prev, res.id]);
    // Simulate instantaneous download trigger
    const link = document.createElement('a');
    link.href = '#';
    link.download = res.title;
    // Show quick feedback
    setTimeout(() => {
      setDownloadedIds((prev) => prev.filter((id) => id !== res.id));
    }, 2500);
  };

  if (!resources || resources.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400 text-xs">
        No downloadable assets for this specific lecture.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500 mb-2">
        Click below to download supplementary code files, slides, and cheat sheets.
      </p>
      {resources.map((item) => {
        const isDownloaded = downloadedIds.includes(item.id);
        const Icon = item.type === 'code' ? Code : item.type === 'link' ? ExternalLink : FileText;

        return (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 bg-white border border-slate-200/80 rounded-xl hover:border-teal-300 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">{item.title}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="uppercase font-semibold">{item.type}</span>
                  {item.fileSize && <span>• {item.fileSize}</span>}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(item)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isDownloaded
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-teal-50 hover:bg-teal-100 text-teal-700'
              }`}
            >
              {isDownloaded ? <Check size={13} /> : <Download size={13} />}
              {isDownloaded ? 'Downloaded' : 'Download'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

