import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { cn } from '@shared/utils';

// ============================================
// ProgressBar Component
// Animated progress bar with XP/Game styling
// ============================================

export type ProgressBarVariant = 'default' | 'xp' | 'quest' | 'health' | 'mana';
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number;
  maxValue: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  showValue?: boolean;
  label?: string;
  animated?: boolean;
  animationDuration?: number;
  glowEffect?: boolean;
  striped?: boolean;
  className?: string;
}

// Gradient configurations for each variant
const variantGradients: Record<ProgressBarVariant, string> = {
  default: 'from-primary-500 via-primary-400 to-primary-500',
  xp: 'from-xp-500 via-xp-400 to-emerald-400',
  quest: 'from-accent-500 via-purple-400 to-accent-500',
  health: 'from-red-500 via-red-400 to-orange-400',
  mana: 'from-blue-500 via-cyan-400 to-blue-400',
};

// Glow colors for each variant
const variantGlows: Record<ProgressBarVariant, string> = {
  default: 'shadow-[0_0_12px_rgba(99,102,241,0.6)]',
  xp: 'shadow-[0_0_12px_rgba(16,185,129,0.6)]',
  quest: 'shadow-[0_0_12px_rgba(168,85,247,0.6)]',
  health: 'shadow-[0_0_12px_rgba(239,68,68,0.6)]',
  mana: 'shadow-[0_0_12px_rgba(59,130,246,0.6)]',
};

// Background colors for the track
const trackColors: Record<ProgressBarVariant, string> = {
  default: 'bg-dark-800/80',
  xp: 'bg-dark-800/80',
  quest: 'bg-dark-800/80',
  health: 'bg-dark-800/80',
  mana: 'bg-dark-800/80',
};

// Size configurations
const sizeConfig: Record<ProgressBarSize, { height: string; fontSize: string; borderRadius: string }> = {
  xs: { height: 'h-1.5', fontSize: 'text-[10px]', borderRadius: 'rounded-full' },
  sm: { height: 'h-2', fontSize: 'text-xs', borderRadius: 'rounded-full' },
  md: { height: 'h-3', fontSize: 'text-xs', borderRadius: 'rounded-full' },
  lg: { height: 'h-4', fontSize: 'text-sm', borderRadius: 'rounded-lg' },
};

export function ProgressBar({
  value,
  maxValue,
  variant = 'default',
  size = 'md',
  showLabel = false,
  showValue = false,
  label,
  animated = true,
  animationDuration = 0.8,
  glowEffect = true,
  striped = false,
  className,
}: ProgressBarProps) {
  // Calculate percentage
  const percentage = useMemo(() => {
    const calculated = Math.min(Math.max((value / maxValue) * 100, 0), 100);
    return Number.isNaN(calculated) ? 0 : calculated;
  }, [value, maxValue]);

  // Animated spring value
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: animationDuration * 1000,
  });

  // Transform to percentage string
  const animatedWidth = useTransform(springValue, (v) => `${v}%`);

  // Update spring when percentage changes
  useEffect(() => {
    if (animated) {
      springValue.set(percentage);
    }
  }, [percentage, animated, springValue]);

  const config = sizeConfig[size];

  return (
    <div className={cn('w-full', className)}>
      {/* Label and Value Row */}
      {(showLabel || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {showLabel && label && (
            <span className={cn('font-medium text-dark-200', config.fontSize)}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn('font-mono font-semibold text-dark-300', config.fontSize)}>
              <motion.span
                key={value}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white"
              >
                {value.toLocaleString()}
              </motion.span>
              <span className="text-dark-500 mx-0.5">/</span>
              <span>{maxValue.toLocaleString()}</span>
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          config.height,
          config.borderRadius,
          trackColors[variant],
          'border border-white/5'
        )}
      >
        {/* Animated Fill */}
        <motion.div
          className={cn(
            'absolute inset-y-0 left-0',
            config.borderRadius,
            'bg-gradient-to-r',
            variantGradients[variant],
            glowEffect && percentage > 0 && variantGlows[variant],
            'transition-shadow duration-300'
          )}
          style={{
            width: animated ? animatedWidth : `${percentage}%`,
          }}
        >
          {/* Striped overlay */}
          {striped && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 8px,
                  rgba(255,255,255,0.2) 8px,
                  rgba(255,255,255,0.2) 16px
                )`,
                backgroundSize: '200% 100%',
                animation: 'stripes 1s linear infinite',
              }}
            />
          )}

          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
            }}
          />

          {/* Animated shimmer */}
          {animated && percentage > 0 && (
            <motion.div
              className="absolute inset-y-0 w-20 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              }}
              animate={{
                x: ['-100%', '400%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 1,
              }}
            />
          )}
        </motion.div>

        {/* Tick marks for larger sizes */}
        {size === 'lg' && (
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-px h-full bg-white/10"
                style={{ marginLeft: i === 0 ? 0 : 'auto' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Percentage indicator (optional, shown below bar) */}
      {showValue && size !== 'xs' && (
        <div className="flex justify-end mt-1">
          <motion.span
            key={percentage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              'font-mono font-bold',
              config.fontSize,
              percentage >= 100 ? 'text-xp-400' : 'text-dark-400'
            )}
          >
            {percentage.toFixed(0)}%
          </motion.span>
        </div>
      )}
    </div>
  );
}

// ============================================
// XPProgressBar - Specialized XP bar with level display
// ============================================

export interface XPProgressBarProps {
  currentXP: number;
  requiredXP: number;
  level: number;
  showLevelBadge?: boolean;
  size?: ProgressBarSize;
  className?: string;
}

export function XPProgressBar({
  currentXP,
  requiredXP,
  level,
  showLevelBadge = true,
  size = 'md',
  className,
}: XPProgressBarProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Level Badge */}
      {showLevelBadge && (
        <motion.div
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-500/30 border-2 border-gold-300/50">
            <span className="text-xs font-bold text-dark-900">{level}</span>
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border border-gold-300/30 animate-ping opacity-20" />
          </div>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className={cn(showLevelBadge && 'pl-10')}>
        <ProgressBar
          value={currentXP}
          maxValue={requiredXP}
          variant="xp"
          size={size}
          showValue
          animated
          glowEffect
        />
      </div>
    </div>
  );
}

// ============================================
// QuestProgressBar - Progress bar for quests
// ============================================

export interface QuestProgressBarProps {
  current: number;
  target: number;
  showSteps?: boolean;
  size?: ProgressBarSize;
  className?: string;
}

export function QuestProgressBar({
  current,
  target,
  showSteps = false,
  size = 'sm',
  className,
}: QuestProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      <ProgressBar
        value={current}
        maxValue={target}
        variant="quest"
        size={size}
        animated
        glowEffect
      />
      {showSteps && (
        <div className="flex justify-between mt-1">
          <span className="text-xs font-medium text-accent-400">
            {current}/{target}
          </span>
          <span className="text-xs text-dark-500">
            {current >= target ? 'Complete!' : `${target - current} remaining`}
          </span>
        </div>
      )}
    </div>
  );
}

// Add CSS for striped animation
const stripesKeyframes = `
@keyframes stripes {
  0% { background-position: 0 0; }
  100% { background-position: 32px 0; }
}
`;

// Inject keyframes if not already present
if (typeof document !== 'undefined') {
  const styleId = 'progress-bar-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = stripesKeyframes;
    document.head.appendChild(style);
  }
}

export default ProgressBar;