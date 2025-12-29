// ============================================
// Global Type Definitions
// Gamified University Platform
// ============================================

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  studentId: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: UserAvatar;
  role: UserRole;
  stats: UserStats;
  preferences: UserPreferences;
  createdAt: string;
  lastLoginAt: string;
}

export interface UserAvatar {
  url: string;
  frameId?: string;
  borderColor?: string;
  isAnimated?: boolean;
}

export type UserRole = 'student' | 'club_manager' | 'staff' | 'admin';

export interface UserStats {
  level: number;
  currentXP: number;
  requiredXP: number;
  totalXP: number;
  coins: number;
  gems: number;
  rank: UserRank;
  rankPosition: number;
  streakDays: number;
  achievementCount: number;
  questsCompleted: number;
  attendanceRate: number;
}

export interface UserRank {
  id: string;
  name: string;
  tier: RankTier;
  icon: string;
  color: string;
  minXP: number;
}

export type RankTier = 
  | 'bronze' 
  | 'silver' 
  | 'gold' 
  | 'platinum' 
  | 'diamond' 
  | 'master' 
  | 'legend';

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  language: string;
  notifications: NotificationPreferences;
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  questReminders: boolean;
  attendanceAlerts: boolean;
  achievementAlerts: boolean;
}

// ============================================
// Quest Types
// ============================================

export interface Quest {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  type: QuestType;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  progress: QuestProgress;
  rewards: QuestRewards;
  requirements: QuestRequirement[];
  deadline?: string;
  startedAt?: string;
  completedAt?: string;
  icon: string;
  color: string;
  isDaily?: boolean;
  isWeekly?: boolean;
  isFeatured?: boolean;
}

export type QuestType = 
  | 'main' 
  | 'side' 
  | 'daily' 
  | 'weekly' 
  | 'event' 
  | 'achievement';

export type QuestCategory = 
  | 'academic' 
  | 'attendance' 
  | 'social' 
  | 'club' 
  | 'wellness' 
  | 'special';

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';

export type QuestStatus = 
  | 'locked' 
  | 'available' 
  | 'in_progress' 
  | 'completed' 
  | 'claimed' 
  | 'expired';

export interface QuestProgress {
  current: number;
  target: number;
  percentage: number;
  milestones?: QuestMilestone[];
}

export interface QuestMilestone {
  id: string;
  name: string;
  target: number;
  reward: Partial<QuestRewards>;
  isCompleted: boolean;
}

export interface QuestRewards {
  xp: number;
  coins: number;
  gems?: number;
  items?: RewardItem[];
  badge?: Badge;
}

export interface RewardItem {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  icon: string;
  quantity: number;
}

export type ItemType = 
  | 'avatar_frame' 
  | 'badge' 
  | 'title' 
  | 'theme' 
  | 'powerup' 
  | 'cosmetic';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface QuestRequirement {
  id: string;
  type: RequirementType;
  description: string;
  current: number;
  target: number;
  isCompleted: boolean;
}

export type RequirementType = 
  | 'attendance' 
  | 'assignment' 
  | 'event' 
  | 'social' 
  | 'streak' 
  | 'level';

// ============================================
// Badge & Achievement Types
// ============================================

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: ItemRarity;
  category: BadgeCategory;
  unlockedAt?: string;
  isNew?: boolean;
}

export type BadgeCategory = 
  | 'academic' 
  | 'social' 
  | 'attendance' 
  | 'special' 
  | 'event' 
  | 'milestone';

// ============================================
// Activity & Notification Types
// ============================================

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
  metadata?: Record<string, unknown>;
}

export type ActivityType = 
  | 'quest_completed' 
  | 'level_up' 
  | 'badge_earned' 
  | 'reward_claimed' 
  | 'attendance_marked' 
  | 'streak_achieved';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export type NotificationType = 
  | 'info' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'achievement' 
  | 'quest';

// ============================================
// Schedule & Attendance Types
// ============================================

export interface TimetableEntry {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  room: string;
  building?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  color: string;
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  date: string;
  status: AttendanceStatus;
  markedAt?: string;
  markedVia?: 'qr' | 'manual' | 'geolocation';
}

export type AttendanceStatus = 'present' | 'late' | 'absent' | 'excused';

// ============================================
// UI Component Props Types
// ============================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface MotionComponentProps extends BaseComponentProps {
  animate?: boolean;
  delay?: number;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// ============================================
// Store State Types
// ============================================

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}