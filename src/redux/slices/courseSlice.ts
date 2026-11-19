import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, Review, CourseStatus } from '../../types';
import { INITIAL_COURSES } from '../../api/mockData';

interface CourseState {
  courses: Course[];
  searchQuery: string;
  selectedCategory: string;
  selectedLevel: string;
  priceFilter: 'all' | 'free' | 'paid';
  sortBy: 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high';
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: INITIAL_COURSES,
  searchQuery: '',
  selectedCategory: 'All',
  selectedLevel: 'All',
  priceFilter: 'all',
  sortBy: 'popular',
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedLevel: (state, action: PayloadAction<string>) => {
      state.selectedLevel = action.payload;
    },
    setPriceFilter: (state, action: PayloadAction<'all' | 'free' | 'paid'>) => {
      state.priceFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'popular' | 'rating' | 'newest' | 'price-low' | 'price-high'>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      state.selectedLevel = 'All';
      state.priceFilter = 'all';
      state.sortBy = 'popular';
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.unshift(action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const index = state.courses.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(c => c.id !== action.payload);
    },
    updateCourseStatus: (state, action: PayloadAction<{ courseId: string; status: CourseStatus }>) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.status = action.payload.status;
      }
    },
    addReview: (state, action: PayloadAction<{ courseId: string; review: Review }>) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.reviews.unshift(action.payload.review);
        course.reviewsCount += 1;
        // Recalculate average rating
        const total = course.reviews.reduce((acc, r) => acc + r.rating, 0);
        course.rating = Number((total / course.reviews.length).toFixed(1));
      }
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedLevel,
  setPriceFilter,
  setSortBy,
  resetFilters,
  addCourse,
  updateCourse,
  deleteCourse,
  updateCourseStatus,
  addReview,
} = courseSlice.actions;

export default courseSlice.reducer;

