// ============================================
// DashboardPage Component
// Main dashboard view with user stats, quests, and quick actions
// ============================================

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Bell, Settings, TrendingUp, Calendar, Clock } from 'lucide-react';
import { cn } from '@shared/utils';
import { GlassPanel, GlassPanelHeader } from '@shared/components/ui/GlassPanel';
import { Button, IconButton } from '@shared/components/ui/Button';
import { Badge } from '@shared/components/ui/Badge';
import { useDashboardStore } from '../stores/dashboardStore';
import { UserStatsHeader } from '../components/UserStatsHeader';
import { QuickActionsGrid } from '../components/QuickActionsGrid';
import { ActiveQuestsList } from '../components/ActiveQuestsList';
import { mockQuickActions } from '../api/mockData';
import type { QuickAction, DashboardQuest, UpcomingClass } from '../types';

// ============================================
// Animation Variants
// ============================================

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

// ============================================
// Upcoming Classes Section Component
// ============================================

interface UpcomingClassesSectionProps {
  classes: UpcomingClass[];
  className?: string;
}

function UpcomingClassesSection({ classes, className }: UpcomingClassesSectionProps) {
  if (classes.length === 0) return null;

  return (
    <motion.div variants={sectionVariants} className={className}>
      <GlassPanel
        variant="default"
        size="lg"
        hoverEffect={false}
        clickEffect={false}
      >
        <GlassPanelHeader
          title="Today's Schedule"
          subtitle={`${classes.length} classes`}
          icon={<Calendar className="w-5 h-5" />}
        />

        <div className="space-y-3">
          {classes.slice(0, 3).map((classItem, index) => (
            <motion.div
              key={classItem.id}
              className={cn(
                'relative flex items-center gap-4 p-3 rounded-xl',
                'bg-dark-800/40 border border-white/5',
                'transition-all duration-200',
                'hover:bg-dark-800/60 hover:border-white/10',
                classItem.isNext && 'ring-1 ring-primary-500/30'
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Time indicator line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ backgroundColor: classItem.color }}
              />

              {/* Time */}
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-sm font-semibold text-white">
                  {classItem.startTime}
                </span>
                <span className="text-xs text-dark-400">
                  {classItem.endTime}
                </span>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-white/10" />

              {/* Class Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-medium text-white truncate">
                    {classItem.courseName}
                  </h4>
                  {classItem.isNext && (
                    <Badge variant="primary" size="xs">
                      Next
                    </Badge>
                  )}
                  {classItem.isOngoing && (
                    <Badge variant="xp" size="xs" dot dotPulse>
                      Live
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-dark-400 truncate">
                  {classItem.room} • {classItem.instructor}
                </p>
              </div>

              {/* Time until */}
              {classItem.startsIn && (
                <div className="flex items-center gap-1 text-xs text-dark-400">
                  <Clock className="w-3 h-3" />
                  <span>{classItem.startsIn}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}

// ============================================
// Weekly Stats Section Component
// ============================================

interface WeeklyStatsSectionProps {
  stats: {
    xpEarned: number;
    questsCompleted: number;
    attendanceRate: number;
    streakDays: number;
    comparedToLastWeek: {
      xp: number;
      quests: number;
      attendance: number;
    };
  } | null;
  className?: string;
}

function WeeklyStatsSection({ stats, className }: WeeklyStatsSectionProps) {
  if (!stats) return null;

  const statItems = [
    {
      label: 'XP Earned',
      value: stats.xpEarned.toLocaleString(),
      change: stats.comparedToLastWeek.xp,
      color: 'text-xp-400',
      bgColor: 'bg-xp-500/10',
    },
    {
      label: 'Quests Done',
      value: stats.questsCompleted,
      change: stats.comparedToLastWeek.quests,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10',
    },
    {
      label: 'Attendance',
      value: `${stats.attendanceRate}%`,
      change: stats.comparedToLastWeek.attendance,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/10',
    },
  ];

  return (
    <motion.div variants={sectionVariants} className={className}>
      <GlassPanel
        variant="default"
        size="lg"
        hoverEffect={false}
        clickEffect={false}
      >
        <GlassPanelHeader
          title="This Week"
          subtitle="Your progress"
          icon={<TrendingUp className="w-5 h-5" />}
        />

        <div className="grid grid-cols-3 gap-3">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={cn(
                'flex flex-col items-center p-3 rounded-xl',
                item.bgColor,
                'border border-white/5'
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={cn('text-lg font-bold', item.color)}>
                {item.value}
              </span>
              <span className="text-[10px] text-dark-400 text-center mt-0.5">
                {item.label}
              </span>
              {item.change !== 0 && (
                <span
                  className={cn(
                    'text-[10px] font-medium mt-1',
                    item.change > 0 ? 'text-xp-400' : 'text-red-400'
                  )}
                >
                  {item.change > 0 ? '+' : ''}
                  {item.change}%
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}

// ============================================
// Loading Skeleton Component
// ============================================

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="h-48 bg-dark-800/50 rounded-2xl" />
      
      {/* Quick actions skeleton */}
      <div className="h-40 bg-dark-800/50 rounded-2xl" />
      
      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-dark-800/50 rounded-2xl" />
        <div className="h-80 bg-dark-800/50 rounded-2xl" />
      </div>
    </div>
  );
}

// ============================================
// Main Dashboard Page Component
// ============================================

export function DashboardPage() {
  const {
    user,
    activeQuests,
    upcomingClasses,
    weeklyStats,
    isLoading,
    isRefreshing,
    error,
    fetchDashboardData,
    refreshDashboard,
  } = useDashboardStore();

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Handlers
  const handleRefresh = () => {
    refreshDashboard();
  };

  const handleQuickActionClick = (action: QuickAction) => {
    console.log('Quick action clicked:', action.id);
    // Navigation would happen here
  };

  const handleQuestClick = (quest: DashboardQuest) => {
    console.log('Quest clicked:', quest.id);
    // Navigation to quest details would happen here
  };

  const handleViewAllQuests = () => {
    console.log('View all quests');
    // Navigation to quests page would happen here
  };

  // Error state
  if (error && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-dark-400 mb-4">{error}</p>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading && !user) {
    return (
      <div className="container-app py-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      className="container-app py-6 pb-24 md:pb-6 md:pl-24"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Actions Bar */}
      <motion.div
        className="flex items-center justify-end gap-2 mb-6"
        variants={sectionVariants}
      >
        <IconButton
          icon={<RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />}
          variant="ghost"
          size="sm"
          aria-label="Refresh dashboard"
          onClick={handleRefresh}
          isDisabled={isRefreshing}
        />
        <IconButton
          icon={<Bell className="w-4 h-4" />}
          variant="ghost"
          size="sm"
          aria-label="Notifications"
        />
        <IconButton
          icon={<Settings className="w-4 h-4" />}
          variant="ghost"
          size="sm"
          aria-label="Settings"
        />
      </motion.div>

      {/* User Stats Header */}
      {user && (
        <motion.div variants={sectionVariants} className="mb-6">
          <UserStatsHeader
            user={user}
            onAvatarClick={() => console.log('Avatar clicked')}
            onCoinsClick={() => console.log('Coins clicked')}
            onRankClick={() => console.log('Rank clicked')}
          />
        </motion.div>
      )}

      {/* Quick Actions Grid */}
      <motion.div variants={sectionVariants} className="mb-6">
        <QuickActionsGrid
          actions={mockQuickActions}
          onActionClick={handleQuickActionClick}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Active Quests */}
          <motion.div variants={sectionVariants}>
            <ActiveQuestsList
              quests={activeQuests}
              maxDisplay={4}
              showViewAll
              onQuestClick={handleQuestClick}
              onViewAllClick={handleViewAllQuests}
            />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <UpcomingClassesSection classes={upcomingClasses} />

          {/* Weekly Stats */}
          <WeeklyStatsSection stats={weeklyStats} />
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPage;