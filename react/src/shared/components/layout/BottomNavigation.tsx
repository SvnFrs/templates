// ============================================
// BottomNavigation Component
// Mobile-responsive bottom dock navigation
// ============================================

import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  Scroll,
  ShoppingBag,
  User,
  QrCode,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@shared/utils';

// ============================================
// Types
// ============================================

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
  isSpecial?: boolean;
}

export interface BottomNavigationProps {
  className?: string;
}

// ============================================
// Default Navigation Items
// ============================================

const defaultNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    href: '/',
  },
  {
    id: 'timetable',
    label: 'Schedule',
    icon: Calendar,
    href: '/timetable',
  },
  {
    id: 'checkin',
    label: 'Check In',
    icon: QrCode,
    href: '/attendance/scan',
    isSpecial: true,
  },
  {
    id: 'quests',
    label: 'Quests',
    icon: Scroll,
    href: '/quests',
    badge: 3,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    href: '/profile',
  },
];

// ============================================
// Animation Variants
// ============================================

const navItemVariants = {
  idle: { scale: 1 },
  active: { scale: 1 },
  tap: { scale: 0.9 },
};

const indicatorVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 30,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0,
    transition: { duration: 0.15 }
  },
};

const badgeVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 25,
    }
  },
};

// ============================================
// Nav Item Component
// ============================================

interface NavItemButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

function NavItemButton({ item, isActive, onClick }: NavItemButtonProps) {
  const Icon = item.icon;

  if (item.isSpecial) {
    // Special center button (Check-in)
    return (
      <motion.button
        className="relative flex flex-col items-center justify-center -mt-6"
        onClick={onClick}
        variants={navItemVariants}
        initial="idle"
        whileTap="tap"
      >
        {/* Outer glow ring */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r from-primary-500 to-accent-500',
            'blur-lg opacity-50'
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ width: 56, height: 56, top: 4, left: '50%', marginLeft: -28 }}
        />
        
        {/* Main button */}
        <div
          className={cn(
            'relative flex items-center justify-center',
            'w-14 h-14 rounded-full',
            'bg-gradient-to-br from-primary-500 to-accent-600',
            'border-4 border-dark-900',
            'shadow-lg shadow-primary-500/30',
            'transition-transform duration-200',
            'hover:scale-105 active:scale-95'
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Label */}
        <span className={cn(
          'mt-1 text-[10px] font-medium',
          isActive ? 'text-primary-400' : 'text-dark-400'
        )}>
          {item.label}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      className={cn(
        'relative flex flex-col items-center justify-center',
        'flex-1 py-2 px-1',
        'transition-colors duration-200'
      )}
      onClick={onClick}
      variants={navItemVariants}
      initial="idle"
      whileTap="tap"
    >
      {/* Active indicator background */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={cn(
              'absolute top-1 left-1/2 -translate-x-1/2',
              'w-12 h-12 rounded-xl',
              'bg-primary-500/15'
            )}
            variants={indicatorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {/* Icon container */}
      <div className="relative">
        <Icon 
          className={cn(
            'w-6 h-6 transition-colors duration-200',
            isActive ? 'text-primary-400' : 'text-dark-400'
          )}
        />
        
        {/* Badge */}
        {item.badge && item.badge > 0 && (
          <motion.div
            className={cn(
              'absolute -top-1.5 -right-1.5',
              'flex items-center justify-center',
              'min-w-[16px] h-4 px-1 rounded-full',
              'bg-red-500 text-white',
              'text-[10px] font-bold'
            )}
            variants={badgeVariants}
            initial="initial"
            animate="animate"
          >
            {item.badge > 9 ? '9+' : item.badge}
          </motion.div>
        )}
      </div>

      {/* Label */}
      <span className={cn(
        'mt-1 text-[10px] font-medium',
        'transition-colors duration-200',
        isActive ? 'text-primary-400' : 'text-dark-400'
      )}>
        {item.label}
      </span>

      {/* Active dot indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={cn(
              'absolute bottom-0.5 left-1/2 -translate-x-1/2',
              'w-1 h-1 rounded-full',
              'bg-primary-400'
            )}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// Main Component
// ============================================

export function BottomNavigation({ className }: BottomNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (item: NavItem) => {
    navigate(item.href);
  };

  return (
    <>
      {/* Spacer to prevent content from being hidden behind nav */}
      <div className="h-20 md:hidden" />
      
      {/* Navigation Bar */}
      <motion.nav
        className={cn(
          // Positioning
          'fixed bottom-0 left-0 right-0 z-50',
          // Only show on mobile
          'md:hidden',
          // Container styling
          'px-2 pb-safe',
          className
        )}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Glass background */}
        <div
          className={cn(
            'relative',
            'mx-2 mb-2 px-2',
            'rounded-2xl',
            'bg-dark-900/90',
            'backdrop-blur-xl',
            'border border-white/[0.08]',
            'shadow-xl shadow-black/20'
          )}
        >
          {/* Top gradient line */}
          <div 
            className={cn(
              'absolute top-0 left-4 right-4 h-px',
              'bg-gradient-to-r from-transparent via-primary-500/50 to-transparent'
            )}
          />

          {/* Navigation Items */}
          <div className="flex items-end justify-around">
            {defaultNavItems.map((item) => (
              <NavItemButton
                key={item.id}
                item={item}
                isActive={isActive(item.href)}
                onClick={() => handleNavClick(item)}
              />
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}

// ============================================
// Desktop Side Rail Navigation (Alternative)
// ============================================

export interface SideRailNavigationProps {
  className?: string;
}

export function SideRailNavigation({ className }: SideRailNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (item: NavItem) => {
    navigate(item.href);
  };

  return (
    <motion.nav
      className={cn(
        // Positioning
        'fixed left-0 top-0 bottom-0 z-40',
        // Only show on desktop
        'hidden md:flex',
        // Container styling
        'w-20 flex-col items-center',
        'py-6',
        'bg-dark-900/80',
        'backdrop-blur-xl',
        'border-r border-white/[0.06]',
        className
      )}
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <motion.div
        className={cn(
          'flex items-center justify-center',
          'w-12 h-12 mb-8 rounded-xl',
          'bg-gradient-to-br from-primary-500 to-accent-600',
          'shadow-lg shadow-primary-500/30'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-xl font-bold text-white">E</span>
      </motion.div>

      {/* Navigation Items */}
      <div className="flex flex-col items-center gap-2 flex-1">
        {defaultNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <motion.button
              key={item.id}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'w-14 h-14 rounded-xl',
                'transition-all duration-200',
                active 
                  ? 'bg-primary-500/15 text-primary-400' 
                  : 'text-dark-400 hover:text-dark-200 hover:bg-white/5'
              )}
              onClick={() => handleNavClick(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              <span className="mt-1 text-[10px] font-medium">
                {item.label}
              </span>

              {/* Badge */}
              {item.badge && item.badge > 0 && (
                <motion.div
                  className={cn(
                    'absolute top-1 right-1',
                    'flex items-center justify-center',
                    'min-w-[16px] h-4 px-1 rounded-full',
                    'bg-red-500 text-white',
                    'text-[10px] font-bold'
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {item.badge > 9 ? '9+' : item.badge}
                </motion.div>
              )}

              {/* Active indicator */}
              {active && (
                <motion.div
                  className={cn(
                    'absolute left-0 top-1/2 -translate-y-1/2',
                    'w-1 h-8 rounded-r-full',
                    'bg-primary-500'
                  )}
                  layoutId="sideNavIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Settings button at bottom */}
      <motion.button
        className={cn(
          'flex items-center justify-center',
          'w-10 h-10 rounded-lg',
          'text-dark-400 hover:text-dark-200',
          'hover:bg-white/5',
          'transition-colors duration-200'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingBag className="w-5 h-5" />
      </motion.button>
    </motion.nav>
  );
}

export default BottomNavigation;