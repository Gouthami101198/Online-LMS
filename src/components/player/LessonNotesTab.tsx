import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { Save, Check } from 'lucide-react';

interface LessonNotesTabProps {
  lessonId: string;
}

export const LessonNotesTab: React.FC<LessonNotesTabProps> = ({ lessonId }) => {
  const storageKey = `edupath_notes_${lessonId}`;
  const [noteContent, setNoteContent] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedNote = localStorage.getItem(storageKey);
    setNoteContent(savedNote || '');
    setSaved(false);
  }, [lessonId]);

  const handleSave = () => {
    localStorage.setItem(storageKey, noteContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          Personal Notes for this Lesson (Persisted locally)
        </span>
        <Button
          size="sm"
          variant={saved ? 'success' : 'outline'}
          onClick={handleSave}
          leftIcon={saved ? <Check size={14} /> : <Save size={14} />}
        >
          {saved ? 'Saved' : 'Save Notes'}
        </Button>
      </div>

      <textarea
        rows={6}
        value={noteContent}
        onChange={(e) => {
          setNoteContent(e.target.value);
          setSaved(false);
        }}
        placeholder="Type key timestamps, important code snippets, or thoughts here..."
        className="w-full p-4 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white resize-none shadow-xs"
      />
    </div>
  );
};

