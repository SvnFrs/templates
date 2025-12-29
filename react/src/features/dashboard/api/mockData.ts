// ============================================
// Dashboard Mock Data
// Realistic mock data for development and testing
// ============================================

import type { 
  DashboardUser, 
  DashboardQuest, 
  QuickAction, 
  DashboardActivity,
  UpcomingClass,
  LeaderboardEntry,
  FeaturedBadge,
  WeeklyStats 
} from '../types';
import type { UserStats, UserRank } from '@shared/types';

// ============================================
// Mock User Data
// ============================================

const mockUserRank: UserRank = {
  id: 'rank_gold_2',
  name: 'Gold Scholar',
  tier: 'gold',
  icon: '🏆',
  color: '#fbbf24',
  minXP: 5000,
};

const mockUserStats: UserStats = {
  level: 24,
  currentXP: 2450,
  requiredXP: 3000,
  totalXP: 24450,
  coins: 1850,
  gems: 45,
  rank: mockUserRank,
  rankPosition: 127,
  streakDays: 12,
  achievementCount: 34,
  questsCompleted: 156,
  attendanceRate: 94.5,
};

export const mockUser: DashboardUser = {
  id: 'user_001',
  studentId: 'STU2024001',
  displayName: 'Alex Chen',
  firstName: 'Alex',
  lastName: 'Chen',
  email: 'alex.chen@university.edu',
  avatar: {
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1',
    frameId: 'frame_gold',
    frameColor: '#fbbf24',
    isAnimated: false,
  },
  stats: mockUserStats,
  title: 'Code Warrior',
  clan: {
    id: 'clan_001',
    name: 'Binary Dragons',
    emblem: '🐉',
    color: '#8b5cf6',
  },
};

// ============================================
// Mock Quick Actions
// ============================================

export const mockQuickActions: QuickAction[] = [
  {
    id: 'action_attendance',
    title: 'Check In',
    description: 'Scan QR for attendance',
    icon: 'QrCode',
    iconColor: '#10b981',
    bgGradient: 'from-xp-600/20 to-xp-500/10',
    href: '/attendance/scan',
    badge: {
      text: '+50 XP',
      variant: 'xp',
    },
  },
  {
    id: 'action_timetable',
    title: 'Timetable',
    description: 'View your schedule',
    icon: 'Calendar',
    iconColor: '#6366f1',
    bgGradient: 'from-primary-600/20 to-primary-500/10',
    href: '/timetable',
  },
  {
    id: 'action_quests',
    title: 'Quest Log',
    description: '3 quests available',
    icon: 'Scroll',
    iconColor: '#a855f7',
    bgGradient: 'from-accent-600/20 to-accent-500/10',
    href: '/quests',
    badge: {
      text: '3 New',
      variant: 'accent',
    },
  },
  {
    id: 'action_inventory',
    title: 'Inventory',
    description: 'Items & rewards',
    icon: 'Backpack',
    iconColor: '#f59e0b',
    bgGradient: 'from-gold-600/20 to-gold-500/10',
    href: '/inventory',
    isNew: true,
  },
  {
    id: 'action_shop',
    title: 'Shop',
    description: 'Spend your coins',
    icon: 'ShoppingBag',
    iconColor: '#ec4899',
    bgGradient: 'from-pink-600/20 to-pink-500/10',
    href: '/shop',
  },
  {
    id: 'action_leaderboard',
    title: 'Rankings',
    description: 'Global leaderboard',
    icon: 'Trophy',
    iconColor: '#fbbf24',
    bgGradient: 'from-gold-600/20 to-amber-500/10',
    href: '/leaderboard',
  },
];

// ============================================
// Mock Active Quests
// ============================================

export const mockActiveQuests: DashboardQuest[] = [
  {
    id: 'quest_001',
    title: 'Perfect Attendance Week',
    type: 'weekly',
    category: 'attendance',
    difficulty: 'medium',
    status: 'in_progress',
    progress: {
      current: 4,
      target: 5,
      percentage: 80,
    },
    rewards: {
      xp: 500,
      coins: 200,
    },
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'CalendarCheck',
    color: '#10b981',
    isExpiringSoon: false,
    timeRemaining: '3 days left',
  },
  {
    id: 'quest_002',
    title: 'Knowledge Seeker',
    type: 'main',
    category: 'academic',
    difficulty: 'hard',
    status: 'in_progress',
    progress: {
      current: 7,
      target: 10,
      percentage: 70,
    },
    rewards: {
      xp: 1000,
      coins: 500,
      gems: 10,
    },
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'BookOpen',
    color: '#6366f1',
    timeRemaining: '7 days left',
  },
  {
    id: 'quest_003',
    title: 'Social Butterfly',
    type: 'side',
    category: 'social',
    difficulty: 'easy',
    status: 'in_progress',
    progress: {
      current: 2,
      target: 3,
      percentage: 66,
    },
    rewards: {
      xp: 150,
      coins: 75,
    },
    icon: 'Users',
    color: '#a855f7',
    timeRemaining: 'No deadline',
  },
  {
    id: 'quest_004',
    title: 'Early Bird',
    type: 'daily',
    category: 'attendance',
    difficulty: 'easy',
    status: 'in_progress',
    progress: {
      current: 0,
      target: 1,
      percentage: 0,
    },
    rewards: {
      xp: 100,
      coins: 50,
    },
    deadline: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    icon: 'Sunrise',
    color: '#f59e0b',
    isExpiringSoon: true,
    timeRemaining: '8 hours left',
  },
  {
    id: 'quest_005',
    title: 'Club Champion',
    type: 'event',
    category: 'club',
    difficulty: 'legendary',
    status: 'in_progress',
    progress: {
      current: 1,
      target: 5,
      percentage: 20,
    },
    rewards: {
      xp: 2000,
      coins: 1000,
      gems: 25,
    },
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'Flag',
    color: '#ec4899',
    timeRemaining: '2 weeks left',
  },
];

// ============================================
// Mock Recent Activity
// ============================================

export const mockActivities: DashboardActivity[] = [
  {
    id: 'activity_001',
    type: 'quest_completed',
    title: 'Quest Completed!',
    description: 'Completed "Morning Warrior" daily quest',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: 'CheckCircle',
    iconColor: '#10b981',
    xpGained: 100,
    coinsGained: 50,
  },
  {
    id: 'activity_002',
    type: 'attendance_marked',
    title: 'Attendance Recorded',
    description: 'Checked in to CS301 - Database Systems',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    icon: 'MapPin',
    iconColor: '#6366f1',
    xpGained: 50,
  },
  {
    id: 'activity_003',
    type: 'badge_earned',
    title: 'New Badge Unlocked!',
    description: 'Earned "Punctual Pioneer" badge',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    icon: 'Award',
    iconColor: '#f59e0b',
    xpGained: 200,
  },
  {
    id: 'activity_004',
    type: 'streak_achieved',
    title: '10-Day Streak!',
    description: 'You\'ve attended classes for 10 days in a row',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'Flame',
    iconColor: '#ef4444',
    xpGained: 500,
    coinsGained: 200,
  },
  {
    id: 'activity_005',
    type: 'level_up',
    title: 'Level Up!',
    description: 'Reached Level 24 - Code Warrior',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    icon: 'TrendingUp',
    iconColor: '#a855f7',
    xpGained: 0,
    coinsGained: 100,
  },
];

// ============================================
// Mock Upcoming Classes
// ============================================

export const mockUpcomingClasses: UpcomingClass[] = [
  {
    id: 'class_001',
    courseName: 'Database Systems',
    courseCode: 'CS301',
    instructor: 'Dr. Sarah Johnson',
    room: 'Room 405',
    startTime: '09:00',
    endTime: '10:30',
    color: '#6366f1',
    isNext: true,
    startsIn: '45 minutes',
  },
  {
    id: 'class_002',
    courseName: 'Software Engineering',
    courseCode: 'CS302',
    instructor: 'Prof. Michael Lee',
    room: 'Lab 201',
    startTime: '11:00',
    endTime: '12:30',
    color: '#10b981',
    startsIn: '2 hours',
  },
  {
    id: 'class_003',
    courseName: 'Machine Learning',
    courseCode: 'CS401',
    instructor: 'Dr. Emily Zhang',
    room: 'Room 301',
    startTime: '14:00',
    endTime: '15:30',
    color: '#a855f7',
    startsIn: '5 hours',
  },
  {
    id: 'class_004',
    courseName: 'Computer Networks',
    courseCode: 'CS305',
    instructor: 'Dr. James Wilson',
    room: 'Room 502',
    startTime: '16:00',
    endTime: '17:30',
    color: '#f59e0b',
    startsIn: '7 hours',
  },
];

// ============================================
// Mock Leaderboard
// ============================================

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'user_top1',
    displayName: 'Emma Watson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ec4899',
    level: 42,
    xp: 85420,
    change: 0,
  },
  {
    rank: 2,
    userId: 'user_top2',
    displayName: 'James Liu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=10b981',
    level: 40,
    xp: 78650,
    change: 2,
  },
  {
    rank: 3,
    userId: 'user_top3',
    displayName: 'Sofia Garcia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia&backgroundColor=f59e0b',
    level: 39,
    xp: 75200,
    change: -1,
  },
  {
    rank: 127,
    userId: 'user_001',
    displayName: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1',
    level: 24,
    xp: 24450,
    change: 5,
    isCurrentUser: true,
  },
];

// ============================================
// Mock Featured Badges
// ============================================

export const mockFeaturedBadges: FeaturedBadge[] = [
  {
    id: 'badge_001',
    name: 'Perfect Month',
    description: 'Attend all classes for an entire month',
    icon: '🎯',
    rarity: 'legendary',
    category: 'attendance',
    progress: {
      current: 18,
      target: 22,
    },
    isLocked: false,
    hint: '4 more classes to go!',
  },
  {
    id: 'badge_002',
    name: 'Quest Master',
    description: 'Complete 200 quests',
    icon: '⚔️',
    rarity: 'epic',
    category: 'milestone',
    progress: {
      current: 156,
      target: 200,
    },
    isLocked: false,
  },
  {
    id: 'badge_003',
    name: 'Social Legend',
    description: 'Participate in 50 club events',
    icon: '👥',
    rarity: 'rare',
    category: 'social',
    progress: {
      current: 23,
      target: 50,
    },
    isLocked: false,
  },
  {
    id: 'badge_004',
    name: 'Diamond Scholar',
    description: 'Reach Diamond rank',
    icon: '💎',
    rarity: 'legendary',
    category: 'milestone',
    isLocked: true,
    hint: 'Reach 50,000 XP to unlock',
  },
];

// ============================================
// Mock Weekly Stats
// ============================================

export const mockWeeklyStats: WeeklyStats = {
  xpEarned: 2450,
  questsCompleted: 12,
  attendanceRate: 100,
  streakDays: 5,
  comparedToLastWeek: {
    xp: 15,
    quests: 3,
    attendance: 5,
  },
};

// ============================================
// Helper function to get time-based greetings
// ============================================

export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 5) return 'Night owl still awake? 🦉';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

// ============================================
// Helper function to format relative time
// ============================================

export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ============================================
// Helper function to get difficulty color
// ============================================

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: '#10b981',
    medium: '#f59e0b',
    hard: '#ef4444',
    legendary: '#a855f7',
  };
  return colors[difficulty] || '#6b7280';
}

// ============================================
// Helper function to get difficulty label
// ============================================

export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    legendary: 'Legendary',
  };
  return labels[difficulty] || difficulty;
}