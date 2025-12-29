// ============================================
// QuickActionsGrid Component
// Grid of quick action cards with animations
// ============================================

import { motion } from 'framer-motion';
import {
  QrCode,
  Calendar,
  Scroll,
  Backpack,
  ShoppingBag,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@shared/utils';
import { GlassPanel, GlassPanelHeader } from '@shared/components/ui/GlassPanel';
import { Badge } from '@shared/components/ui/Badge';
import type { QuickAction } from '../types';

// ============================================
// Types
// ============================================

export interface QuickActionsGridProps {
  actions: QuickAction[];
  className?: string;
  onActionClick?: (action: QuickAction) => void;
}

// ============================================
// Icon Mapping
// ============================================

const iconMap: Record<string, LucideIcon> = {
  QrCode,
  Calendar,
  Scroll,
  Backpack,
  ShoppingBag,
  Trophy,
};

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

// ============================================
// Action Card Component
// ============================================

interface ActionCardProps {
  action: QuickAction;
  onClick?: () => void;
}

function ActionCard({ action, onClick }: ActionCardProps) {
  const IconComponent = iconMap[action.icon] || QrCode;
  
  return (
    <motion.button
      className={cn(
        'relative w-full h-full',
        'flex flex-col items-center justify-center',
        'p-4 rounded-xl',
        'bg-gradient-to-br',
        action.bgGradient,
        'border border-white/[0.08]',
        'backdrop-blur-sm',
        'transition-all duration-300',
        'hover:border-white/20',
        'hover:shadow-lg',
        'active:scale-95',
        'group',
        'overflow-hidden',
        action.isDisabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={!action.isDisabled ? onClick : undefined}
      variants={itemVariants}
      whileHover={!action.isDisabled ? { 
        y: -4,
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      } : undefined}
      whileTap={!action.isDisabled ? { scale: 0.95 } : undefined}
    >
      {/* Hover glow effect */}
      <div 
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100',
          'transition-opacity duration-500',
          'pointer-events-none'
        )}
        style={{
          background: `radial-gradient(circle at center, ${action.iconColor}20 0%, transparent 70%)`,
        }}
      />

      {/* New indicator */}
      {action.isNew && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, delay: 0.3 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
          </span>
        </motion.div>
      )}

      {/* Icon Container */}
      <motion.div
        className={cn(
          'relative flex items-center justify-center',
          'w-12 h-12 rounded-xl mb-3',
          'bg-dark-800/50',
          'border border-white/10',
          'transition-all duration-300',
          'group-hover:scale-110',
          'group-hover:border-white/20'
        )}
        style={{
          boxShadow: `0 0 20px ${action.iconColor}30`,
        }}
      >
        <IconComponent 
          className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
          style={{ color: action.iconColor }}
        />
        
        {/* Icon glow */}
        <div 
          className="absolute inset-0 rounded-xl opacity-50 blur-md -z-10"
          style={{ backgroundColor: action.iconColor }}
        />
      </motion.div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white mb-0.5 text-center">
        {action.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-dark-400 text-center line-clamp-1">
        {action.description}
      </p>

      {/* Badge */}
      {action.badge && (
        <motion.div 
          className="mt-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge 
            variant={action.badge.variant}
            size="xs"
            animated={false}
          >
            {action.badge.text}
          </Badge>
        </motion.div>
      )}

      {/* Bottom shine effect */}
      <div 
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px',
          'bg-gradient-to-r from-transparent via-white/20 to-transparent',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300'
        )}
      />
    </motion.button>
  );
}

// ============================================
// Main Component
// ============================================

export function QuickActionsGrid({
  actions,
  className,
  onActionClick,
}: QuickActionsGridProps) {
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
          title="Quick Actions"
          subtitle="Jump into action"
          icon={<QrCode className="w-5 h-5" />}
        />

        {/* Actions Grid */}
        <motion.div
          className={cn(
            'grid grid-cols-3 gap-3',
            'sm:grid-cols-3 md:grid-cols-6',
            'lg:grid-cols-3 xl:grid-cols-6'
          )}
          variants={containerVariants}
        >
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              onClick={() => onActionClick?.(action)}
            />
          ))}
        </motion.div>
      </GlassPanel>
    </motion.div>
  );
}

// ============================================
// Compact Quick Actions (Alternative Layout)
// ============================================

export interface CompactQuickActionsProps {
  actions: QuickAction[];
  className?: string;
  onActionClick?: (action: QuickAction) => void;
}

export function CompactQuickActions({
  actions,
  className,
  onActionClick,
}: CompactQuickActionsProps) {
  return (
    <motion.div
      className={cn(
        'flex gap-2 overflow-x-auto pb-2 -mx-4 px-4',
        'scrollbar-none',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {actions.slice(0, 4).map((action) => {
        const IconComponent = iconMap[action.icon] || QrCode;
        
        return (
          <motion.button
            key={action.id}
            className={cn(
              'flex-shrink-0',
              'flex items-center gap-2',
              'px-4 py-3 rounded-xl',
              'bg-gradient-to-r',
              action.bgGradient,
              'border border-white/[0.08]',
              'transition-all duration-200',
              'hover:border-white/20',
              'active:scale-95'
            )}
            onClick={() => onActionClick?.(action)}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-dark-800/50"
              style={{ color: action.iconColor }}
            >
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-white whitespace-nowrap">
              {action.title}
            </span>
            {action.badge && (
              <Badge variant={action.badge.variant} size="xs">
                {action.badge.text}
              </Badge>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export default QuickActionsGrid;