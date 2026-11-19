import React, { useState } from 'react';
import { Chapter, Lesson } from '../../types';
import { ChevronDown, PlayCircle, FileText, HelpCircle, Lock, CheckCircle2 } from 'lucide-react';

interface CurriculumAccordionProps {
  chapters: Chapter[];
  completedLessonIds?: string[];
  activeLessonId?: string;
  onSelectLesson?: (lesson: Lesson) => void;
  isEnrolled?: boolean;
}

export const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({
  chapters,
  completedLessonIds = [],
  activeLessonId,
  onSelectLesson,
  isEnrolled = false,
}) => {
  // By default expand the first chapter
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    [chapters[0]?.id || '']: true,
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const totalLessonsCount = chapters.reduce((acc, c) => acc + c.lessons.length, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium pb-2">
        <span>{chapters.length} Sections • {totalLessonsCount} Lectures</span>
        <button
          type="button"
          onClick={() => {
            const allExpanded = Object.values(expandedChapters).every(Boolean);
            const nextState: Record<string, boolean> = {};
            chapters.forEach((c) => {
              nextState[c.id] = !allExpanded;
            });
            setExpandedChapters(nextState);
          }}
          className="text-teal-600 font-semibold hover:underline"
        >
          {Object.values(expandedChapters).every(Boolean) ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {chapters.map((chapter, idx) => {
        const isExpanded = !!expandedChapters[chapter.id];
        const chapterCompletedCount = chapter.lessons.filter((l) =>
          completedLessonIds.includes(l.id)
        ).length;

        return (
          <div
            key={chapter.id}
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
          >
            {/* Chapter Header */}
            <button
              type="button"
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-5 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                    }`}
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {chapter.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{chapter.lessons.length} lectures</span>
                    {isEnrolled && (
                      <span className="text-emerald-600 font-semibold">
                        • {chapterCompletedCount}/{chapter.lessons.length} completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>

            {/* Lessons List */}
            {isExpanded && (
              <div className="divide-y divide-slate-100 bg-white">
                {chapter.lessons.map((lesson) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  const isActive = activeLessonId === lesson.id;
                  const canAccess = isEnrolled || lesson.isFreePreview;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        if (canAccess && onSelectLesson) {
                          onSelectLesson(lesson);
                        }
                      }}
                      className={`px-5 py-3.5 flex items-center justify-between transition-colors ${canAccess ? 'cursor-pointer hover:bg-teal-50/50' : 'opacity-70 bg-slate-50/30'
                        } ${isActive ? 'bg-teal-50/80 border-l-4 border-teal-600' : ''}`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-4">
                        {isCompleted ? (
                          <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                        ) : canAccess ? (
                          <PlayCircle size={18} className="text-teal-600 shrink-0" />
                        ) : (
                          <Lock size={16} className="text-slate-400 shrink-0" />
                        )}

                        <div className="truncate">
                          <p
                            className={`text-xs sm:text-sm font-medium truncate ${isActive ? 'text-teal-900 font-bold' : 'text-slate-800'
                              }`}
                          >
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                            <span>{lesson.duration}</span>
                            {lesson.resources && lesson.resources.length > 0 && (
                              <span className="flex items-center gap-0.5 text-slate-500">
                                • <FileText size={11} className="mr-0.5" />
                                {lesson.resources.length} files
                              </span>
                            )}
                            {lesson.quiz && (
                              <span className="flex items-center gap-0.5 text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.2 rounded">
                                • <HelpCircle size={11} className="mr-0.5" />
                                Quiz Included
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {lesson.isFreePreview && !isEnrolled && (
                          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                            Free Preview
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

