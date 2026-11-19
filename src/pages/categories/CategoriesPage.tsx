import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcherBanner } from '../../components/common/RoleSwitcherBanner';
import { useAppSelector } from '../../redux/store';
import { INITIAL_CATEGORIES } from '../../api/mockData';
import { CourseCard } from '../../components/course/CourseCard';
import { Button } from '../../components/common/Button';
import {
  Code,
  Palette,
  Brain,
  Cloud,
  Shield,
  Smartphone,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CategoriesPage: React.FC = () => {
  const { courses } = useAppSelector((state) => state.courses);
  const [searchTerm, setSearchTerm] = useState('');

  const categoryIcons: Record<string, any> = {
    Code,
    Palette,
    Brain,
    Cloud,
    Shield,
    Smartphone,
    Briefcase,
    TrendingUp,
  };

  const categoryDetails: Record<
    string,
    {
      description: string;
      skills: string[];
      careerPaths: string;
      avgSalary: string;
      bgGradient: string;
    }
  > = {
    Development: {
      description: 'Master frontend, backend, and full-stack engineering with modern frameworks and strict typing.',
      skills: ['React 18', 'TypeScript', 'Node.js', 'Next.js', 'Go', 'PostgreSQL'],
      careerPaths: 'Full-Stack Developer, Frontend Engineer, Backend Architect',
      avgSalary: '₹28 LPA (India Avg)',
      bgGradient: 'from-teal-600 to-emerald-700',
    },
    Design: {
      description: 'Create human-centered design systems, responsive web interfaces, and Figma design tokens.',
      skills: ['Figma 5.0', 'Design Systems', 'Tailwind CSS', 'WCAG Accessibility', 'Wireframing'],
      careerPaths: 'Product Designer, UI/UX Engineer, Design System Lead',
      avgSalary: '₹22 LPA (India Avg)',
      bgGradient: 'from-purple-600 to-pink-600',
    },
    'Data Science & AI': {
      description: 'Build production generative AI agents, LLM pipelines, RAG systems, and neural networks.',
      skills: ['Python', 'LangChain', 'OpenAI API', 'Vector DBs', 'PyTorch', 'RAG'],
      careerPaths: 'AI Engineer, Machine Learning Specialist, Data Scientist',
      avgSalary: '₹36 LPA (India Avg)',
      bgGradient: 'from-emerald-600 to-teal-700',
    },
    'Cloud & DevOps': {
      description: 'Deploy resilient cloud infrastructure, containerize microservices, and automate CI/CD.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Helm'],
      careerPaths: 'DevOps Engineer, Cloud Architect, Site Reliability Engineer (SRE)',
      avgSalary: '₹32 LPA (India Avg)',
      bgGradient: 'from-cyan-600 to-blue-700',
    },
    'Cyber Security': {
      description: 'Defend web applications against OWASP threats, perform penetration testing, and audit security.',
      skills: ['Ethical Hacking', 'OWASP Top 10', 'Penetration Testing', 'Cryptography', 'CSP'],
      careerPaths: 'Security Engineer, Ethical Hacker, Cyber Defense Analyst',
      avgSalary: '₹30 LPA (India Avg)',
      bgGradient: 'from-rose-600 to-red-700',
    },
    'Mobile Development': {
      description: 'Build native iOS and Android apps with single codebase technologies and reactive state.',
      skills: ['Flutter', 'Dart', 'Bloc', 'Firebase', 'iOS & Android Store'],
      careerPaths: 'Mobile App Developer, iOS/Android Engineer, Flutter Lead',
      avgSalary: '₹25 LPA (India Avg)',
      bgGradient: 'from-amber-600 to-orange-600',
    },
    'Business & Management': {
      description: 'Lead technical teams, define roadmaps, write PRDs, and optimize agile sprint discovery.',
      skills: ['Product Management', 'Agile / Scrum', 'User Research', 'PRD Authoring', 'OKRs'],
      careerPaths: 'Technical Product Manager, Agile Coach, Startup Founder',
      avgSalary: '₹34 LPA (India Avg)',
      bgGradient: 'from-teal-700 to-cyan-800',
    },
    Marketing: {
      description: 'Drive data-driven user acquisition, conversion rate optimization, SEO, and SaaS funnels.',
      skills: ['Google Analytics 4', 'Technical SEO', 'Conversion Optimization', 'A/B Testing', 'Growth Loops'],
      careerPaths: 'Growth Marketer, SaaS Marketing Lead, SEO Strategist',
      avgSalary: '₹20 LPA (India Avg)',
      bgGradient: 'from-lime-600 to-emerald-700',
    },
  };

  const filteredCategories = INITIAL_CATEGORIES.filter((cat) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    const details = categoryDetails[cat.name];
    return (
      cat.name.toLowerCase().includes(q) ||
      details?.description.toLowerCase().includes(q) ||
      details?.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <RoleSwitcherBanner />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-teal-800/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-xs font-bold text-teal-300">
              <Sparkles size={14} className="text-emerald-400" />
              Comprehensive Learning Tracks & Career Roadmaps
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Explore Learning Categories
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Discover in-depth engineering disciplines. Each track features accredited curriculum, real-world portfolio capstones, and industry certifications designed to launch or elevate your career.
            </p>

            {/* Quick search input */}
            <div className="pt-2 max-w-md">
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter categories or skills (e.g. React, AI, Cloud)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-slate-900/80 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-500/20 to-transparent pointer-events-none" />
        </div>

        {/* Categories Directory Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">All 8 Learning Domains</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select any track to view available courses, skill outcomes, and certification tracks.
              </p>
            </div>
            <Link to="/courses">
              <Button size="sm" variant="outline" rightIcon={<ArrowRight size={14} />}>
                View All Courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => {
              const Icon = categoryIcons[cat.icon] || Code;
              const details = categoryDetails[cat.name] || {
                description: 'Explore curated lessons, practical exercises, and verifiable skills.',
                skills: ['Core Concepts', 'Hands-on Labs'],
                careerPaths: 'Specialist, Practitioner',
                avgSalary: '$100,000 / yr',
                bgGradient: 'from-teal-600 to-emerald-800',
              };

              const categoryCourses = courses.filter(
                (c) => c.category.toLowerCase() === cat.name.toLowerCase()
              );

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Banner */}
                    <div className={`p-6 bg-gradient-to-tr ${details.bgGradient} text-white relative`}>
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 shadow-inner">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-extrabold text-lg text-white group-hover:translate-x-1 transition-transform">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-white/80 mt-1">
                        {categoryCourses.length} {categoryCourses.length === 1 ? 'Course' : 'Courses'} Available
                      </p>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
                        {details.description}
                      </p>

                      {/* Skills Tags */}
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Key Skills Taught
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {details.skills.slice(0, 4).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Career Paths */}
                      <div className="pt-2 border-t border-slate-100 text-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Career Roles
                        </span>
                        <p className="text-slate-800 font-medium mt-0.5 line-clamp-1">
                          {details.careerPaths}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Button */}
                  <div className="p-6 pt-0">
                    <Link to={`/courses?category=${encodeURIComponent(cat.name)}`}>
                      <Button
                        size="sm"
                        variant="primary"
                        className="w-full font-bold group-hover:shadow-md"
                        rightIcon={<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                      >
                        Explore {cat.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Courses Across Tracks Spotlight */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Top Rated Courses by Category
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Curated programs with the highest student reviews and completion rates.
              </p>
            </div>
            <Link to="/courses" className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline">
              See complete catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Why Learn with EduPath */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl p-8 sm:p-12 border border-teal-100">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Structured for Career Growth
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Choose an EduPath Track?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Every category is vetted by industry leads with progressive milestones from fundamental syntax to distributed capstones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Comprehensive Curriculums</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Step-by-step sequential sections with video walkthroughs, coding exercises, and downloadable project source code.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Accredited Certificates</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Earn cryptographically verifiable credentials upon 100% curriculum completion to showcase on your CV and LinkedIn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Active Peer Community</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ask questions in lesson notes, take interactive quizzes with immediate explanations, and rate courses.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

