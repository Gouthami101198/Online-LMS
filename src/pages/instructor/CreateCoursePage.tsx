import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addCourse } from '../../redux/slices/courseSlice';
import { addNotification } from '../../redux/slices/notificationSlice';
import { Course, CourseLevel, Chapter, Lesson } from '../../types';
import { INITIAL_CATEGORIES } from '../../api/mockData';
import {
  PlusCircle,
  Trash2,
  CheckCircle,
  FileText,
  Video,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export const CreateCoursePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(INITIAL_CATEGORIES[0].name);
  const [level, setLevel] = useState<CourseLevel>('Beginner');
  const [price, setPrice] = useState<number>(4999);
  const [discountPrice, setDiscountPrice] = useState<number>(2499);
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80');
  const [promoVideoUrl, setPromoVideoUrl] = useState('https://www.youtube.com/watch?v=bMknfKXIFA8');

  // Curriculum Chapters state
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 'chap-new-1',
      title: 'Section 1: Course Introduction & Orientation',
      order: 1,
      lessons: [
        {
          id: 'les-new-1-1',
          title: '1. Welcome to the Course & Core Objectives',
          duration: '10:00',
          durationSeconds: 600,
          videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
          summary: 'Overview of learning outcomes, prerequisite tools, and roadmap.',
          isFreePreview: true,
          resources: [
            { id: 'res-new-1', title: 'Course Roadmap & Cheatsheet (PDF)', type: 'pdf', fileSize: '1.2 MB', url: '#' },
          ]
        }
      ]
    }
  ]);

  const handleAddChapter = () => {
    const nextOrder = chapters.length + 1;
    const newChap: Chapter = {
      id: `chap-new-${Date.now()}`,
      title: `Section ${nextOrder}: New Section Title`,
      order: nextOrder,
      lessons: []
    };
    setChapters([...chapters, newChap]);
  };

  const handleAddLesson = (chapterIndex: number) => {
    const updated = [...chapters];
    const newLesson: Lesson = {
      id: `les-new-${Date.now()}`,
      title: 'New Video Lecture',
      duration: '12:30',
      durationSeconds: 750,
      videoUrl: 'https://www.youtube.com/watch?v=BCg4U1Fz3Q8',
      summary: 'Practical walkthrough and coding demonstrations.',
      isFreePreview: false,
    };
    updated[chapterIndex].lessons.push(newLesson);
    setChapters(updated);
  };

  const handlePublishCourse = () => {
    const totalLessonsCount = chapters.reduce((acc, c) => acc + c.lessons.length, 0);

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: title || 'Untitled Professional Course',
      slug: (title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      subtitle: subtitle || 'Master state-of-the-art engineering skills with real world practical examples.',
      description: description || 'Comprehensive practical course designed for career advancement.',
      category,
      level,
      thumbnail,
      promoVideoUrl,
      instructorId: currentUser?.id || 'user-instructor-1',
      instructorName: currentUser?.name || 'Dr. Sophia Chen',
      instructorTitle: currentUser?.title || 'Senior Software Engineer & Instructor',
      instructorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      instructorBio: currentUser?.bio || 'Passionate educator with years of industry experience.',
      price: Number(price) || 49.99,
      discountPrice: Number(discountPrice) || 29.99,
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 0,
      duration: '8h 45m',
      totalLessons: Math.max(1, totalLessonsCount),
      lastUpdated: 'Just now',
      language: 'English',
      tags: [category, 'Web', 'Certification'],
      whatYouWillLearn: [
        'Master the fundamental concepts and practical industry best practices',
        'Build real-world production-level capstone projects from scratch',
        'Learn automated testing and scalable code patterns'
      ],
      requirements: ['Basic computer literacy and curiosity to learn'],
      chapters,
      reviews: [],
      status: 'published',
      isFeatured: true,
    };

    dispatch(addCourse(newCourse));
    dispatch(
      addNotification({
        id: `notif-${Date.now()}`,
        title: 'New Course Published! 🚀',
        message: `Your course "${newCourse.title}" is now published and live on EduPath marketplace.`,
        type: 'achievement',
        read: false,
        createdAt: 'Just now',
        link: `/course/${newCourse.id}`,
      })
    );

    navigate('/instructor/courses');
  };

  return (
    <DashboardLayout role="instructor">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Stepper Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create New Course</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Step {step} of 3: {step === 1 ? 'Course Basics' : step === 2 ? 'Curriculum & Lessons' : 'Review & Publish'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step === s
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-xs'
                    : step > s
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Course Basics */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-5">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-3">Course Fundamentals</h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Course Title</label>
              <input
                type="text"
                placeholder="e.g. Modern Full-Stack Cloud Architecture with Go & React"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle / Short Catchphrase</label>
              <input
                type="text"
                placeholder="e.g. Build microservices, containerize with Docker, and deploy to Kubernetes"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
                >
                  {INITIAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Skill Level</label>
                <select
                  value={level}
                  onChange={(e: any) => setLevel(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Regular Course Price (₹ INR)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Promotional Discount Price (₹ INR)</label>
                <input
                  type="number"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Course Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what makes this course unique, key syllabus topics, and projects students will build..."
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button size="md" variant="primary" onClick={() => setStep(2)} rightIcon={<ArrowRight size={16} />}>
                Next: Curriculum Builder
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Curriculum Builder */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Curriculum & Video Lessons</h3>
                <p className="text-xs text-slate-500">Organize your syllabus into logical sections and attach video URLs.</p>
              </div>
              <Button size="sm" variant="outline" onClick={handleAddChapter} leftIcon={<PlusCircle size={14} />}>
                Add Section
              </Button>
            </div>

            <div className="space-y-4">
              {chapters.map((chap, cIdx) => (
                <div key={chap.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={chap.title}
                      onChange={(e) => {
                        const copy = [...chapters];
                        copy[cIdx].title = e.target.value;
                        setChapters(copy);
                      }}
                      className="font-bold text-slate-800 text-sm bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex-1 mr-3"
                    />
                    <Button size="sm" variant="outline" onClick={() => handleAddLesson(cIdx)} leftIcon={<PlusCircle size={13} />}>
                      Add Lesson
                    </Button>
                  </div>

                  <div className="space-y-2 pl-2">
                    {chap.lessons.map((les, lIdx) => (
                      <div key={les.id} className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                        <Video size={16} className="text-teal-600 shrink-0" />
                        <input
                          type="text"
                          value={les.title}
                          onChange={(e) => {
                            const copy = [...chapters];
                            copy[cIdx].lessons[lIdx].title = e.target.value;
                            setChapters(copy);
                          }}
                          className="text-xs font-semibold text-slate-800 flex-1 border-b border-dashed border-slate-300 pb-0.5 focus:outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={les.duration}
                            onChange={(e) => {
                              const copy = [...chapters];
                              copy[cIdx].lessons[lIdx].duration = e.target.value;
                              setChapters(copy);
                            }}
                            className="w-16 text-center text-xs font-mono border rounded px-1.5 py-1"
                          />
                          <button
                            onClick={() => {
                              const copy = [...chapters];
                              copy[cIdx].lessons.splice(lIdx, 1);
                              setChapters(copy);
                            }}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <Button size="md" variant="outline" onClick={() => setStep(1)} leftIcon={<ArrowLeft size={16} />}>
                Back to Basics
              </Button>
              <Button size="md" variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight size={16} />}>
                Next: Review & Publish
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Publish */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-3">Review & Launch to Marketplace</h3>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Title</span>
                <span className="font-bold text-slate-900 text-sm">{title || 'Untitled Course'}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Category & Level</span>
                <span className="font-bold text-slate-900">{category} • {level}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Pricing</span>
                <span className="font-bold text-emerald-600 text-sm">₹{discountPrice || price}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Curriculum Breakdown</span>
                <span className="font-bold text-slate-900">
                  {chapters.length} Sections • {chapters.reduce((acc, c) => acc + c.lessons.length, 0)} Lectures
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <Button size="md" variant="outline" onClick={() => setStep(2)} leftIcon={<ArrowLeft size={16} />}>
                Back to Curriculum
              </Button>
              <Button size="lg" variant="success" onClick={handlePublishCourse} leftIcon={<Sparkles size={16} />}>
                Publish Course Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

