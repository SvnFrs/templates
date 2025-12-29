// ============================================
// UserStatsHeader Component
// Displays user avatar, level, XP progress, coins, and rank
// ============================================

import { motion } from 'framer-motion';
import { 
  Coins, 
  Gem, 
  Trophy, 
  Flame, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';
import { cn } from '@shared/utils';
import { GlassPanel } from '@shared/components/ui/GlassPanel';
import { Avatar } from '@shared/components/ui/Avatar';
import { XPProgressBar } from '@shared/components/ui/ProgressBar';
import { Badge } from '@shared/components/ui/Badge';
import type { DashboardUser } from '../types';
import { getGreeting } from '../api/mockData';

// ============================================
// Types
// ============================================

export interface UserStatsHeaderProps {
  user: DashboardUser;
  className?: string;
  onAvatarClick?: () => void;
  onCoinsClick?: () => void;
  onRankClick?: () => void;
}

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const numberVariants = {
  initial: { scale: 1 },
  pulse: { 
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  },
};

// ============================================
// Stat Item Component
// ============================================

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label?: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
  pulse?: boolean;
  className?: string;
}

function StatItem({ 
  icon, 
  value, 
  label, 
  color, 
  bgColor, 
  onClick,
  pulse,
  className 
}: StatItemProps) {
  return (
    <motion.button
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl',
        'transition-all duration-200',
        bgColor,
        onClick && 'cursor-pointer hover:scale-105 active:scale-95',
        !onClick && 'cursor-default',
        className
      )}
      onClick={onClick}
      variants={itemVariants}
      whileHover={onClick ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
    >
      <span className={cn('flex-shrink-0', color)}>
        {icon}
      </span>
      <div className="flex flex-col items-start">
        <motion.span 
          className="text-sm font-bold text-white"
          variants={numberVariants}
          animate={pulse ? 'pulse' : 'initial'}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </motion.span>
        {label && (
          <span className="text-[10px] text-dark-400 leading-tight">
            {label}
          </span>
        )}
      </div>
    </motion.button>
  );
}

// ============================================
// Rank Badge Component
// ============================================

interface RankBadgeProps {
  rank: DashboardUser['stats']['rank'];
  position: number;
  onClick?: () => void;
}

function RankBadge({ rank, position, onClick }: RankBadgeProps) {
  const tierColors: Record<string, { bg: string; border: string; text: string }> = {
    bronze: { bg: 'from-amber-700/30 to-amber-600/20', border: 'border-amber-600/40', text: 'text-amber-400' },
    silver: { bg: 'from-slate-400/30 to-slate-300/20', border: 'border-slate-400/40', text: 'text-slate-300' },
    gold: { bg: 'from-gold-500/30 to-gold-400/20', border: 'border-gold-500/40', text: 'text-gold-400' },
    platinum: { bg: 'from-cyan-500/30 to-cyan-400/20', border: 'border-cyan-500/40', text: 'text-cyan-400' },
    diamond: { bg: 'from-blue-500/30 to-blue-400/20', border: 'border-blue-500/40', text: 'text-blue-400' },
    master: { bg: 'from-accent-500/30 to-accent-400/20', border: 'border-accent-500/40', text: 'text-accent-400' },
    legend: { bg: 'from-red-500/30 to-orange-400/20', border: 'border-red-500/40', text: 'text-red-400' },
  };

  const colors = tierColors[rank.tier] || tierColors.bronze;

  return (
    <motion.button
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl',
        'bg-gradient-to-r border',
        colors.bg,
        colors.border,
        'cursor-pointer hover:scale-105 active:scale-95',
        'transition-all duration-200'
      )}
      onClick={onClick}
      variants={itemVariants}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Trophy className={cn('w-4 h-4', colors.text)} />
      <div className="flex flex-col items-start">
        <span className={cn('text-sm font-bold', colors.text)}>
          #{position}
        </span>
        <span className="text-[10px] text-dark-400 leading-tight">
          {rank.name}
        </span>
      </div>
      <ChevronRight className="w-3 h-3 text-dark-500 ml-1" />
    </motion.button>
  );
}

// ============================================
// Main Component
// ============================================

export function UserStatsHeader({
  user,
  className,
  onAvatarClick,
  onCoinsClick,
  onRankClick,
}: UserStatsHeaderProps) {
  const { stats, avatar, displayName, title, clan } = user;
  const greeting = getGreeting();
  const xpProgress = (stats.currentXP / stats.requiredXP) * 100;

  return (
    <motion.div
      className={cn('w-full', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <GlassPanel
        variant="elevated"
        size="lg"
        className="overflow-visible"
        hoverEffect={false}
        clickEffect={false}
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {/* Gradient orb */}
          <div 
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
          />
          <div 
            className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-15 blur-2xl"
            style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top Row - Avatar, User Info, Quick Stats */}
          <div className="flex items-start gap-4">
            {/* Avatar with Level Ring */}
            <motion.div 
              className="relative flex-shrink-0"
              variants={itemVariants}
            >
              <Avatar
                src={avatar.url}
                name={displayName}
                size="xl"
                showLevelRing
                levelProgress={xpProgress}
                showLevel
                level={stats.level}
                frame={avatar.frameId ? 'gold' : 'default'}
                status="online"
                onClick={onAvatarClick}
                animated
              />
              
              {/* Sparkle effect */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3 
                }}
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
              </motion.div>
            </motion.div>

            {/* User Info */}
            <motion.div 
              className="flex-1 min-w-0"
              variants={itemVariants}
            >
              {/* Greeting */}
              <p className="text-sm text-dark-400 mb-0.5">
                {greeting} 👋
              </p>
              
              {/* Display Name */}
              <h1 className="text-xl font-bold text-white truncate mb-1">
                {displayName}
              </h1>
              
              {/* Title & Clan */}
              <div className="flex items-center gap-2 flex-wrap">
                {title && (
                  <Badge variant="primary" size="sm" className="text-xs">
                    {title}
                  </Badge>
                )}
                {clan && (
                  <Badge 
                    variant="accent" 
                    size="sm" 
                    icon={<span>{clan.emblem}</span>}
                    className="text-xs"
                  >
                    {clan.name}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Desktop Stats - Hidden on mobile */}
            <motion.div 
              className="hidden md:flex items-center gap-2"
              variants={itemVariants}
            >
              <StatItem
                icon={<Flame className="w-4 h-4" />}
                value={stats.streakDays}
                label="Day Streak"
                color="text-orange-400"
                bgColor="bg-orange-500/10 border border-orange-500/20"
              />
            </motion.div>
          </div>

          {/* XP Progress Bar */}
          <motion.div 
            className="mt-4"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  Level {stats.level}
                </span>
                <span className="text-xs text-dark-400">
                  → Level {stats.level + 1}
                </span>
              </div>
              <span className="text-xs font-mono text-dark-400">
                {stats.currentXP.toLocaleString()} / {stats.requiredXP.toLocaleString()} XP
              </span>
            </div>
            <XPProgressBar
              currentXP={stats.currentXP}
              requiredXP={stats.requiredXP}
              level={stats.level}
              showLevelBadge={false}
              size="md"
            />
          </motion.div>

          {/* Bottom Stats Row */}
          <motion.div 
            className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1"
            variants={itemVariants}
          >
            {/* Coins */}
            <StatItem
              icon={<Coins className="w-4 h-4" />}
              value={stats.coins}
              color="text-gold-400"
              bgColor="bg-gold-500/10 border border-gold-500/20"
              onClick={onCoinsClick}
            />

            {/* Gems */}
            <StatItem
              icon={<Gem className="w-4 h-4" />}
              value={stats.gems}
              color="text-cyan-400"
              bgColor="bg-cyan-500/10 border border-cyan-500/20"
            />

            {/* Streak - Mobile only */}
            <div className="md:hidden">
              <StatItem
                icon={<Flame className="w-4 h-4" />}
                value={stats.streakDays}
                color="text-orange-400"
                bgColor="bg-orange-500/10 border border-orange-500/20"
              />
            </div>

            {/* Rank */}
            <RankBadge
              rank={stats.rank}
              position={stats.rankPosition}
              onClick={onRankClick}
            />
          </motion.div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

export default UserStatsHeader;