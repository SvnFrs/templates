import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/utils';

// ============================================
// Badge Component
// Display badges for achievements, notifications, and status indicators
// ============================================

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'accent' 
  | 'gold' 
  | 'xp' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rarity?: BadgeRarity;
  icon?: ReactNode;
  dot?: boolean;
  dotPulse?: boolean;
  outlined?: boolean;
  rounded?: boolean;
  animated?: boolean;
  glow?: boolean;
  className?: string;
}

// Variant style configurations
const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-dark-700/80 text-dark-200 border-dark-600',
  primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
  accent: 'bg-accent-500/20 text-accent-300 border-accent-500/30',
  gold: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
  xp: 'bg-xp-500/20 text-xp-300 border-xp-500/30',
  success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  error: 'bg-red-500/20 text-red-300 border-red-500/30',
  info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

// Outlined variant styles
const outlinedStyles: Record<BadgeVariant, string> = {
  default: 'bg-transparent text-dark-300 border-dark-500',
  primary: 'bg-transparent text-primary-400 border-primary-500/50',
  accent: 'bg-transparent text-accent-400 border-accent-500/50',
  gold: 'bg-transparent text-gold-400 border-gold-500/50',
  xp: 'bg-transparent text-xp-400 border-xp-500/50',
  success: 'bg-transparent text-emerald-400 border-emerald-500/50',
  warning: 'bg-transparent text-amber-400 border-amber-500/50',
  error: 'bg-transparent text-red-400 border-red-500/50',
  info: 'bg-transparent text-blue-400 border-blue-500/50',
};

// Rarity style configurations with gradient backgrounds
const rarityStyles: Record<BadgeRarity, string> = {
  common: 'bg-dark-600/80 text-dark-200 border-dark-500',
  uncommon: 'bg-gradient-to-r from-xp-600/30 to-xp-500/30 text-xp-300 border-xp-500/40',
  rare: 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 text-blue-300 border-blue-500/40',
  epic: 'bg-gradient-to-r from-accent-600/30 to-purple-500/30 text-accent-300 border-accent-500/40',
  legendary: 'bg-gradient-to-r from-gold-600/30 to-orange-500/30 text-gold-300 border-gold-500/40',
};

// Rarity glow effects
const rarityGlows: Record<BadgeRarity, string> = {
  common: '',
  uncommon: 'shadow-[0_0_8px_rgba(16,185,129,0.3)]',
  rare: 'shadow-[0_0_10px_rgba(59,130,246,0.4)]',
  epic: 'shadow-[0_0_12px_rgba(168,85,247,0.5)]',
  legendary: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]',
};

// Size configurations
const sizeStyles: Record<BadgeSize, string> = {
  xs: 'h-4 px-1.5 text-[10px] gap-0.5',
  sm: 'h-5 px-2 text-xs gap-1',
  md: 'h-6 px-2.5 text-xs gap-1.5',
  lg: 'h-7 px-3 text-sm gap-2',
};

// Dot size configurations
const dotSizes: Record<BadgeSize, string> = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

// Dot color configurations
const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-dark-400',
  primary: 'bg-primary-400',
  accent: 'bg-accent-400',
  gold: 'bg-gold-400',
  xp: 'bg-xp-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  error: 'bg-red-400',
  info: 'bg-blue-400',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rarity,
  icon,
  dot = false,
  dotPulse = false,
  outlined = false,
  rounded = true,
  animated = true,
  glow = false,
  className,
}: BadgeProps) {
  const badgeClasses = cn(
    // Base styles
    'inline-flex items-center justify-center',
    'font-semibold',
    'border',
    'transition-all duration-200',
    
    // Size styles
    sizeStyles[size],
    
    // Rounded or not
    rounded ? 'rounded-full' : 'rounded-md',
    
    // Variant or rarity styles
    rarity 
      ? rarityStyles[rarity] 
      : outlined 
        ? outlinedStyles[variant] 
        : variantStyles[variant],
    
    // Glow effect
    glow && rarity && rarityGlows[rarity],
    
    // Custom classes
    className
  );

  const content = (
    <>
      {/* Status dot */}
      {dot && (
        <span className="relative flex-shrink-0">
          <span className={cn('rounded-full', dotSizes[size], dotColors[variant])} />
          {dotPulse && (
            <span 
              className={cn(
                'absolute inset-0 rounded-full animate-ping opacity-75',
                dotColors[variant]
              )} 
            />
          )}
        </span>
      )}
      
      {/* Icon */}
      {icon && (
        <span className="flex-shrink-0 [&>svg]:w-3 [&>svg]:h-3">
          {icon}
        </span>
      )}
      
      {/* Text content */}
      <span className="truncate">{children}</span>
    </>
  );

  if (animated) {
    return (
      <motion.span
        className={badgeClasses}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        whileHover={{ scale: 1.05 }}
      >
        {content}
      </motion.span>
    );
  }

  return <span className={badgeClasses}>{content}</span>;
}

// ============================================
// NotificationBadge - Floating notification count badge
// ============================================

export interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  showZero?: boolean;
  variant?: 'primary' | 'accent' | 'gold' | 'error';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
  children?: ReactNode;
}

const notificationVariants: Record<string, string> = {
  primary: 'bg-primary-500 text-white',
  accent: 'bg-accent-500 text-white',
  gold: 'bg-gold-500 text-dark-900',
  error: 'bg-red-500 text-white',
};

const notificationSizes: Record<string, string> = {
  sm: 'min-w-4 h-4 text-[10px] px-1',
  md: 'min-w-5 h-5 text-xs px-1.5',
  lg: 'min-w-6 h-6 text-sm px-2',
};

export function NotificationBadge({
  count,
  maxCount = 99,
  showZero = false,
  variant = 'error',
  size = 'md',
  pulse = false,
  className,
  children,
}: NotificationBadgeProps) {
  const displayCount = count > maxCount ? `${maxCount}+` : count;
  const shouldShow = count > 0 || showZero;

  if (!children) {
    // Standalone badge
    if (!shouldShow) return null;
    
    return (
      <motion.span
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-full font-bold',
          notificationVariants[variant],
          notificationSizes[size],
          className
        )}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {displayCount}
        {pulse && (
          <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-30" />
        )}
      </motion.span>
    );
  }

  // Badge with children (positioned)
  return (
    <span className={cn('relative inline-flex', className)}>
      {children}
      {shouldShow && (
        <motion.span
          className={cn(
            'absolute -top-1 -right-1',
            'inline-flex items-center justify-center',
            'rounded-full font-bold',
            notificationVariants[variant],
            notificationSizes[size]
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {displayCount}
          {pulse && (
            <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-30" />
          )}
        </motion.span>
      )}
    </span>
  );
}

// ============================================
// AchievementBadge - Special badge for achievements
// ============================================

export interface AchievementBadgeProps {
  name: string;
  icon: ReactNode;
  rarity: BadgeRarity;
  unlocked?: boolean;
  isNew?: boolean;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const achievementSizes: Record<string, { container: string; icon: string; name: string }> = {
  sm: { container: 'w-10 h-10', icon: 'w-5 h-5', name: 'text-[10px]' },
  md: { container: 'w-14 h-14', icon: 'w-7 h-7', name: 'text-xs' },
  lg: { container: 'w-20 h-20', icon: 'w-10 h-10', name: 'text-sm' },
};

const achievementRarityBg: Record<BadgeRarity, string> = {
  common: 'from-dark-600 to-dark-700',
  uncommon: 'from-xp-600 to-xp-700',
  rare: 'from-blue-600 to-cyan-600',
  epic: 'from-accent-600 to-purple-600',
  legendary: 'from-gold-500 to-orange-500',
};

export function AchievementBadge({
  name,
  icon,
  rarity,
  unlocked = true,
  isNew = false,
  showName = true,
  size = 'md',
  onClick,
  className,
}: AchievementBadgeProps) {
  const config = achievementSizes[size];

  return (
    <motion.button
      className={cn(
        'relative flex flex-col items-center gap-1',
        onClick && 'cursor-pointer',
        !onClick && 'cursor-default',
        className
      )}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
    >
      {/* Badge icon container */}
      <div
        className={cn(
          'relative flex items-center justify-center',
          'rounded-xl',
          config.container,
          unlocked 
            ? cn('bg-gradient-to-br', achievementRarityBg[rarity])
            : 'bg-dark-800',
          unlocked && rarityGlows[rarity],
          !unlocked && 'opacity-40 grayscale',
          'border border-white/10',
          'transition-all duration-300'
        )}
      >
        <span className={cn(config.icon, unlocked ? 'text-white' : 'text-dark-500')}>
          {icon}
        </span>
        
        {/* Shine effect */}
        {unlocked && (
          <div 
            className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
          />
        )}
      </div>

      {/* New indicator */}
      {isNew && unlocked && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-dark-900"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-50" />
        </motion.div>
      )}

      {/* Badge name */}
      {showName && (
        <span 
          className={cn(
            'font-medium text-center max-w-full truncate',
            config.name,
            unlocked ? 'text-dark-200' : 'text-dark-500'
          )}
        >
          {name}
        </span>
      )}
    </motion.button>
  );
}

export default Badge;