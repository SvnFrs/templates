// ============================================
// Dashboard Feature Types
// Interfaces specific to the Dashboard feature
// ============================================

import type { Quest, Badge, UserStats, TimetableEntry } from '@shared/types';

// ============================================
// Dashboard User Profile
// ============================================

export interface DashboardUser {
  id: string;
  studentId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: DashboardAvatar;
  stats: UserStats;
  title?: string;
  clan?: DashboardClan;
}

export interface DashboardAvatar {
  url: string;
  frameId?: string;
  frameColor?: string;
  isAnimated?: boolean;
}

export interface DashboardClan {
  id: string;
  name: string;
  emblem: string;
  color: string;
}

// ============================================
// Quick Action Types
// ============================================

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgGradient: string;
  href: string;
  badge?: QuickActionBadge;
  isNew?: boolean;
  isDisabled?: boolean;
}

export interface QuickActionBadge {
  text: string;
  variant: 'primary' | 'accent' | 'gold' | 'xp' | 'error';
}

// ============================================
// Active Quest Types (Dashboard View)
// ============================================

export interface DashboardQuest extends Pick<Quest, 
  | 'id' 
  | 'title' 
  | 'type' 
  | 'category' 
  | 'difficulty' 
  | 'status' 
  | 'progress' 
  | 'rewards' 
  | 'deadline' 
  | 'icon' 
  | 'color'
> {
  isExpiringSoon?: boolean;
  timeRemaining?: string;
}

// ============================================
// Stat Card Types
// ============================================

export interface StatCard {
  id: string;
  label: string;
  value: string | number;
  change?: StatChange;
  icon: string;
  iconColor: string;
  bgColor: string;
}

export interface StatChange {
  value: number;
  direction: 'up' | 'down' | 'neutral';
  label?: string;
}

// ============================================
// Activity Feed Types
// ============================================

export interface DashboardActivity {
  id: string;
  type: DashboardActivityType;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  iconColor: string;
  xpGained?: number;
  coinsGained?: number;
  metadata?: Record<string, unknown>;
}

export type DashboardActivityType =
  | 'quest_completed'
  | 'badge_earned'
  | 'level_up'
  | 'attendance_marked'
  | 'streak_achieved'
  | 'reward_claimed'
  | 'event_joined';

// ============================================
// Upcoming Schedule Types
// ============================================

export interface UpcomingClass extends Pick<TimetableEntry, 
  | 'id' 
  | 'courseName' 
  | 'courseCode' 
  | 'instructor' 
  | 'room' 
  | 'startTime' 
  | 'endTime' 
  | 'color'
> {
  isNext?: boolean;
  isOngoing?: boolean;
  startsIn?: string;
}

// ============================================
// Leaderboard Types
// ============================================

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatar: string;
  level: number;
  xp: number;
  change?: number;
  isCurrentUser?: boolean;
}

// ============================================
// Featured Badge Types
// ============================================

export interface FeaturedBadge extends Badge {
  progress?: {
    current: number;
    target: number;
  };
  isLocked?: boolean;
  hint?: string;
}

// ============================================
// Dashboard State Types
// ============================================

export interface DashboardState {
  user: DashboardUser | null;
  quests: DashboardQuest[];
  activities: DashboardActivity[];
  upcomingClasses: UpcomingClass[];
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
}

export interface DashboardFilters {
  questType?: Quest['type'];
  timeRange?: 'today' | 'week' | 'month';
}

// ============================================
// Dashboard API Response Types
// ============================================

export interface DashboardDataResponse {
  user: DashboardUser;
  activeQuests: DashboardQuest[];
  recentActivity: DashboardActivity[];
  upcomingSchedule: UpcomingClass[];
  featuredBadges: FeaturedBadge[];
  weeklyStats: WeeklyStats;
}

export interface WeeklyStats {
  xpEarned: number;
  questsCompleted: number;
  attendanceRate: number;
  streakDays: number;
  comparedToLastWeek: {
    xp: number;
    quests: number;
    attendance: number;
  };
}