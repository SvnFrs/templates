// ============================================
// ActiveQuestsList Component
// Displays active quests with progress bars and animations
// ============================================

import { motion, AnimatePresence } from 'framer-motion';
import {
  Scroll,
  Clock,
  Star,
  ChevronRight,
  Zap,
  CalendarCheck,
  BookOpen,
  Users,
  Sunrise,
  Flag,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@shared/utils';
import { GlassPanel, GlassPanelHeader } from '@shared/components/ui/GlassPanel';
import { Badge } from '@shared/components/ui/Badge';
import { QuestProgressBar } from '@shared/components/ui/ProgressBar';
import { Button } from '@shared/components/ui/Button';
import type { DashboardQuest } from '../types';
import { getDifficultyColor, getDifficultyLabel } from '../api/mockData';

// ============================================
// Types
// ============================================

export interface ActiveQuestsListProps {
  quests: DashboardQuest[];
  maxDisplay?: number;
  showViewAll?: boolean;
  className?: string;
  onQuestClick?: (quest: DashboardQuest) => void;
  onViewAllClick?: () => void;
}

// ============================================
// Icon Mapping
// ============================================

const questIconMap: Record<string, LucideIcon> = {
  CalendarCheck,
  BookOpen,
  Users,
  Sunrise,
  Flag,
  Scroll,
  Star,
  Zap,
};

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================
// Quest Type Badge Component
// ============================================

interface QuestTypeBadgeProps {
  type: DashboardQuest['type'];
}

function QuestTypeBadge({ type }: QuestTypeBadgeProps) {
  const typeConfig: Record<string, { label: string; variant: 'primary' | 'accent' | 'gold' | 'xp' | 'warning' }> = {
    daily: { label: 'Daily', variant: 'xp' },
    weekly: { label: 'Weekly', variant: 'primary' },
    main: { label: 'Main', variant: 'accent' },
    side: { label: 'Side', variant: 'primary' },
    event: { label: 'Event', variant: 'gold' },
    achievement: { label: 'Achievement', variant: 'warning' },
  };

  const config = typeConfig[type] || typeConfig.side;

  return (
    <Badge variant={config.variant} size="xs" className="text-[10px]">
      {config.label}
    </Badge>
  );
}

// ============================================
// Quest Card Component
// ============================================

interface QuestCardProps {
  quest: DashboardQuest;
  onClick?: () => void;
}

function QuestCard({ quest, onClick }: QuestCardProps) {
  const IconComponent = questIconMap[quest.icon] || Scroll;
  const difficultyColor = getDifficultyColor(quest.difficulty);
  const isComplete = quest.progress.percentage >= 100;
  const isExpiring = quest.isExpiringSoon;

  return (
    <motion.button
      className={cn(
        'w-full text-left',
        'relative p-4 rounded-xl',
        'bg-dark-800/40',
        'border border-white/5',
        'transition-all duration-300',
        'hover:bg-dark-800/60',
        'hover:border-white/10',
        'active:scale-[0.99]',
        'group',
        'overflow-hidden'
      )}
      onClick={onClick}
      variants={itemVariants}
      whileHover={{ 
        y: -2,
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Expiring indicator */}
      {isExpiring && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 100%' }}
        />
      )}

      {/* Background glow on hover */}
      <div 
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100',
          'transition-opacity duration-500',
          'pointer-events-none'
        )}
        style={{
          background: `radial-gradient(circle at left center, ${quest.color}15 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0',
            'flex items-center justify-center',
            'w-10 h-10 rounded-lg',
            'bg-dark-900/60',
            'border border-white/10',
            'transition-all duration-300',
            'group-hover:scale-110',
            'group-hover:border-white/20'
          )}
          style={{
            boxShadow: `0 0 15px ${quest.color}25`,
          }}
        >
          <IconComponent 
            className="w-5 h-5"
            style={{ color: quest.color }}
          />
        </div>

        {/* Quest Info */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-white truncate">
                {quest.title}
              </h4>
              <QuestTypeBadge type={quest.type} />
            </div>
            
            {/* Difficulty Indicator */}
            <div 
              className="flex-shrink-0 w-2 h-2 rounded-full"
              style={{ backgroundColor: difficultyColor }}
              title={getDifficultyLabel(quest.difficulty)}
            />
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <QuestProgressBar
              current={quest.progress.current}
              target={quest.progress.target}
              showSteps
              size="sm"
            />
          </div>

          {/* Bottom Row - Rewards & Time */}
          <div className="flex items-center justify-between text-xs">
            {/* Rewards */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xp-400">
                <Zap className="w-3 h-3" />
                <span className="font-medium">+{quest.rewards.xp} XP</span>
              </span>
              {quest.rewards.coins > 0 && (
                <span className="flex items-center gap-1 text-gold-400">
                  <Star className="w-3 h-3" />
                  <span className="font-medium">+{quest.rewards.coins}</span>
                </span>
              )}
            </div>

            {/* Time Remaining */}
            {quest.timeRemaining && (
              <span 
                className={cn(
                  'flex items-center gap-1',
                  isExpiring ? 'text-red-400' : 'text-dark-400'
                )}
              >
                {isExpiring && <AlertCircle className="w-3 h-3" />}
                <Clock className="w-3 h-3" />
                <span>{quest.timeRemaining}</span>
              </span>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <ChevronRight 
          className={cn(
            'flex-shrink-0 w-4 h-4 text-dark-500',
            'transition-all duration-300',
            'group-hover:text-dark-300',
            'group-hover:translate-x-1'
          )}
        />
      </div>

      {/* Complete overlay */}
      {isComplete && (
        <motion.div
          className="absolute inset-0 bg-xp-500/10 rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Badge variant="xp" size="md" glow>
            Ready to Claim!
          </Badge>
        </motion.div>
      )}
    </motion.button>
  );
}

// ============================================
// Empty State Component
// ============================================

function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-16 h-16 rounded-full bg-dark-800/50 flex items-center justify-center mb-4">
        <Scroll className="w-8 h-8 text-dark-500" />
      </div>
      <h4 className="text-sm font-medium text-dark-300 mb-1">
        No Active Quests
      </h4>
      <p className="text-xs text-dark-500 max-w-[200px]">
        Check the Quest Log for new adventures to embark on!
      </p>
    </motion.div>
  );
}

// ============================================
// Main Component
// ============================================

export function ActiveQuestsList({
  quests,
  maxDisplay = 4,
  showViewAll = true,
  className,
  onQuestClick,
  onViewAllClick,
}: ActiveQuestsListProps) {
  const displayedQuests = quests.slice(0, maxDisplay);
  const hasMoreQuests = quests.length > maxDisplay;
  const remainingCount = quests.length - maxDisplay;

  return (
    <motion.div
      className={cn('w-full', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <GlassPanel
        variant="default"
        size="lg"
        hoverEffect={false}
        clickEffect={false}
      >
        <GlassPanelHeader
          title="Active Quests"
          subtitle={`${quests.length} in progress`}
          icon={<Scroll className="w-5 h-5" />}
          action={
            showViewAll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewAllClick}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                View All
              </Button>
            )
          }
        />

        {/* Quest List */}
        <AnimatePresence mode="popLayout">
          {displayedQuests.length > 0 ? (
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
            >
              {displayedQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onClick={() => onQuestClick?.(quest)}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>

        {/* View More Indicator */}
        {hasMoreQuests && showViewAll && (
          <motion.div
            className="mt-4 pt-4 border-t border-white/5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={onViewAllClick}
              className="w-full"
            >
              View {remainingCount} more quest{remainingCount > 1 ? 's' : ''}
            </Button>
          </motion.div>
        )}
      </GlassPanel>
    </motion.div>
  );
}

export default ActiveQuestsList;