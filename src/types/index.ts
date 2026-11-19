// User & Authentication Types
export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  title?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  joinedDate: string;
  enrolledCoursesCount?: number;
  completedCoursesCount?: number;
  totalEarnings?: number;
  status: 'active' | 'suspended' | 'pending';
}

// Course Types
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type CourseStatus = 'published' | 'draft' | 'pending_approval' | 'archived';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  timeLimitMinutes: number;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'pdf' | 'zip' | 'link' | 'code';
  fileSize?: string;
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "14:20"
  durationSeconds: number;
  videoUrl: string;
  summary: string;
  isFreePreview?: boolean;
  resources?: ResourceItem[];
  quiz?: Quiz;
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  category: string;
  level: CourseLevel;
  thumbnail: string;
  promoVideoUrl?: string;
  instructorId: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  instructorBio: string;
  price: number;
  discountPrice?: number;
  isFree?: boolean;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  totalLessons: number;
  lastUpdated: string;
  language: string;
  tags: string[];
  whatYouWillLearn: string[];
  requirements: string[];
  chapters: Chapter[];
  reviews: Review[];
  status: CourseStatus;
  isFeatured?: boolean;
  isTrending?: boolean;
}

// Enrollment & Progress Types
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  lastWatchedSeconds?: number;
}

export interface QuizAttempt {
  quizId: string;
  scorePercent: number;
  passed: boolean;
  completedAt: string;
  selectedAnswers: Record<string, number>;
}

export interface EnrolledCourse {
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessons: string[]; // lesson IDs
  currentLessonId: string;
  isCompleted: boolean;
  completedAt?: string;
  quizAttempts: Record<string, QuizAttempt>;
  certificateId?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentId: string;
  studentName: string;
  instructorName: string;
  issueDate: string;
  verificationCode: string;
  grade?: string;
}

// Notification Type
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'course' | 'achievement' | 'system' | 'reminder';
  read: boolean;
  createdAt: string;
  link?: string;
}

// Cart & Wishlist
export interface CartItem {
  course: Course;
  addedAt: string;
}

// Analytics & Reports
export interface RevenueRecord {
  month: string;
  revenue: number;
  students: number;
  coursesSold: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
  color: string;
}

export interface PlatformStat {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  description: string;
}

