import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { useAppSelector } from './redux/store';
import { Home } from './pages/Home';
import { CourseCatalog } from './pages/courses/CourseCatalog';
import { CategoriesPage } from './pages/categories/CategoriesPage';
import { CourseDetails } from './pages/courses/CourseDetails';
import { CoursePlayerPage } from './pages/learning/CoursePlayerPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyCourses } from './pages/student/MyCourses';
import { StudentProfile } from './pages/student/StudentProfile';
import { CertificatesPage } from './pages/student/CertificatesPage';
import { WishlistPage } from './pages/student/WishlistPage';
import { InstructorDashboard } from './pages/instructor/InstructorDashboard';
import { InstructorCourses } from './pages/instructor/InstructorCourses';
import { CreateCoursePage } from './pages/instructor/CreateCoursePage';
import { InstructorStudents } from './pages/instructor/StudentManagement';
import { CourseAnalytics } from './pages/instructor/CourseAnalytics';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { CourseApproval } from './pages/admin/CourseApproval';
import { EnrollmentRevenue } from './pages/admin/EnrollmentRevenue';
import { PlatformReports } from './pages/admin/PlatformReports';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

/**
 * RootRedirect determines what page to show when visiting `/`.
 * If the user is not logged in, they are immediately directed to the Login page.
 * Once logged in, they are directed to their corresponding role dashboard.
 */
const RootRedirect: React.FC = () => {
  const { isAuthenticated, activeRole } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (activeRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  if (activeRole === 'instructor') {
    return <Navigate to="/instructor/dashboard" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Entry / Landing: Shows Login first, or User Dashboard when logged in */}
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Courses & Categories (shown only after login) */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseCatalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />

        {/* Protected Student Routes (requires login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-learning"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <CertificatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:id"
          element={
            <ProtectedRoute>
              <CoursePlayerPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Instructor Routes (requires instructor or admin role) */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/manage-courses"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/create-course"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <CreateCoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/students"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <InstructorStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/analytics"
          element={
            <ProtectedRoute allowedRoles={['instructor', 'admin']}>
              <CourseAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes (requires admin role) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CourseApproval />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/revenue"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EnrollmentRevenue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PlatformReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EnrollmentRevenue />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
