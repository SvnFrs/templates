import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@shared/utils';

// ============================================
// Button Component
// Game-styled button with multiple variants and effects
// ============================================

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'gold' 
  | 'ghost' 
  | 'outline' 
  | 'danger'
  | 'success';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
  className?: string;
}

// Variant style configurations
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-primary-600 to-primary-500
    hover:from-primary-500 hover:to-primary-400
    active:from-primary-700 active:to-primary-600
    text-white
    border border-primary-400/30
    shadow-lg shadow-primary-500/25
    hover:shadow-xl hover:shadow-primary-500/30
  `,
  secondary: `
    bg-dark-800/80
    hover:bg-dark-700/80
    active:bg-dark-800
    text-dark-100
    border border-white/10
    hover:border-white/20
  `,
  accent: `
    bg-gradient-to-r from-accent-600 to-accent-500
    hover:from-accent-500 hover:to-accent-400
    active:from-accent-700 active:to-accent-600
    text-white
    border border-accent-400/30
    shadow-lg shadow-accent-500/25
    hover:shadow-xl hover:shadow-accent-500/30
  `,
  gold: `
    bg-gradient-to-r from-gold-600 to-gold-500
    hover:from-gold-500 hover:to-gold-400
    active:from-gold-700 active:to-gold-600
    text-dark-900
    border border-gold-400/30
    shadow-lg shadow-gold-500/25
    hover:shadow-xl hover:shadow-gold-500/30
  `,
  ghost: `
    bg-transparent
    hover:bg-white/5
    active:bg-white/10
    text-dark-200
    hover:text-white
  `,
  outline: `
    bg-transparent
    hover:bg-primary-500/10
    active:bg-primary-500/20
    text-primary-400
    border-2 border-primary-500/50
    hover:border-primary-400
  `,
  danger: `
    bg-gradient-to-r from-red-600 to-red-500
    hover:from-red-500 hover:to-red-400
    active:from-red-700 active:to-red-600
    text-white
    border border-red-400/30
    shadow-lg shadow-red-500/25
  `,
  success: `
    bg-gradient-to-r from-xp-600 to-xp-500
    hover:from-xp-500 hover:to-xp-400
    active:from-xp-700 active:to-xp-600
    text-white
    border border-xp-400/30
    shadow-lg shadow-xp-500/25
  `,
};

// Size configurations
const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1 rounded-md',
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
  xl: 'h-14 px-8 text-lg gap-3 rounded-xl',
};

// Icon size configurations
const iconSizes: Record<ButtonSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

// Glow effect configurations
const glowStyles: Record<ButtonVariant, string> = {
  primary: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]',
  secondary: '',
  accent: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]',
  gold: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]',
  ghost: '',
  outline: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]',
  danger: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
  success: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText,
      isDisabled = false,
      isFullWidth = false,
      animated = true,
      glowEffect = true,
      className,
      type = 'button',
      ...motionProps
    },
    ref
  ) => {
    const disabled = isDisabled || isLoading;

    const buttonClasses = cn(
      // Base styles
      'relative inline-flex items-center justify-center',
      'font-semibold',
      'transition-all duration-200 ease-out',
      'select-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900',
      
      // Variant styles
      variantStyles[variant],
      
      // Size styles
      sizeStyles[size],
      
      // Glow effect
      glowEffect && !disabled && glowStyles[variant],
      
      // Full width
      isFullWidth && 'w-full',
      
      // Disabled state
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      
      // Custom classes
      className
    );

    const content = (
      <>
        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className={cn('animate-spin', iconSizes[size])} />
        )}
        
        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className={cn('flex-shrink-0', iconSizes[size])}>
            {leftIcon}
          </span>
        )}
        
        {/* Button text */}
        <span className="truncate">
          {isLoading && loadingText ? loadingText : children}
        </span>
        
        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className={cn('flex-shrink-0', iconSizes[size])}>
            {rightIcon}
          </span>
        )}
        
        {/* Shine overlay */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
        </div>
      </>
    );

    if (!animated) {
      return (
        <button
          ref={ref}
          type={type}
          disabled={disabled}
          className={buttonClasses}
          {...(motionProps as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        className={buttonClasses}
        whileHover={!disabled ? { scale: 1.02, y: -1 } : undefined}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// ============================================
// IconButton - Square button for icons only
// ============================================

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
  icon: ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    const sizeClasses: Record<ButtonSize, string> = {
      xs: 'w-7 h-7 p-0',
      sm: 'w-8 h-8 p-0',
      md: 'w-10 h-10 p-0',
      lg: 'w-12 h-12 p-0',
      xl: 'w-14 h-14 p-0',
    };

    return (
      <Button
        ref={ref}
        size={size}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        <span className={iconSizes[size]}>{icon}</span>
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

// ============================================
// ButtonGroup - Group buttons together
// ============================================

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  attached?: boolean;
}

export function ButtonGroup({ children, className, attached = false }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        attached ? '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px' : 'gap-2',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Button;