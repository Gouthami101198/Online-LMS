import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcherBanner } from '../../components/common/RoleSwitcherBanner';
import { CourseCard } from '../../components/course/CourseCard';
import { Button } from '../../components/common/Button';
import { useAppSelector } from '../../redux/store';
import { INITIAL_CATEGORIES } from '../../api/mockData';
import { CourseLevel } from '../../types';
import {
  Search,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  BookOpen,
  Code,
  Palette,
  Brain,
  Cloud,
  Shield,
  Smartphone,
  Briefcase,
  TrendingUp,
  Check,
} from 'lucide-react';

export const CourseCatalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { courses } = useAppSelector((state) => state.courses);

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize state with URL query parameters
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    setSelectedCategory(urlCategory || 'All');

    const urlSearch = searchParams.get('search');
    setSearchQuery(urlSearch || '');

    if (!urlCategory && !urlSearch) {
      setSelectedLevel('All');
      setPriceFilter('all');
    }
  }, [searchParams]);

  const handleCategoryChange = (catName: string) => {
    setSelectedCategory(catName);
    const newParams = new URLSearchParams(searchParams);
    if (catName === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', catName);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('search', val.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setPriceFilter('all');
    setSortBy('popular');
    setSearchParams({});
  };

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

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            course.title.toLowerCase().includes(q) ||
            course.subtitle.toLowerCase().includes(q) ||
            course.category.toLowerCase().includes(q) ||
            course.instructorName.toLowerCase().includes(q) ||
            course.tags.some((t) => t.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Category
        if (selectedCategory !== 'All' && course.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Level
        if (selectedLevel !== 'All' && course.level !== selectedLevel) {
          return false;
        }

        // Price
        if (priceFilter === 'free' && !course.isFree) return false;
        if (priceFilter === 'paid' && course.isFree) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.studentsCount - a.studentsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        if (sortBy === 'price-high') return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        return 0;
      });
  }, [courses, searchQuery, selectedCategory, selectedLevel, priceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <RoleSwitcherBanner />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Catalog Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-teal-800/40">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-teal-300 bg-teal-500/15 border border-teal-500/30">
              Explore Our Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Master the Skills of Tomorrow
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Discover industry-standard courses taught by verified experts in Web Development, Artificial Intelligence, Design, Cloud Computing, and Cyber Security.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-emerald-500/10 to-transparent pointer-events-none" />
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-xl">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by topic, instructor, framework, or skill..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-soft"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2.5 shadow-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 shadow-xs"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>
        </div>

        {/* Horizontal Category Quick-Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${selectedCategory === 'All'
              ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm shadow-teal-500/25'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            All Courses ({courses.length})
          </button>
          {INITIAL_CATEGORIES.map((cat) => {
            const count = courses.filter((c) => c.category.toLowerCase() === cat.name.toLowerCase()).length;
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            const Icon = categoryIcons[cat.icon] || Code;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${isSelected
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm shadow-teal-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                <Icon size={14} className={isSelected ? 'text-white' : 'text-slate-400'} />
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-teal-700/60 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Layout with Left Sidebar Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <div className={`space-y-6 lg:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Filter size={16} className="text-teal-600" />
                  Filter Courses
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-teal-600 hover:text-teal-800 font-semibold flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Category
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${selectedCategory === 'All'
                      ? 'bg-teal-50 text-teal-800 font-bold border-l-2 border-teal-600'
                      : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[11px] text-slate-400">({courses.length})</span>
                  </button>
                  {INITIAL_CATEGORIES.map((cat) => {
                    const count = courses.filter((c) => c.category.toLowerCase() === cat.name.toLowerCase()).length;
                    const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                    const Icon = categoryIcons[cat.icon] || Code;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.name)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${isSelected
                          ? 'bg-teal-50 text-teal-800 font-bold border-l-2 border-teal-600'
                          : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Icon size={14} className={isSelected ? 'text-teal-600' : 'text-slate-400'} />
                          <span className="truncate">{cat.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Skill Level
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <label key={lvl} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === lvl}
                        onChange={() => setSelectedLevel(lvl)}
                        className="text-teal-600 focus:ring-teal-500 rounded"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pricing Filter */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Price
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {[
                    { id: 'all', label: 'All Pricing' },
                    { id: 'paid', label: 'Paid Courses' },
                    { id: 'free', label: 'Free Access' },
                  ].map((p) => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === p.id}
                        onChange={() => setPriceFilter(p.id as any)}
                        className="text-teal-600 focus:ring-teal-500 rounded"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold bg-white px-4 py-2.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <span>Showing <strong className="text-slate-900">{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-bold border border-teal-200">
                    Category: {selectedCategory}
                  </span>
                )}
              </div>
              {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-teal-600 hover:text-teal-800 font-bold flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Clear Filters
                </button>
              )}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
                <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-800">No courses match your filters</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try clearing your search query or selecting a different category to see more results.
                </p>
                <Button size="sm" onClick={handleResetFilters} className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
