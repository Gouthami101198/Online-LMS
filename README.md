# EduPath LMS — Modern Online Learning Management System

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Recharts](https://img.shields.io/badge/Recharts-2.13-22C55E)](https://recharts.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **EduPath LMS** is an enterprise-grade, modern, and fully responsive frontend application for an Online Learning Management System. It empowers students to access rich curriculums, attend interactive video lectures, track progress in real-time, take timed quizzes, and earn verifiable completion certificates. It provides instructors with a complete course creation studio and analytics, and administrators with governance tools for user moderation, course approvals, and revenue management.

---

## 📑 Table of Contents

1. [Project Overview & Key Objectives](#-project-overview--key-objectives)
2. [5-Day Development Roadmap](#-5-day-development-roadmap)
3. [Architecture & Technical Stack](#-architecture--technical-stack)
4. [Comprehensive Module Breakdown](#-comprehensive-module-breakdown)
   - [1. Student Module](#1-student-module)
   - [2. Course Management & Catalog](#2-course-management--catalog)
   - [3. Learning Module & Video Classroom](#3-learning-module--video-classroom)
   - [4. Instructor Studio & Studio Suite](#4-instructor-studio--studio-suite)
   - [5. Admin Governance Center](#5-admin-governance-center)
   - [6. Additional Global Features](#6-additional-global-features)
5. [Complete Route Mapping](#-complete-route-mapping)
6. [Demo Personas & Instant Role Switching](#-demo-personas--instant-role-switching)
7. [Directory Structure](#-directory-structure)
8. [Setup & Running Locally](#-setup--running-locally)
9. [Keyboard Shortcuts](#-keyboard-shortcuts-in-video-player)
10. [API Integration Readiness](#-api-integration-readiness)

---

## 🎯 Project Overview & Key Objectives

EduPath was engineered to solve modern e-learning challenges by providing:
- **Fast, Fluid User Experience**: Instant transitions powered by Vite, React Router v6, and Framer Motion.
- **Role-Driven UI**: Dedicated workspaces for **Students**, **Instructors**, and **Administrators** accessible via a persistent 1-click switcher.
- **Accredited Verification**: Cryptographically stamped completion certificates with verification codes, honors grades, and HTML5 canvas image / printable PDF downloads.
- **Separation of Catalog & Subject Domains**: Distinct pages for granular course search (`/courses`) and high-level career learning tracks (`/categories`).

---

## 🗓 5-Day Development Roadmap

| Day | Milestone Focus | Deliverables Completed |
| :--- | :--- | :--- |
| **Day 1** | **UI/UX Setup & Student Hub** | Architecture setup, Tailwind design tokens, Redux store slices, Navbar, Sidebar, Footer, Role Switcher Banner, Student Dashboard with KPI cards, and Profile settings. |
| **Day 2** | **Course Management & Learning Classroom** | Course Catalog with multi-facet filters, dedicated Categories Directory Hub, Course Details view, custom HTML5 Video Player, chapter/lesson accordion, study resource downloads, and interactive Quiz engine with confetti. |
| **Day 3** | **Instructor Studio & Functionality** | Instructor Studio dashboard, Recharts revenue trajectory area charts, multi-step Course Builder (Basics, Curriculum, Media, Publish), Course Management table, and Enrolled Student tracking. |
| **Day 4** | **Admin Governance & Analytics** | Admin Operations Center, User Management table (Suspend/Activate/Delete), Course Quality & Approval pipeline, Platform Revenue management with dynamic commission adjuster, and System Telemetry reports. |
| **Day 5** | **Testing, Responsive Polish & Final Verification** | Full responsive audit on mobile/tablet/desktop, video keyboard shortcuts, canvas certificate download, cart checkout drawer, build optimization with zero errors. |

---

## 🛠 Architecture & Technical Stack

- **Core Framework**: React 18.3 with TypeScript (strict mode enabled).
- **Build Engine**: Vite 5.4 with Hot Module Replacement (HMR) and optimized Rollup chunking.
- **Two-Shade Color System**: Sophisticated dual-shade palette combining **Emerald Teal** (`#0d9488` / `teal-600`) and **Mint Cyan** (`#10b981` / `emerald-500` with `#06b6d4` cyan accents) paired with deep obsidian background tones (`teal-950` / `emerald-950`).
- **Design & Layout**: Tailwind CSS 3.4 with custom soft shadows (`shadow-soft`), two-tone gradients (`two-tone-btn`, `two-tone-banner`), and glassmorphism.
- **State Architecture**: Redux Toolkit (`@reduxjs/toolkit` + `react-redux`) with 6 specialized feature slices.
- **Navigation**: React Router v6 (`react-router-dom`) with URL query synchronization.
- **Data Visualizations**: Recharts 2.13 (AreaChart, BarChart, PieChart, CartesianGrid, ResponsiveContainer).
- **Motion & Micro-interactions**: Framer Motion 11.
- **Icons**: Lucide React (over 40 contextual icons).
- **API Client**: Axios instance configured with request interceptors, authorization bearer headers, centralized error catching, and simulated async delays.
- **Special Effects**: Canvas Confetti for quiz completions and certificate unlocks.

---

## 🔍 Comprehensive Module Breakdown

### 1. Student Module
- **Registration & Login**: Secure simulated authentication with form validations, email format checks, role choices (*Student* or *Instructor*), and instant demo login presets.
- **Student Profile Management** (`/profile`): View and update name, professional headline, biography, location, phone number, portfolio website, and avatar photo URL with live Redux sync.
- **Course Enrollment**: Instant 1-click enrollment, shopping cart checkout, and simulated payment confirmation.
- **My Learning Dashboard** (`/my-learning`): Filter enrolled courses by *All Courses*, *In Progress*, and *Completed*. Displays progress bars, completed lecture ratios, and one-click shortcuts to resume lessons.
- **Learning Progress Tracking**: Automatically recalculates progress percentages in real-time as lectures are viewed and quizzes are passed.
- **Accredited Certificates** (`/certificates`): Issued automatically upon 100% curriculum completion. Displays student name, course title, instructor signature, issue date, honors grade, unique verification code (e.g., `EDP-RC18-98421-VNZ`), and provides both a **Canvas PNG Image Downloader** and browser **Print / PDF Saver**.
- **Personal Lesson Notepad**: In-player note-taking widget that persists personal study notes per lesson in `localStorage`.

---

### 2. Course Management & Catalog
- **Explore Courses Catalog** (`/courses`):
  - Live search input matching course titles, subtitles, tags, and instructor names.
  - Multi-faceted sidebar filters: Category, Skill Level (*Beginner*, *Intermediate*, *Advanced*, *All Levels*), and Pricing (*All*, *Paid*, *Free*).
  - Sort selector: *Most Popular*, *Highest Rated*, *Price: Low to High*, *Price: High to Low*.
  - Horizontal quick-filter chips bar with live course count badges.
  - One-click **"Clear Filters"** button.
- **Dedicated Categories Directory Hub** (`/categories`):
  - Separate from the search catalog, offering an overview of all 8 technology tracks:
    1. **Development**: Web & backend engineering with React 18, TypeScript, Next.js, Go.
    2. **Design**: Figma design tokens, WCAG accessibility, auto-layout 5.0, UI/UX systems.
    3. **Data Science & AI**: Generative AI, LangChain, vector databases, RAG pipelines.
    4. **Cloud & DevOps**: Kubernetes, Docker multi-stage builds, AWS, Terraform.
    5. **Cyber Security**: OWASP Top 10 defense, ethical hacking, penetration testing.
    6. **Mobile Development**: Flutter & Dart reactive apps for iOS & Android.
    7. **Business & Management**: Technical Product Management, PRDs, agile discovery.
    8. **Marketing**: SaaS growth marketing, technical SEO, conversion funnels.
  - Each domain card shows key skills taught, career job titles, average industry salaries, and direct exploration links.
- **Course Details Page** (`/course/:id`):
  - Sticky checkout card featuring promotional video preview modal, pricing, discounts, and 30-day money-back guarantee.
  - *"What You Will Learn"* key outcomes checklist.
  - Interactive syllabus accordion displaying section breakdown, lecture durations, and preview indicators.
  - Instructor biography card with credentials and student counts.
  - Student reviews breakdown with star rating distribution bars, existing reviews, and an interactive review submission form.

---

### 3. Learning Module & Video Classroom
- **Interactive Video Player** (`/learn/:id`):
  - Custom HTML5 controls: Play/pause, seek scrubber, current time / total duration, volume control, mute toggle, and fullscreen mode.
  - Quick skip buttons: Rewind 10s and Fast-Forward 10s.
  - Variable playback speed selector: `0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`.
  - Auto-play next lesson on video completion.
  - Keyboard shortcuts for effortless hands-free studying.
- **Curriculum Syllabus Sidebar**: Collapsible navigation drawer showing all sections and lectures with progress checkmarks and active lecture indicators.
- **Downloadable Study Materials**: Attached PDFs, cheatsheets, and repository source code links with simulated download triggers.
- **Interactive Quizzes**:
  - Timed knowledge assessments with multiple-choice questions.
  - Real-time scoring against passing score threshold (e.g. 75% or 80%).
  - Comprehensive answer explanations for both correct and incorrect selections.
  - Celebration confetti on passing score and retry mechanism for extra practice.
- **Completion Flow**: Finishing all lessons automatically marks the course complete and opens the Accredited Certificate Modal.

---

### 4. Instructor Studio & Studio Suite
- **Instructor Dashboard** (`/instructor/dashboard`):
  - Metric summary cards: Total Gross Earnings, Total Enrolled Students, Instructor Average Rating, and Published Courses.
  - **Recharts AreaChart**: Interactive 6-month gross revenue trajectory graph.
  - Active courses table preview with direct syllabus edit links.
- **Course Management Table** (`/instructor/courses`): View all authored courses with status tags (*Published*, *Draft*, *Pending Approval*), pricing, enrolled students count, and deletion controls.
- **Multi-Step Course Builder** (`/instructor/create-course`):
  - **Step 1 (Fundamentals)**: Course title, subtitle, category selection, skill level, standard price, and promotional discount price.
  - **Step 2 (Curriculum & Lessons)**: Add sections, add lectures, input video URLs, durations, summaries, and downloadable asset attachments.
  - **Step 3 (Review & Publish)**: Comprehensive pre-flight summary with instant publishing to the live student catalog and notification broadcast.
- **Enrolled Student Management** (`/instructor/students`): Searchable student roster tracking completion percentage progress bars, enrollment timestamps, and direct email contact buttons.
- **Course Analytics & Telemetry** (`/instructor/analytics`):
  - **Recharts BarChart**: Daily student lecture engagement and watch hours throughout the week.
  - **Recharts PieChart**: Quiz pass rates (First Attempt Pass vs. Retake Pass vs. Needs Review).

---

### 5. Admin Governance Center
- **Admin Operations Center** (`/admin/dashboard`):
  - Platform KPIs: Total Gross Merchandise Value (GMV), Total Active Learners, Published Courses count, and Verified Instructors.
  - **Recharts AreaChart**: Monthly gross platform revenue.
  - **Recharts Donut Chart**: Revenue share distribution by learning category.
- **User Management Center** (`/admin/users`):
  - Filter users by role (*All*, *Students*, *Instructors*, *Admins*) and status (*Active*, *Suspended*).
  - Search by user name or email.
  - Actions: Instant account suspension/reactivation toggle and profile deletion.
- **Course Quality & Approval** (`/admin/courses`):
  - Audit newly submitted courses.
  - One-click *Approve & Publish*, *Unpublish to Draft*, or *Delete*.
- **Enrollment & Revenue Management** (`/admin/revenue`):
  - Dynamic platform commission percentage adjuster (default 15%).
  - Live revenue split breakdown: Platform Retained Fee vs. Instructor Disbursements.
  - Detailed transaction audit trail table with simulated CSV ledger export.
- **Platform Telemetry & Reports** (`/admin/reports`):
  - Microservice uptime monitor (99.98% availability).
  - Total verified credential counter.
  - Downloadable audit reports for retention, instructor tax summaries, and accreditation compliance.

---

### 6. Additional Global Features
- **1-Click Role Switcher**: Persistent banner at the top of the viewport enabling instantaneous persona switching between **Student** (*Alex Morgan*), **Instructor** (*Dr. Sophia Chen*), and **Admin** (*Marcus Vance*) without re-entering credentials.
- **Notification Center**: Bell icon in header with unread badge counter, notification dropdown, and *"Mark all as read"* functionality.
- **Wishlist Functionality** (`/wishlist`): Save courses with 1-click heart toggle and direct enrollment triggers.
- **Shopping Cart & Coupon Drawer**:
  - Slide-out cart drawer with item count badge.
  - Promo coupon engine (use `EDUPATH50` for 50% discount or `LEARN25` for 25% discount).
  - 1-click simulated checkout that automatically enrolls the student and triggers celebration confetti.
- **Responsive Layout**: Designed mobile-first with collapsible drawer menus, adaptive grids, and desktop sidebars.

---

## 🗺 Complete Route Mapping

| Route | Page Component | Access / Purpose |
| :--- | :--- | :--- |
| `/` | [`Home.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/Home.tsx) | Public Landing Page, Hero, Categories, Featured Programs |
| `/courses` | [`CourseCatalog.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/courses/CourseCatalog.tsx) | Search Catalog, Multi-Facet Filters, Sort Selector |
| `/categories` | [`CategoriesPage.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/categories/CategoriesPage.tsx) | Dedicated Categories & Career Pathways Directory |
| `/course/:id` | [`CourseDetails.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/courses/CourseDetails.tsx) | Course Overview, Syllabus Preview, Reviews & Enrollment |
| `/learn/:id` | [`CoursePlayerPage.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/learning/CoursePlayerPage.tsx) | Video Classroom, Quizzes, Notes, and Resources |
| `/login` | [`LoginPage.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/auth/LoginPage.tsx) | Sign In with 1-Click Demo Persona Presets |
| `/register` | [`RegisterPage.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/auth/RegisterPage.tsx) | Student & Instructor Registration Form |
| `/dashboard` | [`StudentDashboard.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/student/StudentDashboard.tsx) | Student Hub, Stats, Active Course Resume |
| `/my-learning` | [`MyCourses.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/student/MyCourses.tsx) | Enrolled Courses, Progress Tabs, Certificate Shortcuts |
| `/profile` | [`StudentProfile.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/student/StudentProfile.tsx) | Account Settings, Bio, Avatar, Contact Details |
| `/certificates` | [`CertificatesPage.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/student/CertificatesPage.tsx) | Verifiable Completion Credentials & Downloads |
| `/wishlist` | [`WishlistPage.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/student/WishlistPage.tsx) | Saved Courses with Instant Enrollment |
| `/instructor/dashboard` | [`InstructorDashboard.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/instructor/InstructorDashboard.tsx) | Instructor Studio, Revenue Charts, Course Summary |
| `/instructor/courses` | [`InstructorCourses.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/instructor/InstructorCourses.tsx) | Course Management & Syllabus Editing |
| `/instructor/create-course` | [`CreateCoursePage.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/instructor/CreateCoursePage.tsx) | Multi-Step Course Creation Wizard |
| `/instructor/students` | [`StudentManagement.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/instructor/StudentManagement.tsx) | Student Progress Tracker & Roster |
| `/instructor/analytics` | [`CourseAnalytics.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/instructor/CourseAnalytics.tsx) | Engagement Bar Charts & Quiz Success Rates |
| `/admin/dashboard` | [`AdminDashboard.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/admin/AdminDashboard.tsx) | Administrative Governance Center & Platform GMV |
| `/admin/users` | [`UserManagement.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/admin/UserManagement.tsx) | User Moderation, Role Filtering & Account Status |
| `/admin/courses` | [`CourseApproval.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/admin/CourseApproval.tsx) | Course Quality Audit & Approval Workflow |
| `/admin/revenue` | [`EnrollmentRevenue.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/admin/EnrollmentRevenue.tsx) | Financial Settlement, Commission Adjuster & Ledger |
| `/admin/reports` | [`PlatformReports.tsx`](file:///d:/Online%20Learning%20Management%20System/src/pages/admin/PlatformReports.tsx) | System Health Telemetry & Audit Report Downloads |

---

## 👥 Demo Personas & Instant Role Switching

You can switch personas at any time using the sticky banner at the top of the application:

1. **Student Persona**:
   - **Name**: Alex Morgan
   - **Email**: `alex.morgan@example.com`
   - **Capabilities**: Enrolled courses, video classroom, interactive quizzes, note-taking, wishlist, and certificate collection.
2. **Instructor Persona**:
   - **Name**: Dr. Sophia Chen
   - **Email**: `sophia.chen@edupath.io`
   - **Capabilities**: Course creation wizard, revenue charts, lesson uploading, student tracking, and analytics.
3. **Administrator Persona**:
   - **Name**: Marcus Vance
   - **Email**: `admin@edupath.io`
   - **Capabilities**: User moderation (ban/unban/delete), course quality approval, platform commission rate configuration, and financial reports.

---

## 📂 Directory Structure

```
d:/Online Learning Management System/
├── index.html                           # Root HTML5 template
├── package.json                         # Project dependencies and scripts
├── postcss.config.js                    # PostCSS configuration
├── tailwind.config.js                   # Tailwind theme colors, fonts, shadows
├── tsconfig.json                        # Strict TypeScript compiler options
├── tsconfig.node.json                   # Vite TypeScript configuration
├── vite.config.ts                       # Vite bundler configuration & path aliases
├── README.md                            # Comprehensive documentation
└── src/
    ├── main.tsx                         # React 18 DOM root & Redux Provider
    ├── App.tsx                          # React Router definitions for all 21 routes
    ├── index.css                        # Tailwind base styles, scrollbars, glassmorphism
    ├── types/
    │   └── index.ts                     # TypeScript interfaces (Course, User, Quiz, etc.)
    ├── api/
    │   ├── client.ts                    # Axios instance with interceptors & mock engine
    │   └── mockData.ts                  # Seed data (courses, curriculums, users, stats)
    ├── redux/
    │   ├── store.ts                     # Redux store with typed useAppDispatch & useAppSelector
    │   └── slices/
    │       ├── authSlice.ts             # Auth state, profiles, role switching
    │       ├── courseSlice.ts           # Courses, filters, search, reviews
    │       ├── enrollmentSlice.ts       # Enrollments, lesson progress, quiz attempts, certificates
    │       ├── cartSlice.ts             # Wishlist and shopping cart
    │       ├── notificationSlice.ts     # User notification center
    │       └── adminSlice.ts            # Financial stats and platform commission
    ├── components/
    │   ├── common/                      # Badge, Button, Modal, RatingStars, StatCard, RoleSwitcherBanner
    │   ├── layout/                      # Navbar, Sidebar, Footer, DashboardLayout
    │   ├── course/                      # CourseCard, CurriculumAccordion, ReviewSection
    │   ├── player/                      # VideoPlayer, QuizPlayer, LessonResourcesTab, LessonNotesTab
    │   ├── cart/                        # CartDrawer (Slide-out cart & coupon engine)
    │   └── certificate/                 # CertificateViewer (Canvas PNG & Print PDF)
    └── pages/
        ├── Home.tsx                     # Landing page
        ├── auth/                        # LoginPage & RegisterPage
        ├── courses/                     # CourseCatalog & CourseDetails
        ├── categories/                  # CategoriesPage (Dedicated Category Hub)
        ├── learning/                    # CoursePlayerPage (Classroom & Player)
        ├── student/                     # StudentDashboard, MyCourses, StudentProfile, CertificatesPage, WishlistPage
        ├── instructor/                  # InstructorDashboard, InstructorCourses, CreateCoursePage, StudentManagement, CourseAnalytics
        └── admin/                       # AdminDashboard, UserManagement, CourseApproval, EnrollmentRevenue, PlatformReports
```

---

## ⌨️ Keyboard Shortcuts in Video Player

When watching any video in the classroom (`/learn/:id`), you can use the following shortcuts:

| Key | Action |
| :---: | :--- |
| <kbd>Space</kbd> | Toggle Play / Pause |
| <kbd>←</kbd> (Left Arrow) | Rewind 10 Seconds |
| <kbd>→</kbd> (Right Arrow) | Fast Forward 10 Seconds |
| <kbd>M</kbd> | Toggle Audio Mute / Unmute |
| <kbd>F</kbd> | Toggle Fullscreen Mode |

---

## 💻 Setup & Running Locally

### Prerequisites
- Node.js version 18.x or higher
- npm version 9.x or higher

### Installation
```bash
# Clone or navigate to the workspace directory
cd "d:/Online Learning Management System"

# Install all dependencies
npm install
```

### Running Development Server
```bash
# Starts Vite dev server with Hot Module Replacement (HMR)
npm run dev
```
Open **`http://localhost:3000/`** in your browser.

### Building for Production
```bash
# Type check and build production-ready bundle
npm run build
```

### Previewing Production Build
```bash
# Preview the production dist output locally
npm run preview
```

---

## 🔌 API Integration Readiness

The frontend is architected to seamlessly transition to a real backend REST or GraphQL API:
- Centralized Axios client located at [`src/api/client.ts`](file:///d:/Online%20Learning%20Management%20System/src/api/client.ts).
- Pre-configured JWT token injection via request interceptor (`localStorage.getItem('edupath_auth_token')`).
- Response interceptors for centralized 401 handling, session refreshes, and server error toasts.
- All entities strictly defined in [`src/types/index.ts`](file:///d:/Online%20Learning%20Management%20System/src/types/index.ts). Replacing mock seeds with live API calls only requires connecting RTK Query or Axios endpoints in each Redux slice.
