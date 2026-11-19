import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  toggleLessonCompletion,
  setCurrentLesson,
  issueCertificate,
} from '../../redux/slices/enrollmentSlice';
import { Lesson, Chapter, Certificate } from '../../types';
import { VideoPlayer } from '../../components/player/VideoPlayer';
import { QuizPlayer } from '../../components/player/QuizPlayer';
import { LessonResourcesTab } from '../../components/player/LessonResourcesTab';
import { LessonNotesTab } from '../../components/player/LessonNotesTab';
import { Modal } from '../../components/common/Modal';
import { CertificateViewer } from '../../components/certificate/CertificateViewer';
import { Button } from '../../components/common/Button';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  FileText,
  HelpCircle,
  Edit3,
  Menu,
  X,
  Sparkles,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoursePlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { courses } = useAppSelector((state) => state.courses);
  const { enrolledCourses, certificates } = useAppSelector((state) => state.enrollment);
  const { currentUser } = useAppSelector((state) => state.auth);

  const course = courses.find((c) => c.id === id);
  const enrollment = id ? enrolledCourses[id] : undefined;

  // Flatten lessons for easy next/previous navigation
  const allLessons: Lesson[] = [];
  if (course) {
    course.chapters.forEach((chapter) => {
      chapter.lessons.forEach((l) => allLessons.push(l));
    });
  }

  // Active lesson selection
  const initialLesson =
    allLessons.find((l) => l.id === enrollment?.currentLessonId) || allLessons[0];
  const [activeLesson, setActiveLesson] = useState<Lesson | undefined>(initialLesson);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'quiz' | 'notes'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    if (initialLesson && !activeLesson) {
      setActiveLesson(initialLesson);
    }
  }, [initialLesson]);

  if (!course || allLessons.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <BookOpen size={48} className="text-teal-400 mb-4" />
        <h2 className="text-xl font-bold">Course content currently unavailable</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-sm">
          Please verify enrollment or return to catalog.
        </p>
        <Link to="/courses" className="mt-4">
          <Button variant="primary" size="sm">Browse Catalog</Button>
        </Link>
      </div>
    );
  }

  const completedLessonIds = enrollment?.completedLessons || [];
  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isCurrentCompleted = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;
  const progressPercent = enrollment?.progressPercent || 0;

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    if (id) {
      dispatch(setCurrentLesson({ courseId: id, lessonId: lesson.id }));
    }
    if (lesson.quiz) {
      setActiveTab('quiz');
    } else {
      setActiveTab('overview');
    }
  };

  const handleToggleCurrentLesson = () => {
    if (!activeLesson || !id) return;
    dispatch(
      toggleLessonCompletion({
        courseId: id,
        lessonId: activeLesson.id,
        totalLessons: allLessons.length,
      })
    );

    // Check if course became completed
    const updatedCount = isCurrentCompleted
      ? completedLessonIds.length - 1
      : completedLessonIds.length + 1;
    if (updatedCount === allLessons.length) {
      // Award certificate
      const certId = `cert-${course.id}-${Date.now().toString().slice(-4)}`;
      const newCert: Certificate = {
        id: certId,
        courseId: course.id,
        courseTitle: course.title,
        studentId: currentUser?.id || 'student-1',
        studentName: currentUser?.name || 'Alex Morgan',
        instructorName: course.instructorName,
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        verificationCode: `EDP-${course.id.slice(7, 11).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
        grade: 'Exemplary Completion (100%)',
      };
      dispatch(issueCertificate(newCert));
      setShowCertificateModal(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  };

  const existingCert = certificates.find((c) => c.courseId === course.id);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Learning Bar */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/my-learning"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">My Courses</span>
          </Link>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <h1 className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-xs sm:max-w-md lg:max-w-lg">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress Indicator */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Progress:</span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400">{progressPercent}%</span>
          </div>

          {/* Certificate Button if 100% complete */}
          {existingCert && (
            <button
              onClick={() => setShowCertificateModal(true)}
              className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg text-xs font-bold transition-all"
            >
              <Award size={14} className="text-amber-400" />
              <span>Certificate</span>
            </button>
          )}

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Toggle Curriculum Sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main Classroom Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Video & Tabs Content */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-5xl w-full mx-auto space-y-6">
            {/* Video Player Box */}
            {activeLesson && (
              <VideoPlayer
                videoUrl={activeLesson.videoUrl}
                title={activeLesson.title}
                isCompleted={isCurrentCompleted}
                onToggleComplete={handleToggleCurrentLesson}
                onEnded={() => {
                  if (!isCurrentCompleted) handleToggleCurrentLesson();
                  if (nextLesson) handleLessonSelect(nextLesson);
                }}
              />
            )}

            {/* Lecture Nav Controls */}
            <div className="flex items-center justify-between pt-2 pb-4 border-b border-slate-800 gap-3">
              <Button
                size="sm"
                variant="outline"
                disabled={!prevLesson}
                onClick={() => prevLesson && handleLessonSelect(prevLesson)}
                leftIcon={<ChevronLeft size={16} />}
                className="text-slate-300 border-slate-700 bg-slate-800/80 hover:bg-slate-800"
              >
                Previous Lesson
              </Button>

              <Button
                size="sm"
                variant={isCurrentCompleted ? 'success' : 'primary'}
                onClick={handleToggleCurrentLesson}
                leftIcon={<CheckCircle2 size={16} />}
              >
                {isCurrentCompleted ? 'Lesson Completed' : 'Mark Lesson Complete'}
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={!nextLesson}
                onClick={() => nextLesson && handleLessonSelect(nextLesson)}
                rightIcon={<ChevronRight size={16} />}
                className="text-slate-300 border-slate-700 bg-slate-800/80 hover:bg-slate-800"
              >
                Next Lesson
              </Button>
            </div>

            {/* Lecture Tabs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold shadow-sm shadow-teal-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <BookOpen size={14} /> Overview
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'resources'
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold shadow-sm shadow-teal-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileText size={14} /> Download Materials ({activeLesson?.resources?.length || 0})
                </button>
                {activeLesson?.quiz && (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'quiz'
                        ? 'bg-amber-600 text-white'
                        : 'text-amber-400 hover:bg-amber-500/10'
                    }`}
                  >
                    <HelpCircle size={14} /> Interactive Quiz
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'notes'
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold shadow-sm shadow-teal-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Edit3 size={14} /> Student Notes
                </button>
              </div>

              {/* Tab Contents */}
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-slate-300">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">{activeLesson?.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeLesson?.summary || 'Follow along with the code demonstration in the video player above.'}
                    </p>
                    <div className="pt-4 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
                      <span>Runtime: {activeLesson?.duration}</span>
                      <span>•</span>
                      <span>Instructor: {course.instructorName}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <LessonResourcesTab resources={activeLesson?.resources} />
                )}

                {activeTab === 'quiz' && activeLesson?.quiz && (
                  <QuizPlayer
                    courseId={course.id}
                    quiz={activeLesson.quiz}
                    previousAttempt={enrollment?.quizAttempts[activeLesson.quiz.id]}
                    onPassed={() => {
                      if (!isCurrentCompleted) {
                        handleToggleCurrentLesson();
                      }
                    }}
                  />
                )}

                {activeTab === 'notes' && activeLesson && (
                  <LessonNotesTab lessonId={activeLesson.id} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Curriculum Navigation Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 lg:w-96 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-slate-800 sticky top-0 bg-slate-950 z-10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Course Syllabus</h3>
                <p className="text-[11px] text-slate-400">
                  {completedLessonIds.length} of {allLessons.length} lectures completed
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400">{progressPercent}%</span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {course.chapters.map((chapter) => (
                <div key={chapter.id} className="py-2">
                  <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {chapter.title}
                  </div>
                  <div className="space-y-0.5">
                    {chapter.lessons.map((lesson) => {
                      const isActive = activeLesson?.id === lesson.id;
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleLessonSelect(lesson)}
                          className={`px-4 py-3 cursor-pointer transition-colors flex items-start gap-3 text-xs ${
                            isActive
                              ? 'bg-teal-600/30 text-white border-l-4 border-teal-500'
                              : 'text-slate-300 hover:bg-slate-900'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <CheckCircle2 size={16} className="text-emerald-400" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-600" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`line-clamp-1 font-medium ${isActive ? 'font-bold text-white' : ''}`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span>{lesson.duration}</span>
                              {lesson.quiz && (
                                <span className="text-amber-400 font-semibold">• Quiz</span>
                              )}
                              {lesson.resources && lesson.resources.length > 0 && (
                                <span>• {lesson.resources.length} files</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* Completion & Certificate Modal */}
      <Modal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        title="Congratulations! Course Finished 🎉"
        maxWidth="4xl"
      >
        {existingCert && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              You have completed all curriculum lectures, quizzes, and projects. Here is your official accredited certificate!
            </p>
            <CertificateViewer certificate={existingCert} />
          </div>
        )}
      </Modal>
    </div>
  );
};

