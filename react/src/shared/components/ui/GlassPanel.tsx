import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { cn } from '@shared/utils';

// ============================================
// GlassPanel Component
// A reusable glassmorphism panel with game-style effects
// ============================================

export type GlassPanelVariant = 
  | 'default' 
  | 'elevated' 
  | 'bordered' 
  | 'glow' 
  | 'neon' 
  | 'cyber';

export type GlassPanelSize = 'sm' | 'md' | 'lg' | 'xl';

export type GlowColor = 'primary' | 'accent' | 'gold' | 'xp' | 'none';

export interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: GlassPanelVariant;
  size?: GlassPanelSize;
  glowColor?: GlowColor;
  hoverEffect?: boolean;
  clickEffect?: boolean;
  animated?: boolean;
  animationDelay?: number;
  borderGradient?: boolean;
  className?: string;
  contentClassName?: string;
  as?: 'div' | 'article' | 'section' | 'aside';
}

// Animation variants for entry effects
const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Style mappings for variants
const variantStyles: Record<GlassPanelVariant, string> = {
  default: `
    bg-dark-900/60 
    backdrop-blur-xl 
    border border-white/[0.08]
  `,
  elevated: `
    bg-dark-800/70 
    backdrop-blur-xl 
    border border-white/[0.1]
    shadow-xl shadow-black/20
  `,
  bordered: `
    bg-dark-900/50 
    backdrop-blur-xl 
    border-2 border-primary-500/30
  `,
  glow: `
    bg-dark-900/60 
    backdrop-blur-xl 
    border border-primary-500/40
    shadow-lg shadow-primary-500/20
  `,
  neon: `
    bg-dark-950/80 
    backdrop-blur-xl 
    border border-accent-500/50
    shadow-[0_0_30px_rgba(168,85,247,0.3)]
  `,
  cyber: `
    bg-gradient-to-br from-dark-900/80 to-dark-950/90
    backdrop-blur-xl 
    border border-primary-400/30
    [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%-12px))]
  `,
};

// Size mappings for padding
const sizeStyles: Record<GlassPanelSize, string> = {
  sm: 'p-3 rounded-lg',
  md: 'p-4 rounded-xl',
  lg: 'p-5 rounded-xl',
  xl: 'p-6 rounded-2xl',
};

// Glow color mappings
const glowStyles: Record<GlowColor, string> = {
  primary: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]',
  accent: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
  gold: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]',
  xp: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]',
  none: '',
};

// Corner decorations for cyber variant
function CyberCorners() {
  return (
    <>
      {/* Top-right corner accent */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary-400/60" />
      {/* Bottom-left corner accent */}
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary-400/60" />
    </>
  );
}

// Animated border gradient overlay
function GradientBorder() {
  return (
    <div 
      className="absolute inset-0 rounded-[inherit] pointer-events-none"
      style={{
        padding: '1px',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(99,102,241,0.5))',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 4s ease infinite',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
    />
  );
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      glowColor = 'primary',
      hoverEffect = true,
      clickEffect = true,
      animated = true,
      animationDelay = 0,
      borderGradient = false,
      className,
      contentClassName,
      as = 'div',
      ...motionProps
    },
    ref
  ) => {
    // Combine all styles
    const panelClasses = cn(
      // Base styles
      'relative overflow-hidden',
      'transition-all duration-300 ease-out',
      
      // Variant styles
      variantStyles[variant],
      
      // Size styles
      sizeStyles[size],
      
      // Hover effects
      hoverEffect && [
        'hover:border-white/20',
        'hover:bg-dark-800/70',
        glowStyles[glowColor],
      ],
      
      // Click effect
      clickEffect && 'active:scale-[0.98] active:opacity-90',
      
      // Custom classes
      className
    );

    const content = (
      <>
        {/* Gradient border overlay */}
        {borderGradient && <GradientBorder />}
        
        {/* Cyber corner decorations */}
        {variant === 'cyber' && <CyberCorners />}
        
        {/* Subtle inner glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(99,102,241,0.1) 0%, transparent 70%)',
          }}
        />
        
        {/* Content wrapper */}
        <div className={cn('relative z-10', contentClassName)}>
          {children}
        </div>
      </>
    );

    if (!animated) {
      // Return non-animated version
      const Component = as;
      return (
        <Component
          ref={ref as never}
          className={cn(panelClasses, 'group')}
          {...(motionProps as HTMLAttributes<HTMLDivElement>)}
        >
          {content}
        </Component>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(panelClasses, 'group')}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        custom={animationDelay}
        whileHover={hoverEffect ? { y: -2 } : undefined}
        whileTap={clickEffect ? { scale: 0.98 } : undefined}
        {...motionProps}
      >
        {content}
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

// ============================================
// GlassPanelHeader - Subcomponent for panel headers
// ============================================

export interface GlassPanelHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function GlassPanelHeader({
  title,
  subtitle,
  icon,
  action,
  className,
}: GlassPanelHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && (
            <p className="text-sm text-dark-400">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ============================================
// GlassPanelFooter - Subcomponent for panel footers
// ============================================

export interface GlassPanelFooterProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}

export function GlassPanelFooter({
  children,
  className,
  bordered = true,
}: GlassPanelFooterProps) {
  return (
    <div 
      className={cn(
        'mt-4 pt-4',
        bordered && 'border-t border-white/10',
        className
      )}
    >
      {children}
    </div>
  );
}

// Export all parts
export default GlassPanel;