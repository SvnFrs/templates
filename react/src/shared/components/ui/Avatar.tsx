import { motion } from 'framer-motion';
import { cn } from '@shared/utils';

// ============================================
// Avatar Component
// User avatar with level ring, status indicator, and frame effects
// ============================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';
export type AvatarFrame = 'none' | 'default' | 'gold' | 'diamond' | 'legendary';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  frame?: AvatarFrame;
  level?: number;
  showLevel?: boolean;
  showLevelRing?: boolean;
  levelProgress?: number; // 0-100 for the ring progress
  bordered?: boolean;
  animated?: boolean;
  onClick?: () => void;
  className?: string;
}

// Size configurations
const sizeConfig: Record<AvatarSize, {
  container: string;
  image: string;
  status: string;
  level: string;
  levelText: string;
  ringWidth: number;
}> = {
  xs: {
    container: 'w-6 h-6',
    image: 'w-6 h-6',
    status: 'w-2 h-2 border',
    level: 'w-4 h-4 -bottom-0.5 -right-0.5',
    levelText: 'text-[8px]',
    ringWidth: 2,
  },
  sm: {
    container: 'w-8 h-8',
    image: 'w-8 h-8',
    status: 'w-2.5 h-2.5 border-[1.5px]',
    level: 'w-5 h-5 -bottom-0.5 -right-0.5',
    levelText: 'text-[9px]',
    ringWidth: 2,
  },
  md: {
    container: 'w-10 h-10',
    image: 'w-10 h-10',
    status: 'w-3 h-3 border-2',
    level: 'w-6 h-6 -bottom-1 -right-1',
    levelText: 'text-[10px]',
    ringWidth: 3,
  },
  lg: {
    container: 'w-14 h-14',
    image: 'w-14 h-14',
    status: 'w-3.5 h-3.5 border-2',
    level: 'w-7 h-7 -bottom-1 -right-1',
    levelText: 'text-xs',
    ringWidth: 3,
  },
  xl: {
    container: 'w-20 h-20',
    image: 'w-20 h-20',
    status: 'w-4 h-4 border-2',
    level: 'w-8 h-8 -bottom-1 -right-1',
    levelText: 'text-sm',
    ringWidth: 4,
  },
  '2xl': {
    container: 'w-28 h-28',
    image: 'w-28 h-28',
    status: 'w-5 h-5 border-[3px]',
    level: 'w-10 h-10 -bottom-1.5 -right-1.5',
    levelText: 'text-base',
    ringWidth: 5,
  },
};

// Status color configurations
const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-xp-500',
  offline: 'bg-dark-500',
  away: 'bg-gold-500',
  busy: 'bg-red-500',
  none: '',
};

// Frame style configurations
const frameStyles: Record<AvatarFrame, string> = {
  none: '',
  default: 'ring-2 ring-primary-500/50',
  gold: 'ring-2 ring-gold-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]',
  diamond: 'ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]',
  legendary: 'ring-2 ring-accent-500 shadow-[0_0_16px_rgba(168,85,247,0.5)]',
};

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Generate a consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    'from-primary-500 to-primary-700',
    'from-accent-500 to-accent-700',
    'from-gold-500 to-gold-700',
    'from-xp-500 to-xp-700',
    'from-cyan-500 to-cyan-700',
    'from-pink-500 to-pink-700',
    'from-orange-500 to-orange-700',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

// SVG Ring Progress Component
interface RingProgressProps {
  progress: number;
  size: number;
  strokeWidth: number;
  className?: string;
}

function RingProgress({ progress, size, strokeWidth, className }: RingProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={cn('absolute inset-0 -rotate-90', className)}
      width={size}
      height={size}
    >
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-dark-700/50"
      />
      {/* Progress ring */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#avatarGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(16, 185, 129)" />
          <stop offset="100%" stopColor="rgb(52, 211, 153)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Avatar({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  status = 'none',
  frame = 'none',
  level,
  showLevel = false,
  showLevelRing = false,
  levelProgress = 0,
  bordered = true,
  animated = true,
  onClick,
  className,
}: AvatarProps) {
  const config = sizeConfig[size];
  const hasImage = !!src;
  const displayName = name || alt;
  const initials = getInitials(displayName);
  const avatarColor = getAvatarColor(displayName);

  // Calculate ring size based on container
  const containerSizeNum = parseInt(config.container.match(/w-(\d+)/)?.[1] || '10') * 4;
  const ringSize = containerSizeNum + config.ringWidth * 2 + 4;

  const avatarContent = (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Level Progress Ring */}
      {showLevelRing && levelProgress !== undefined && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: ringSize,
            height: ringSize,
            margin: -(config.ringWidth + 2),
          }}
        >
          <RingProgress
            progress={levelProgress}
            size={ringSize}
            strokeWidth={config.ringWidth}
          />
        </div>
      )}

      {/* Avatar Container */}
      <div
        className={cn(
          'relative rounded-full overflow-hidden',
          config.container,
          bordered && 'border-2 border-dark-700',
          frameStyles[frame],
          onClick && 'transition-transform hover:scale-105 active:scale-95'
        )}
      >
        {hasImage ? (
          <img
            src={src}
            alt={alt}
            className={cn(
              'object-cover',
              config.image
            )}
          />
        ) : (
          <div
            className={cn(
              'flex items-center justify-center w-full h-full',
              'bg-gradient-to-br',
              avatarColor
            )}
          >
            <span
              className={cn(
                'font-bold text-white',
                size === 'xs' && 'text-[8px]',
                size === 'sm' && 'text-[10px]',
                size === 'md' && 'text-xs',
                size === 'lg' && 'text-sm',
                size === 'xl' && 'text-lg',
                size === '2xl' && 'text-xl'
              )}
            >
              {initials}
            </span>
          </div>
        )}

        {/* Shine overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Status Indicator */}
      {status !== 'none' && (
        <motion.div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-dark-900',
            config.status,
            statusColors[status]
          )}
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
        />
      )}

      {/* Level Badge */}
      {showLevel && level !== undefined && (
        <motion.div
          className={cn(
            'absolute flex items-center justify-center rounded-full',
            'bg-gradient-to-br from-gold-400 to-gold-600',
            'border-2 border-gold-300/50',
            'shadow-lg shadow-gold-500/30',
            config.level
          )}
          initial={animated ? { scale: 0, rotate: -180 } : undefined}
          animate={animated ? { scale: 1, rotate: 0 } : undefined}
          transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
        >
          <span className={cn('font-bold text-dark-900', config.levelText)}>
            {level}
          </span>
        </motion.div>
      )}
    </div>
  );

  if (animated && onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex"
      >
        {avatarContent}
      </motion.div>
    );
  }

  return avatarContent;
}

// ============================================
// AvatarGroup - Display multiple avatars stacked
// ============================================

export interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    name: string;
    status?: AvatarStatus;
  }>;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = 'sm',
  className,
}: AvatarGroupProps) {
  const displayedAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {displayedAvatars.map((avatar, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
          style={{ zIndex: displayedAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            name={avatar.name}
            status={avatar.status}
            size={size}
            bordered
            animated={false}
          />
        </motion.div>
      ))}
      
      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: displayedAvatars.length * 0.1 }}
          className={cn(
            'relative flex items-center justify-center rounded-full',
            'bg-dark-700 border-2 border-dark-900',
            sizeConfig[size].container
          )}
        >
          <span className={cn('font-semibold text-dark-300', sizeConfig[size].levelText)}>
            +{remainingCount}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default Avatar;