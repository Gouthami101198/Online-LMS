import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnrolledCourse, Certificate, QuizAttempt } from '../../types';
import { INITIAL_CERTIFICATES } from '../../api/mockData';

interface EnrollmentState {
  enrolledCourses: Record<string, EnrolledCourse>;
  certificates: Certificate[];
}

const initialState: EnrollmentState = {
  enrolledCourses: {
    'course-react-ts-mastery': {
      courseId: 'course-react-ts-mastery',
      enrolledAt: '2024-10-01',
      progressPercent: 100,
      completedLessons: ['les-1-1', 'les-1-2', 'les-1-3', 'les-2-1', 'les-2-2', 'les-3-1', 'les-3-2'],
      currentLessonId: 'les-3-2',
      isCompleted: true,
      completedAt: '2024-11-12',
      quizAttempts: {
        'quiz-react-redux': {
          quizId: 'quiz-react-redux',
          scorePercent: 100,
          passed: true,
          completedAt: '2024-10-15',
          selectedAnswers: { q1: 0, q2: 0, q3: 0 }
        },
        'quiz-react-capstone': {
          quizId: 'quiz-react-capstone',
          scorePercent: 100,
          passed: true,
          completedAt: '2024-11-12',
          selectedAnswers: { qc1: 0, qc2: 0 }
        }
      },
      certificateId: 'cert-react-2024-001'
    },
    'course-ui-ux-design-systems': {
      courseId: 'course-ui-ux-design-systems',
      enrolledAt: '2024-11-05',
      progressPercent: 50,
      completedLessons: ['les-ui-1-1'],
      currentLessonId: 'les-ui-1-2',
      isCompleted: false,
      quizAttempts: {}
    }
  },
  certificates: INITIAL_CERTIFICATES
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<{ courseId: string; firstLessonId?: string }>) => {
      const { courseId, firstLessonId } = action.payload;
      if (!state.enrolledCourses[courseId]) {
        state.enrolledCourses[courseId] = {
          courseId,
          enrolledAt: new Date().toISOString().split('T')[0],
          progressPercent: 0,
          completedLessons: [],
          currentLessonId: firstLessonId || 'les-1-1',
          isCompleted: false,
          quizAttempts: {}
        };
      }
    },
    setCurrentLesson: (state, action: PayloadAction<{ courseId: string; lessonId: string }>) => {
      const { courseId, lessonId } = action.payload;
      if (state.enrolledCourses[courseId]) {
        state.enrolledCourses[courseId].currentLessonId = lessonId;
      }
    },
    toggleLessonCompletion: (state, action: PayloadAction<{ courseId: string; lessonId: string; totalLessons: number }>) => {
      const { courseId, lessonId, totalLessons } = action.payload;
      const enrollment = state.enrolledCourses[courseId];
      if (!enrollment) return;

      const exists = enrollment.completedLessons.includes(lessonId);
      if (exists) {
        enrollment.completedLessons = enrollment.completedLessons.filter(id => id !== lessonId);
      } else {
        enrollment.completedLessons.push(lessonId);
      }

      // calculate progress
      const percent = Math.min(100, Math.round((enrollment.completedLessons.length / Math.max(1, totalLessons)) * 100));
      enrollment.progressPercent = percent;

      if (percent >= 100 && !enrollment.isCompleted) {
        enrollment.isCompleted = true;
        enrollment.completedAt = new Date().toISOString().split('T')[0];
      } else if (percent < 100) {
        enrollment.isCompleted = false;
      }
    },
    submitQuizAttempt: (state, action: PayloadAction<{ courseId: string; attempt: QuizAttempt }>) => {
      const { courseId, attempt } = action.payload;
      const enrollment = state.enrolledCourses[courseId];
      if (enrollment) {
        enrollment.quizAttempts[attempt.quizId] = attempt;
      }
    },
    issueCertificate: (state, action: PayloadAction<Certificate>) => {
      const cert = action.payload;
      const existing = state.certificates.find(c => c.courseId === cert.courseId && c.studentId === cert.studentId);
      if (!existing) {
        state.certificates.unshift(cert);
        if (state.enrolledCourses[cert.courseId]) {
          state.enrolledCourses[cert.courseId].certificateId = cert.id;
        }
      }
    }
  }
});

export const {
  enrollCourse,
  setCurrentLesson,
  toggleLessonCompletion,
  submitQuizAttempt,
  issueCertificate
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
