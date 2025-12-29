// ============================================
// Shared UI Components - Barrel Export
// Centralized exports for all reusable UI components
// ============================================

// Glass Panel
export { 
  GlassPanel, 
  GlassPanelHeader, 
  GlassPanelFooter,
  type GlassPanelProps,
  type GlassPanelHeaderProps,
  type GlassPanelFooterProps,
  type GlassPanelVariant,
  type GlassPanelSize,
  type GlowColor,
} from './GlassPanel';

// Progress Bar
export {
  ProgressBar,
  XPProgressBar,
  QuestProgressBar,
  type ProgressBarProps,
  type ProgressBarVariant,
  type ProgressBarSize,
  type XPProgressBarProps,
  type QuestProgressBarProps,
} from './ProgressBar';

// Avatar
export {
  Avatar,
  AvatarGroup,
  type AvatarProps,
  type AvatarGroupProps,
  type AvatarSize,
  type AvatarStatus,
  type AvatarFrame,
} from './Avatar';

// Button
export {
  Button,
  IconButton,
  ButtonGroup,
  type ButtonProps,
  type IconButtonProps,
  type ButtonGroupProps,
  type ButtonVariant,
  type ButtonSize,
} from './Button';

// Badge
export {
  Badge,
  NotificationBadge,
  AchievementBadge,
  type BadgeProps,
  type NotificationBadgeProps,
  type AchievementBadgeProps,
  type BadgeVariant,
  type BadgeSize,
  type BadgeRarity,
} from './Badge';