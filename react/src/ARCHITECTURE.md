# 🎮 EvoMate - Gamified University Platform

## Architecture Documentation

> A comprehensive guide to the project structure, patterns, and conventions used in this application.

---

## 📁 Project Structure

```
src/
├── app/                          # Application-level setup
│   ├── providers/                # React context providers (QueryClient, Theme, etc.)
│   │   └── index.tsx             # Centralized provider composition
│   └── router/                   # React Router configuration
│       └── index.tsx             # Route definitions and layouts
│
├── features/                     # Feature-based modules (Screaming Architecture)
│   ├── dashboard/                # Dashboard feature
│   │   ├── api/                  # API services & mock data
│   │   │   └── mockData.ts       # Development mock data
│   │   ├── components/           # Feature-specific components
│   │   │   ├── UserStatsHeader.tsx
│   │   │   ├── QuickActionsGrid.tsx
│   │   │   └── ActiveQuestsList.tsx
│   │   ├── hooks/                # Feature-specific hooks
│   │   ├── pages/                # Page components
│   │   │   └── DashboardPage.tsx
│   │   ├── stores/               # Zustand stores
│   │   │   └── dashboardStore.ts
│   │   ├── types/                # TypeScript interfaces
│   │   │   └── index.ts
│   │   └── index.ts              # Barrel export
│   │
│   ├── auth/                     # Authentication (to be implemented)
│   ├── quests/                   # Quest system (to be implemented)
│   ├── inventory/                # Items & shop (to be implemented)
│   └── profile/                  # User profile (to be implemented)
│
├── shared/                       # Shared/Reusable code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Base UI primitives
│   │   │   ├── Avatar.tsx        # User avatars with level ring
│   │   │   ├── Badge.tsx         # Status & achievement badges
│   │   │   ├── Button.tsx        # Game-styled buttons
│   │   │   ├── GlassPanel.tsx    # Glassmorphism container
│   │   │   ├── ProgressBar.tsx   # XP & quest progress bars
│   │   │   └── index.ts          # Barrel export
│   │   ├── layout/               # Layout components
│   │   │   ├── BottomNavigation.tsx  # Mobile navigation
│   │   │   └── index.ts
│   │   └── feedback/             # Toast, Modal, etc. (to be implemented)
│   │
│   ├── hooks/                    # Shared custom hooks
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                 # Class name merger (clsx + tailwind-merge)
│   │   └── index.ts
│   ├── types/                    # Global TypeScript types
│   │   └── index.ts              # User, Quest, Stats interfaces
│   └── constants/                # App constants
│
├── assets/                       # Static assets (images, fonts)
├── App.tsx                       # Root component
├── main.tsx                      # Entry point
└── index.css                     # Global styles & Tailwind theme
```

---

## 🏗️ Architecture Principles

### 1. Feature-Based Architecture (Screaming Architecture)

Files are organized by **feature/domain** rather than technical type. This approach:

- ✅ Makes the codebase self-documenting (folder names tell you what the app does)
- ✅ Improves scalability (features can be developed independently)
- ✅ Simplifies code ownership (teams own entire features)
- ✅ Enables easy feature extraction (for micro-frontends if needed)

**Example:**
```
❌ Bad (Technical grouping)      ✅ Good (Feature grouping)
src/                            src/features/
├── components/                 ├── dashboard/
├── hooks/                      │   ├── components/
├── stores/                     │   ├── hooks/
├── services/                   │   ├── stores/
└── types/                      │   └── types/
```

### 2. Barrel Exports

Each feature/module has an `index.ts` that exports its public API:

```typescript
// features/dashboard/index.ts
export { DashboardPage } from './pages/DashboardPage';
export { useDashboardStore } from './stores/dashboardStore';
export type { DashboardUser } from './types';
```

**Benefits:**
- Clean imports: `import { DashboardPage } from '@features/dashboard'`
- Encapsulation: Internal implementation details stay hidden
- Refactoring safety: Move files without breaking imports

### 3. Path Aliases

Configured in `vite.config.ts` and `tsconfig.app.json`:

| Alias | Path | Usage |
|-------|------|-------|
| `@/` | `src/` | Generic source access |
| `@features/` | `src/features/` | Feature modules |
| `@shared/` | `src/shared/` | Shared code |
| `@assets/` | `src/assets/` | Static assets |
| `@app/` | `src/app/` | App-level config |

---

## 🎨 Component Patterns

### UI Component Structure

```typescript
// Example: GlassPanel.tsx

// 1. Imports
import { motion } from 'framer-motion';
import { cn } from '@shared/utils';

// 2. Types (exported for reuse)
export interface GlassPanelProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'glow';
  // ...
}

// 3. Constants (style mappings, variants)
const variantStyles: Record<GlassPanelVariant, string> = {
  default: '...',
  elevated: '...',
};

// 4. Sub-components (if needed)
function PanelHeader({ ... }) { ... }

// 5. Main component (with forwardRef if needed)
export function GlassPanel({ children, variant, ...props }: GlassPanelProps) {
  return (
    <motion.div className={cn(variantStyles[variant], props.className)}>
      {children}
    </motion.div>
  );
}

// 6. Display name (for DevTools)
GlassPanel.displayName = 'GlassPanel';

// 7. Default export
export default GlassPanel;
```

### Animation Patterns (Framer Motion)

```typescript
// Reusable animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 🗄️ State Management

### Client State (Zustand)

Used for UI state that doesn't need server synchronization:

```typescript
// stores/dashboardStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DashboardState {
  user: DashboardUser | null;
  isLoading: boolean;
  setUser: (user: DashboardUser) => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        setUser: (user) => set({ user }),
      }),
      { name: 'dashboard-storage' }
    )
  )
);

// Selectors (for optimized re-renders)
export const selectUser = (state: DashboardState) => state.user;
```

### Server State (TanStack Query v5)

Used for API data fetching, caching, and synchronization:

```typescript
// hooks/useQuests.ts (future implementation)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useQuests() {
  return useQuery({
    queryKey: ['quests'],
    queryFn: fetchQuests,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCompleteQuest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: completeQuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
    },
  });
}
```

---

## 🎯 Styling System

### Tailwind CSS v4 Configuration

The theme is defined in `src/index.css` using CSS custom properties:

```css
@theme {
  /* Primary palette - Indigo/Blue */
  --color-primary-500: #6366f1;
  
  /* Accent palette - Purple */
  --color-accent-500: #a855f7;
  
  /* Gold - Achievements */
  --color-gold-500: #f59e0b;
  
  /* XP Green - Progress */
  --color-xp-500: #10b981;
}
```

### Class Name Utility

```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className
)} />
```

### Design Tokens

| Token | Usage |
|-------|-------|
| `primary-*` | Main actions, links, focus states |
| `accent-*` | Secondary highlights, quests |
| `gold-*` | Coins, achievements, rewards |
| `xp-*` | Experience, progress, success |
| `dark-*` | Backgrounds, surfaces, text |

---

## 📱 Responsive Design

### Mobile-First Approach

```typescript
// Always design for mobile first, then add desktop styles
<div className={cn(
  // Mobile (default)
  'flex flex-col gap-4 p-4',
  // Tablet and up
  'md:flex-row md:gap-6 md:p-6',
  // Desktop
  'lg:gap-8 lg:p-8'
)} />
```

### Breakpoints

| Prefix | Min Width | Target |
|--------|-----------|--------|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

### Navigation Pattern

- **Mobile**: Bottom dock navigation (`BottomNavigation.tsx`)
- **Desktop**: Side rail navigation (`SideRailNavigation.tsx`)

---

## 🔧 Development Guidelines

### Adding a New Feature

1. Create the feature folder:
   ```
   src/features/new-feature/
   ├── api/
   ├── components/
   ├── hooks/
   ├── pages/
   ├── stores/
   ├── types/
   └── index.ts
   ```

2. Define types in `types/index.ts`

3. Create the store in `stores/` if needed

4. Build components in `components/`

5. Create pages in `pages/`

6. Add routes in `app/router/index.tsx`

7. Export public API in `index.ts`

### Adding a New UI Component

1. Create in `shared/components/ui/`

2. Follow the component structure pattern

3. Export from `shared/components/ui/index.ts`

4. Document props with JSDoc comments

### TypeScript Best Practices

```typescript
// ✅ Use explicit types for props
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// ✅ Use type for unions/aliases
type QuestStatus = 'active' | 'completed' | 'expired';

// ✅ Use interface for objects (can be extended)
interface User {
  id: string;
  name: string;
}

// ✅ Export types alongside components
export type { ButtonProps, ButtonVariant };
```

---

## 🚀 Running the Project

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Type checking
bun run tsc --noEmit

# Linting
bun run lint

# Build for production
bun run build
```

---

## 📚 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | 19.x | UI library |
| Vite | 7.x | Build tool |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Zustand | 5.x | Client state |
| TanStack Query | 5.x | Server state |
| React Router | 7.x | Routing |
| Lucide React | Latest | Icons |

---

## 🎮 Design System: "Modern Academic RPG"

### Visual Characteristics

- **Glassmorphism**: Semi-transparent panels with blur
- **Glow effects**: Subtle neon accents on hover/active
- **Gradient accents**: Blue → Purple for primary actions
- **Gold highlights**: For achievements and rewards
- **Dark theme**: Deep navy/black backgrounds
- **Grid patterns**: Subtle cyberpunk-style grid overlay

### Animation Philosophy

- **Satisfying**: Micro-interactions that feel rewarding
- **Purposeful**: Animations guide attention
- **Performant**: GPU-accelerated transforms only
- **Consistent**: Reusable spring configurations

---

## 📝 Commit Convention

```
feat: Add new quest completion animation
fix: Correct XP calculation on level up
refactor: Extract progress bar into shared component
docs: Update architecture documentation
style: Format code with prettier
chore: Update dependencies
```

---

*This documentation should be updated as the project evolves.*