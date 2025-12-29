// ============================================
// Dashboard Feature - Barrel Export
// Centralized exports for the dashboard feature module
// ============================================

// Pages
export { DashboardPage } from './pages/DashboardPage';

// Components
export { UserStatsHeader } from './components/UserStatsHeader';
export { QuickActionsGrid, CompactQuickActions } from './components/QuickActionsGrid';
export { ActiveQuestsList } from './components/ActiveQuestsList';

// Store
export {
  useDashboardStore,
  // Selectors
  selectUser,
  selectUserStats,
  selectActiveQuests,
  selectActivities,
  selectUpcomingClasses,
  selectLeaderboard,
  selectIsLoading,
  selectError,
  selectInProgressQuests,
  selectDailyQuests,
  selectExpiringQuests,
  selectLimitedActivities,
  selectCurrentUserRank,
  // Hooks
  useDashboardUser,
  useDashboardQuests,
  useDashboardActivities,
  useDashboardLoading,
} from './stores/dashboardStore';

// Types
export type {
  DashboardUser,
  DashboardAvatar,
  DashboardClan,
  QuickAction,
  QuickActionBadge,
  DashboardQuest,
  StatCard,
  StatChange,
  DashboardActivity,
  DashboardActivityType,
  UpcomingClass,
  LeaderboardEntry,
  FeaturedBadge,
  DashboardState,
  DashboardFilters,
  DashboardDataResponse,
  WeeklyStats,
} from './types';

// Mock Data (for development)
export {
  mockUser,
  mockQuickActions,
  mockActiveQuests,
  mockActivities,
  mockUpcomingClasses,
  mockLeaderboard,
  mockFeaturedBadges,
  mockWeeklyStats,
  getGreeting,
  formatRelativeTime,
  getDifficultyColor,
  getDifficultyLabel,
} from './api/mockData';