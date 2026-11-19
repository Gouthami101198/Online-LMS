import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { markAsRead, markAllAsRead } from '../../redux/slices/notificationSlice';
import { logout } from '../../redux/slices/authSlice';
import { INITIAL_CATEGORIES } from '../../api/mockData';
import { CartDrawer } from '../cart/CartDrawer';
import { UserAvatar } from '../common/UserAvatar';
import {
  BookOpen,
  Search,
  Heart,
  Bell,
  ShoppingBag,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Award,
  Layers,
  LayoutDashboard,
  Shield,
  Video,
  ChevronDown,
  CheckCircle,
  Code,
  Palette,
  Brain,
  Cloud,
  Smartphone,
  Briefcase,
  TrendingUp,
  PlusCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser, isAuthenticated, activeRole } = useAppSelector((state) => state.auth);
  const { wishlist, cart } = useAppSelector((state) => state.cart);
  const { notifications } = useAppSelector((state) => state.notifications);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/courses?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    }
  };

  const getDashboardLink = () => {
    if (activeRole === 'admin') return '/admin/dashboard';
    if (activeRole === 'instructor') return '/instructor/dashboard';
    return '/dashboard';
  };

  const handleSelectCategory = (categoryName: string) => {
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(`/courses?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <header className="bg-white border-b border-slate-200/80 z-40">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-5 sm:gap-7">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/25 group-hover:scale-105 transition-transform">
                <BookOpen size={20} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                  EduPath<span className="text-teal-600">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-teal-600/70 -mt-0.5">
                  LMS Platform
                </span>
              </div>
            </Link>

            {/* Studio / Console Badges for Instructor & Admin */}
            {activeRole === 'instructor' && (
              <div className="hidden sm:flex items-center gap-2 pl-3.5 border-l border-slate-200">
                <span className="text-sm font-bold text-slate-800 tracking-tight">Instructor Studio</span>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-full">
                  Faculty
                </span>
              </div>
            )}
            {activeRole === 'admin' && (
              <div className="hidden sm:flex items-center gap-2 pl-3.5 border-l border-slate-200">
                <span className="text-sm font-bold text-slate-800 tracking-tight">Admin Operations</span>
                <span className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-full">
                  Super Admin
                </span>
              </div>
            )}

            {/* Navigation Links: ONLY rendered for Students */}
            {activeRole === 'student' && (
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/courses"
                  className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
                >
                  Explore Courses
                </Link>

                {/* Categories Navigation with Dropdown Menu */}
                <div className="relative flex items-center">
                  <Link
                    to="/categories"
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors py-2"
                  >
                    Categories
                  </Link>
                  <button
                    type="button"
                    onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                    onMouseEnter={() => setCategoriesDropdownOpen(true)}
                    className="p-1 text-slate-400 hover:text-teal-600 transition-colors ml-0.5"
                    aria-label="Toggle Categories Menu"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        categoriesDropdownOpen ? 'rotate-180 text-teal-600' : ''
                      }`}
                    />
                  </button>

                  {categoriesDropdownOpen && (
                    <div
                      onMouseLeave={() => setCategoriesDropdownOpen(false)}
                      className="absolute left-0 top-full mt-1 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Browse by Subject
                        </span>
                        <Link
                          to="/categories"
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1"
                        >
                          Categories Hub →
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-1 py-1">
                        {INITIAL_CATEGORIES.map((cat) => {
                          const Icon = categoryIcons[cat.icon] || Code;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => handleSelectCategory(cat.name)}
                              className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-500 group-hover:text-white flex items-center justify-center transition-colors">
                                  <Icon size={14} />
                                </div>
                                <span>{cat.name}</span>
                              </div>
                              <span className="text-xs text-slate-400 group-hover:text-teal-600 font-medium">
                                {cat.count} courses
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {isAuthenticated && (
                  <Link
                    to="/my-learning"
                    className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
                  >
                    My Learning
                  </Link>
                )}
              </nav>
            )}
          </div>

          {/* Middle: Search Bar ONLY for Students; Clean Spacer for Instructor / Admin */}
          {activeRole === 'student' ? (
            <div className="hidden lg:flex flex-1 max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  placeholder="Search courses, skills, technologies..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </form>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Quick Action for Instructor: + Create Course */}
            {activeRole === 'instructor' && (
              <Link
                to="/instructor/create-course"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white text-xs font-bold shadow-xs transition-all"
              >
                <PlusCircle size={15} />
                <span>+ Create Course</span>
              </Link>
            )}

            {/* Quick Status for Admin: System Online */}
            {activeRole === 'admin' && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>System Online</span>
              </span>
            )}
            {/* Wishlist & Shopping Cart: ONLY for Students */}
            {activeRole === 'student' && (
              <>
                <Link
                  to="/wishlist"
                  className="relative p-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                  title="Wishlist"
                >
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setCartDrawerOpen(true)}
                  className="relative p-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                  title="Shopping Cart"
                >
                  <ShoppingBag size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {cart.length}
                    </span>
                  )}
                </button>
              </>
            )}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                title="Notifications"
              >
                <Bell size={20} />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotifDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">Notifications</span>
                        <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-semibold">
                          {unreadNotifsCount} new
                        </span>
                      </div>
                      <button
                        onClick={() => dispatch(markAllAsRead())}
                        className="text-xs text-teal-600 hover:text-teal-800 font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-slate-400">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              dispatch(markAsRead(notif.id));
                              if (notif.link) {
                                navigate(notif.link);
                                setNotifDropdownOpen(false);
                              }
                            }}
                            className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 ${
                              !notif.read ? 'bg-teal-50/40' : ''
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {notif.type === 'achievement' ? <Award size={16} /> : <Bell size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">
                                {notif.title}
                              </p>
                              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                                {notif.message}
                              </p>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                {notif.createdAt}
                              </span>
                            </div>
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full bg-teal-600 self-center flex-shrink-0" />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Dropdown / Auth CTA */}
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <UserAvatar
                    name={currentUser.name}
                    role={activeRole}
                    size="sm"
                    showBadge={true}
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-teal-600 font-semibold capitalize">
                      {activeRole}
                    </p>
                  </div>
                  <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 divide-y divide-slate-100">
                      <div className="px-4 py-3 flex items-center gap-3">
                        <UserAvatar name={currentUser.name} role={activeRole} size="md" showBadge={false} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardLink()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                        >
                          <LayoutDashboard size={15} />
                          {activeRole === 'admin'
                            ? 'Admin Dashboard'
                            : activeRole === 'instructor'
                            ? 'Instructor Studio'
                            : 'Student Dashboard'}
                        </Link>
                        <Link
                          to="/my-learning"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                        >
                          <BookOpen size={15} />
                          My Learning
                        </Link>
                        <Link
                          to="/certificates"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                        >
                          <Award size={15} />
                          Certificates
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                        >
                          <UserIcon size={15} />
                          Profile Settings
                        </Link>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            dispatch(logout());
                            setUserDropdownOpen(false);
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-slate-700 hover:text-teal-600 px-3 py-2 rounded-xl transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-bold bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white px-4 py-2 rounded-xl transition-all shadow-sm shadow-teal-500/25"
                >
                  Join Free
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3 animate-in fade-in">
            {activeRole === 'student' ? (
              <>
                <form onSubmit={handleSearchSubmit} className="relative w-full px-2">
                  <Search
                    size={18}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={navSearch}
                    onChange={(e) => setNavSearch(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </form>
                <div className="flex flex-col space-y-1 px-2">
                  <Link
                    to="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    to="/categories"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/my-learning"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    My Learning
                  </Link>
                  <Link
                    to="/certificates"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Certificates
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Wishlist ({wishlist.length})
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-teal-700 bg-teal-50 font-bold"
                  >
                    Go to Student Dashboard
                  </Link>
                </div>
              </>
            ) : activeRole === 'instructor' ? (
              <div className="flex flex-col space-y-1 px-2">
                <Link
                  to="/instructor/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Studio Dashboard
                </Link>
                <Link
                  to="/instructor/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  My Courses
                </Link>
                <Link
                  to="/instructor/students"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Students
                </Link>
                <Link
                  to="/instructor/analytics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Course Analytics
                </Link>
                <Link
                  to="/instructor/create-course"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-500 text-center shadow-xs"
                >
                  + Create New Course
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-1 px-2">
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Admin Console
                </Link>
                <Link
                  to="/admin/users"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  User Management
                </Link>
                <Link
                  to="/admin/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Course Approvals
                </Link>
                <Link
                  to="/admin/revenue"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Revenue Analytics
                </Link>
                <Link
                  to="/admin/reports"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Platform Reports
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

