// ============================================
// Dashboard Zustand Store
// Client-side state management for dashboard feature
// ============================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  DashboardUser,
  DashboardQuest,
  DashboardActivity,
  UpcomingClass,
  LeaderboardEntry,
  FeaturedBadge,
  WeeklyStats,
  DashboardFilters,
} from '../types';
import {
  mockUser,
  mockActiveQuests,
  mockActivities,
  mockUpcomingClasses,
  mockLeaderboard,
  mockFeaturedBadges,
  mockWeeklyStats,
} from '../api/mockData';

// ============================================
// Store State Interface
// ============================================

interface DashboardState {
  // Data
  user: DashboardUser | null;
  activeQuests: DashboardQuest[];
  activities: DashboardActivity[];
  upcomingClasses: UpcomingClass[];
  leaderboard: LeaderboardEntry[];
  featuredBadges: FeaturedBadge[];
  weeklyStats: WeeklyStats | null;

  // UI State
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  filters: DashboardFilters;
  
  // Preferences
  showCompletedQuests: boolean;
  activityLimit: number;
  
  // Actions
  setUser: (user: DashboardUser | null) => void;
  setActiveQuests: (quests: DashboardQuest[]) => void;
  setActivities: (activities: DashboardActivity[]) => void;
  setUpcomingClasses: (classes: UpcomingClass[]) => void;
  setLeaderboard: (entries: LeaderboardEntry[]) => void;
  setFeaturedBadges: (badges: FeaturedBadge[]) => void;
  setWeeklyStats: (stats: WeeklyStats | null) => void;
  
  // Loading & Error
  setLoading: (loading: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
  setError: (error: string | null) => void;
  
  // Filters & Preferences
  setFilters: (filters: Partial<DashboardFilters>) => void;
  toggleShowCompletedQuests: () => void;
  setActivityLimit: (limit: number) => void;
  
  // Data Operations
  fetchDashboardData: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
  updateQuestProgress: (questId: string, progress: number) => void;
  addActivity: (activity: DashboardActivity) => void;
  
  // XP & Coins animations
  pendingXPGain: number;
  pendingCoinsGain: number;
  addPendingXP: (amount: number) => void;
  addPendingCoins: (amount: number) => void;
  clearPendingRewards: () => void;
  
  // Reset
  resetStore: () => void;
}

// ============================================
// Initial State
// ============================================

const initialState = {
  user: null,
  activeQuests: [],
  activities: [],
  upcomingClasses: [],
  leaderboard: [],
  featuredBadges: [],
  weeklyStats: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
  filters: {},
  showCompletedQuests: false,
  activityLimit: 5,
  pendingXPGain: 0,
  pendingCoinsGain: 0,
};

// ============================================
// Store Implementation
// ============================================

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // ============================================
        // Setters
        // ============================================
        
        setUser: (user) => set({ user }, false, 'setUser'),
        
        setActiveQuests: (activeQuests) => 
          set({ activeQuests }, false, 'setActiveQuests'),
        
        setActivities: (activities) => 
          set({ activities }, false, 'setActivities'),
        
        setUpcomingClasses: (upcomingClasses) => 
          set({ upcomingClasses }, false, 'setUpcomingClasses'),
        
        setLeaderboard: (leaderboard) => 
          set({ leaderboard }, false, 'setLeaderboard'),
        
        setFeaturedBadges: (featuredBadges) => 
          set({ featuredBadges }, false, 'setFeaturedBadges'),
        
        setWeeklyStats: (weeklyStats) => 
          set({ weeklyStats }, false, 'setWeeklyStats'),

        // ============================================
        // Loading & Error Handlers
        // ============================================
        
        setLoading: (isLoading) => 
          set({ isLoading }, false, 'setLoading'),
        
        setRefreshing: (isRefreshing) => 
          set({ isRefreshing }, false, 'setRefreshing'),
        
        setError: (error) => 
          set({ error }, false, 'setError'),

        // ============================================
        // Filters & Preferences
        // ============================================
        
        setFilters: (newFilters) =>
          set(
            (state) => ({ filters: { ...state.filters, ...newFilters } }),
            false,
            'setFilters'
          ),
        
        toggleShowCompletedQuests: () =>
          set(
            (state) => ({ showCompletedQuests: !state.showCompletedQuests }),
            false,
            'toggleShowCompletedQuests'
          ),
        
        setActivityLimit: (activityLimit) =>
          set({ activityLimit }, false, 'setActivityLimit'),

        // ============================================
        // Data Fetching Operations
        // ============================================
        
        fetchDashboardData: async () => {
          const { setLoading, setError } = get();
          
          setLoading(true);
          setError(null);
          
          try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            
            // In production, this would be actual API calls
            // For now, using mock data
            set({
              user: mockUser,
              activeQuests: mockActiveQuests,
              activities: mockActivities,
              upcomingClasses: mockUpcomingClasses,
              leaderboard: mockLeaderboard,
              featuredBadges: mockFeaturedBadges,
              weeklyStats: mockWeeklyStats,
              isLoading: false,
            }, false, 'fetchDashboardData/success');
            
          } catch (error) {
            const errorMessage = error instanceof Error 
              ? error.message 
              : 'Failed to fetch dashboard data';
            
            set({ 
              error: errorMessage, 
              isLoading: false 
            }, false, 'fetchDashboardData/error');
          }
        },
        
        refreshDashboard: async () => {
          const { setRefreshing, setError } = get();
          
          setRefreshing(true);
          setError(null);
          
          try {
            // Simulate API delay (shorter for refresh)
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            // Refresh with slightly updated mock data
            const updatedStats = {
              ...mockUser.stats,
              currentXP: mockUser.stats.currentXP + Math.floor(Math.random() * 50),
            };
            
            set({
              user: { ...mockUser, stats: updatedStats },
              activeQuests: mockActiveQuests,
              activities: mockActivities,
              upcomingClasses: mockUpcomingClasses,
              isRefreshing: false,
            }, false, 'refreshDashboard/success');
            
          } catch (error) {
            const errorMessage = error instanceof Error 
              ? error.message 
              : 'Failed to refresh dashboard';
            
            set({ 
              error: errorMessage, 
              isRefreshing: false 
            }, false, 'refreshDashboard/error');
          }
        },

        // ============================================
        // Quest Operations
        // ============================================
        
        updateQuestProgress: (questId, progress) =>
          set(
            (state) => ({
              activeQuests: state.activeQuests.map((quest) =>
                quest.id === questId
                  ? {
                      ...quest,
                      progress: {
                        ...quest.progress,
                        current: progress,
                        percentage: Math.min(
                          (progress / quest.progress.target) * 100,
                          100
                        ),
                      },
                      status: progress >= quest.progress.target 
                        ? 'completed' 
                        : quest.status,
                    }
                  : quest
              ),
            }),
            false,
            'updateQuestProgress'
          ),

        // ============================================
        // Activity Operations
        // ============================================
        
        addActivity: (activity) =>
          set(
            (state) => ({
              activities: [activity, ...state.activities].slice(0, 20),
            }),
            false,
            'addActivity'
          ),

        // ============================================
        // Pending Rewards (for animations)
        // ============================================
        
        addPendingXP: (amount) =>
          set(
            (state) => ({ pendingXPGain: state.pendingXPGain + amount }),
            false,
            'addPendingXP'
          ),
        
        addPendingCoins: (amount) =>
          set(
            (state) => ({ pendingCoinsGain: state.pendingCoinsGain + amount }),
            false,
            'addPendingCoins'
          ),
        
        clearPendingRewards: () =>
          set(
            { pendingXPGain: 0, pendingCoinsGain: 0 },
            false,
            'clearPendingRewards'
          ),

        // ============================================
        // Reset Store
        // ============================================
        
        resetStore: () => set(initialState, false, 'resetStore'),
      }),
      {
        name: 'dashboard-storage',
        partialize: (state) => ({
          // Only persist preferences, not data
          showCompletedQuests: state.showCompletedQuests,
          activityLimit: state.activityLimit,
          filters: state.filters,
        }),
      }
    ),
    { name: 'DashboardStore' }
  )
);

// ============================================
// Selectors (for optimized re-renders)
// ============================================

export const selectUser = (state: DashboardState) => state.user;
export const selectUserStats = (state: DashboardState) => state.user?.stats;
export const selectActiveQuests = (state: DashboardState) => state.activeQuests;
export const selectActivities = (state: DashboardState) => state.activities;
export const selectUpcomingClasses = (state: DashboardState) => state.upcomingClasses;
export const selectLeaderboard = (state: DashboardState) => state.leaderboard;
export const selectIsLoading = (state: DashboardState) => state.isLoading;
export const selectError = (state: DashboardState) => state.error;

// Computed selectors
export const selectInProgressQuests = (state: DashboardState) =>
  state.activeQuests.filter((quest) => quest.status === 'in_progress');

export const selectDailyQuests = (state: DashboardState) =>
  state.activeQuests.filter((quest) => quest.type === 'daily');

export const selectExpiringQuests = (state: DashboardState) =>
  state.activeQuests.filter((quest) => quest.isExpiringSoon);

export const selectLimitedActivities = (state: DashboardState) =>
  state.activities.slice(0, state.activityLimit);

export const selectCurrentUserRank = (state: DashboardState) =>
  state.leaderboard.find((entry) => entry.isCurrentUser);

// ============================================
// Hooks for common patterns
// ============================================

export function useDashboardUser() {
  return useDashboardStore(selectUser);
}

export function useDashboardQuests() {
  return useDashboardStore(selectActiveQuests);
}

export function useDashboardActivities() {
  return useDashboardStore(selectLimitedActivities);
}

export function useDashboardLoading() {
  const isLoading = useDashboardStore(selectIsLoading);
  const isRefreshing = useDashboardStore((state) => state.isRefreshing);
  return { isLoading, isRefreshing };
}