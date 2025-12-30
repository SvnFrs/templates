# 📚 Library Documentation

> Comprehensive guide to all dependencies used in this React codebase, their use cases, and how they integrate with the current architecture.

---

## Table of Contents

1. [Core Framework](#core-framework)
2. [Build Tools](#build-tools)
3. [Styling](#styling)
4. [State Management](#state-management)
5. [Data Fetching](#data-fetching)
6. [Routing](#routing)
7. [Forms & Validation](#forms--validation)
8. [Animation](#animation)
9. [UI Components](#ui-components)
10. [Internationalization](#internationalization)
11. [Real-time Communication](#real-time-communication)
12. [3D Graphics](#3d-graphics)
13. [Maps](#maps)
14. [Charts & Data Visualization](#charts--data-visualization)
15. [Date Utilities](#date-utilities)
16. [HTTP Client](#http-client)
17. [Development Tools](#development-tools)

---

## Core Framework

### React `^19.2.0`

**Purpose:** Core UI library for building component-based user interfaces.

**Use Cases:**

- Building reusable UI components
- Managing component lifecycle and state
- Handling user interactions
- Server components (React 19 feature)
- Use hooks for side effects and state management

**Current Integration:**

```tsx
// react/src/main.tsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**Key Features in React 19:**

- React Compiler support (enabled in this project)
- Improved automatic batching
- `use()` hook for promises and context
- Actions for form handling
- Document metadata support

---

### React DOM `^19.2.0`

**Purpose:** React renderer for web browsers.

**Use Cases:**

- Rendering React components to the DOM
- Handling portal rendering
- Managing focus and events

**Current Integration:**

Used in `main.tsx` for mounting the application root.

---

## Build Tools

### Vite (rolldown-vite) `^7.2.5`

**Purpose:** Next-generation frontend build tool for lightning-fast development.

**Use Cases:**

- Development server with Hot Module Replacement (HMR)
- Production builds with optimized output
- Plugin ecosystem for extending functionality
- Path alias resolution

**Current Integration:**

```typescript
// react/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@features': resolve(__dirname, './src/features'),
      '@shared': resolve(__dirname, './src/shared'),
      '@assets': resolve(__dirname, './src/assets'),
      '@app': resolve(__dirname, './src/app'),
    },
  },
});
```

**Available Scripts:**

```bash
bun run dev      # Start development server
bun run build    # Build for production
bun run preview  # Preview production build
```

---

### @vitejs/plugin-react `^5.1.1`

**Purpose:** Official Vite plugin for React with Fast Refresh support.

**Use Cases:**

- Enable React Fast Refresh during development
- JSX transformation
- React Compiler integration via Babel

**Current Integration:**

Configured in `vite.config.ts` with React Compiler plugin enabled.

---

### babel-plugin-react-compiler `^1.0.0`

**Purpose:** Official React Compiler that automatically optimizes React components.

**Use Cases:**

- Automatic memoization of components
- Eliminating unnecessary re-renders
- Optimizing hooks dependencies
- Performance improvements without manual `useMemo`/`useCallback`

**Current Integration:**

```typescript
// vite.config.ts
react({
  babel: {
    plugins: [['babel-plugin-react-compiler']],
  },
});
```

**Benefits:**

- No need for manual `React.memo()` wrapping
- Automatic optimization of expensive computations
- Cleaner code without manual memoization

---

### vite-plugin-pwa `^1.2.0`

**Purpose:** PWA (Progressive Web App) support for Vite projects.

**Use Cases:**

- Service worker generation
- Offline support
- App manifest configuration
- Cache strategies

**Future Integration Example:**

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'EvoMate',
        short_name: 'EvoMate',
        theme_color: '#6366f1',
        icons: [
          // Icon configurations
        ],
      },
    }),
  ],
});
```

---

## Styling

### Tailwind CSS `^4.1.18`

**Purpose:** Utility-first CSS framework for rapid UI development.

**Use Cases:**

- Rapid prototyping with utility classes
- Consistent design system
- Responsive design with breakpoint prefixes
- Dark mode support
- Custom theme configuration

**Current Integration:**

```css
/* react/src/index.css */
@import 'tailwindcss';

@theme {
  /* Custom color palette */
  --color-primary-500: #6366f1;
  --color-accent-500: #a855f7;
  --color-gold-500: #f59e0b;
  --color-xp-500: #10b981;
  --color-dark-900: #0f172a;

  /* Custom fonts */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-display: 'Orbitron', 'Inter', sans-serif;
}
```

**Usage Examples:**

```tsx
// Responsive classes
<div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 lg:p-8">

// Conditional styling
<button className="bg-primary-500 hover:bg-primary-400 active:bg-primary-600">

// Dark mode (if enabled)
<div className="bg-white dark:bg-dark-900">
```

---

### @tailwindcss/vite `^4.1.18`

**Purpose:** Vite plugin for Tailwind CSS v4.

**Use Cases:**

- Integrates Tailwind CSS build process with Vite
- Lightning-fast CSS processing
- Zero configuration needed

**Current Integration:**

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

---

### clsx `^2.1.1`

**Purpose:** Utility for constructing className strings conditionally.

**Use Cases:**

- Conditional class application
- Merging multiple class sources
- Clean boolean class logic

**Current Integration:**

```typescript
// react/src/shared/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

**Usage Examples:**

```tsx
import { cn } from '@shared/utils';

// Conditional classes
<div
  className={cn(
    'base-styles px-4 py-2 rounded-lg',
    isActive && 'bg-primary-500',
    isDisabled && 'opacity-50 cursor-not-allowed',
    className // Allow overrides from props
  )}
/>;
```

---

### tailwind-merge `^3.4.0`

**Purpose:** Merge Tailwind CSS classes without style conflicts.

**Use Cases:**

- Resolving conflicting utility classes
- Safe class overriding in component APIs
- Preventing duplicate classes

**Current Integration:**

Combined with `clsx` in the `cn()` utility function.

**Why It's Needed:**

```tsx
// Without tailwind-merge:
cn('px-4', 'px-6'); // Output: "px-4 px-6" (conflict!)

// With tailwind-merge:
cn('px-4', 'px-6'); // Output: "px-6" (correct override)
```

---

## State Management

### Zustand `^5.0.9`

**Purpose:** Lightweight state management library with a simple API.

**Use Cases:**

- Global client-side state
- Persistent state (localStorage)
- Devtools integration for debugging
- Slice pattern for large stores

**Current Integration:**

```typescript
// react/src/features/dashboard/stores/dashboardStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DashboardState {
  user: DashboardUser | null;
  isLoading: boolean;
  setUser: (user: DashboardUser) => void;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,
        setUser: (user) => set({ user }),
        fetchDashboardData: async () => {
          set({ isLoading: true });
          // Fetch logic...
          set({ isLoading: false });
        },
      }),
      {
        name: 'dashboard-storage',
        partialize: (state) => ({
          // Only persist specific fields
          showCompletedQuests: state.showCompletedQuests,
        }),
      }
    ),
    { name: 'DashboardStore' }
  )
);
```

**Usage with Selectors (Optimized Re-renders):**

```typescript
// Define selectors
export const selectUser = (state: DashboardState) => state.user;
export const selectIsLoading = (state: DashboardState) => state.isLoading;

// Use in components
function UserProfile() {
  const user = useDashboardStore(selectUser);
  // Only re-renders when user changes
}
```

**Best Practices:**

- Use selectors to prevent unnecessary re-renders
- Keep stores feature-scoped (not one giant store)
- Use `persist` middleware for settings/preferences
- Use `devtools` middleware for debugging

---

## Data Fetching

### @tanstack/react-query `^5.90.14`

**Purpose:** Powerful data synchronization for server state.

**Use Cases:**

- Server state management
- Automatic caching and invalidation
- Background refetching
- Optimistic updates
- Pagination and infinite queries
- Request deduplication

**Current Integration:**

```tsx
// react/src/app/providers/index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

**Usage Examples:**

```typescript
// Basic query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
export function useQuests() {
  return useQuery({
    queryKey: ['quests'],
    queryFn: () => api.get('/quests').then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
}

// Mutations with cache invalidation
export function useCompleteQuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questId: string) => api.post(`/quests/${questId}/complete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
    },
    onError: (error) => {
      toast.error('Failed to complete quest');
    },
  });
}

// Optimistic updates
export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => api.post(`/posts/${postId}/like`),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts', postId] });
      const previousPost = queryClient.getQueryData(['posts', postId]);

      queryClient.setQueryData(['posts', postId], (old) => ({
        ...old,
        likes: old.likes + 1,
      }));

      return { previousPost };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['posts', postId], context.previousPost);
    },
  });
}
```

**When to Use React Query vs Zustand:**

| Scenario               | Use React Query | Use Zustand |
| ---------------------- | --------------- | ----------- |
| API data caching       | ✅              | ❌          |
| Form input state       | ❌              | ✅          |
| Modal open/close state | ❌              | ✅          |
| User session data      | ✅              | ❌          |
| Theme preference       | ❌              | ✅          |
| Paginated lists        | ✅              | ❌          |

---

### Axios `^1.13.2`

**Purpose:** Promise-based HTTP client for the browser.

**Use Cases:**

- API requests (GET, POST, PUT, DELETE)
- Request/response interceptors
- Automatic JSON transformation
- Request cancellation
- File uploads with progress

**Recommended Integration:**

```typescript
// src/shared/api/client.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Usage with React Query:**

```typescript
// src/features/quests/api/questsApi.ts
import { api } from '@shared/api/client';
import type { Quest } from '@shared/types';

export const questsApi = {
  getAll: () => api.get<Quest[]>('/quests').then((res) => res.data),

  getById: (id: string) => api.get<Quest>(`/quests/${id}`).then((res) => res.data),

  complete: (id: string) => api.post(`/quests/${id}/complete`).then((res) => res.data),
};
```

---

## Routing

### React Router DOM `^7.11.0`

**Purpose:** Declarative routing for React applications.

**Use Cases:**

- Client-side navigation
- Nested routes
- Route parameters
- Protected routes
- Lazy loading routes

**Current Integration:**

```tsx
// react/src/app/router/index.tsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load pages
const DashboardPage = lazy(() =>
  import('@features/dashboard/pages/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  }))
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'quests',
        element: <QuestsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
```

**Advanced Patterns:**

```tsx
// Protected route wrapper
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage in router config
{
  path: 'dashboard',
  element: (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
}

// Navigation hook
function NavigationButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/quests')}>
      Go to Quests
    </button>
  );
}
```

---

## Forms & Validation

### React Hook Form `^7.69.0`

**Purpose:** Performant, flexible forms with easy validation.

**Use Cases:**

- Form state management
- Form validation
- Error handling
- Controlled/uncontrolled inputs
- Complex form logic

**Usage Examples:**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    await loginMutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <span className="text-red-400">{errors.email.message}</span>}
      </div>

      <div>
        <input {...register('password')} type="password" placeholder="Password" />
        {errors.password && <span className="text-red-400">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### Zod `^4.2.1`

**Purpose:** TypeScript-first schema validation library.

**Use Cases:**

- Form validation schemas
- API response validation
- Type inference from schemas
- Runtime type checking

**Usage Examples:**

```typescript
import { z } from 'zod';

// Basic schemas
const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().int().positive().optional(),
  role: z.enum(['student', 'admin', 'staff']),
  createdAt: z.string().datetime(),
});

// Infer TypeScript type from schema
type User = z.infer<typeof userSchema>;

// Nested schemas
const questSchema = z.object({
  id: z.string(),
  title: z.string(),
  rewards: z.object({
    xp: z.number().positive(),
    coins: z.number().nonnegative(),
  }),
  progress: z.object({
    current: z.number(),
    target: z.number(),
  }),
});

// Array schemas
const questsArraySchema = z.array(questSchema);

// Validation
function validateApiResponse(data: unknown) {
  const result = questsArraySchema.safeParse(data);

  if (!result.success) {
    console.error('Validation errors:', result.error.issues);
    throw new Error('Invalid API response');
  }

  return result.data; // Fully typed!
}

// Custom validations
const passwordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/, 'Must contain uppercase')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[!@#$%^&*]/, 'Must contain special character');
```

---

## Animation

### Framer Motion `^12.23.26`

**Purpose:** Production-ready motion library for React.

**Use Cases:**

- Component animations
- Page transitions
- Gesture handling
- Layout animations
- Scroll-triggered animations

**Current Integration:**

```tsx
// react/src/shared/components/ui/GlassPanel.tsx
import { motion, type Variants } from 'framer-motion';

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

export function GlassPanel({ children, animationDelay = 0 }) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      custom={animationDelay}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
```

**Common Animation Patterns:**

```tsx
// Staggered list animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

function AnimatedList({ items }) {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Page transitions with AnimatePresence
import { AnimatePresence } from 'framer-motion';

function PageWrapper({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Gesture animations
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>;
```

---

## UI Components

### Lucide React `^0.562.0`

**Purpose:** Beautiful & consistent icon library.

**Use Cases:**

- UI icons throughout the application
- Action buttons
- Navigation items
- Status indicators

**Usage Examples:**

```tsx
import {
  Home,
  User,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Star,
  Heart,
  Loader2,
} from 'lucide-react';

// Basic usage
<Home className="w-5 h-5" />;

// With color
<Star className="w-5 h-5 text-gold-500" />;

// Loading state
<Loader2 className="w-5 h-5 animate-spin" />;

// Inside buttons
<Button leftIcon={<Settings className="w-4 h-4" />}>Settings</Button>;
```

**Icon Sizing Convention:**

| Context   | Size Class    |
| --------- | ------------- |
| Inline    | `w-4 h-4`     |
| Button    | `w-5 h-5`     |
| Card icon | `w-6 h-6`     |
| Hero icon | `w-8 h-8`     |
| Feature   | `w-10 h-10`   |
| Large     | `w-12 h-12 +` |

---

## Internationalization

### i18next `^25.7.3`

**Purpose:** Internationalization framework for JavaScript.

**Use Cases:**

- Multi-language support
- Locale-specific formatting
- Dynamic translations
- Namespace organization

**Recommended Integration:**

```typescript
// src/shared/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: {
        welcome: 'Welcome back, {{name}}!',
        quests: 'Active Quests',
        level: 'Level {{level}}',
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try Again',
      },
    },
  },
  vi: {
    translation: {
      dashboard: {
        welcome: 'Chào mừng trở lại, {{name}}!',
        quests: 'Nhiệm vụ đang hoạt động',
        level: 'Cấp độ {{level}}',
      },
      common: {
        loading: 'Đang tải...',
        error: 'Đã xảy ra lỗi',
        retry: 'Thử lại',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
```

---

### react-i18next `^16.5.0`

**Purpose:** React bindings for i18next.

**Use Cases:**

- React hooks for translations
- Component-based translations
- Language switching

**Usage Examples:**

```tsx
import { useTranslation, Trans } from 'react-i18next';

function Dashboard() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('dashboard.welcome', { name: 'Alex' })}</h1>
      <p>{t('dashboard.level', { level: 42 })}</p>

      {/* Complex translations with components */}
      <Trans i18nKey="description" components={{ bold: <strong /> }}>
        This is <bold>important</bold> text
      </Trans>

      {/* Language switcher */}
      <button onClick={() => i18n.changeLanguage('vi')}>Tiếng Việt</button>
    </div>
  );
}
```

---

## Real-time Communication

### Socket.IO Client `^4.8.3`

**Purpose:** Real-time bidirectional event-based communication.

**Use Cases:**

- Live notifications
- Real-time leaderboard updates
- Chat functionality
- Live attendance tracking
- Multiplayer game features

**Recommended Integration:**

```typescript
// src/shared/socket/client.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function initSocket(token: string) {
  socket = io(import.meta.env.VITE_WS_URL, {
    auth: { token },
    transports: ['websocket'],
    autoConnect: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
```

**React Hook for Socket Events:**

```typescript
// src/shared/hooks/useSocket.ts
import { useEffect } from 'react';
import { getSocket } from '../socket/client';

export function useSocketEvent<T>(event: string, handler: (data: T) => void) {
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [event, handler]);
}

// Usage
function Notifications() {
  const { addNotification } = useNotificationStore();

  useSocketEvent('notification:new', (data: Notification) => {
    addNotification(data);
    playNotificationSound();
  });

  useSocketEvent('quest:completed', (data: QuestCompletion) => {
    showCelebration(data);
  });
}
```

---

## 3D Graphics

### @react-three/fiber `^9.4.2`

**Purpose:** React renderer for Three.js.

**Use Cases:**

- 3D visualizations
- Interactive 3D elements
- Game-like visual effects
- Avatar customization
- Achievement showcases

**Usage Examples:**

```tsx
import { Canvas } from '@react-three/fiber';

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
    </Canvas>
  );
}
```

---

### @react-three/drei `^10.7.7`

**Purpose:** Useful helpers for react-three-fiber.

**Use Cases:**

- Pre-built 3D components
- Camera controls
- Loading states
- Text rendering in 3D
- Environment maps

**Usage Examples:**

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Float, Sparkles } from '@react-three/drei';

function BadgeShowcase({ badge }) {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <Stars radius={100} depth={50} count={2000} />
      <ambientLight intensity={0.5} />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Sparkles count={50} scale={3} size={2} color="#fbbf24" />

      <Text3D font="/fonts/inter.json" size={0.5} position={[0, -2, 0]}>
        {badge.name}
        <meshStandardMaterial color="white" />
      </Text3D>
    </Canvas>
  );
}
```

---

## Maps

### @vis.gl/react-google-maps `^1.7.1`

**Purpose:** React components for Google Maps.

**Use Cases:**

- Campus maps
- Event locations
- Building finder
- Navigation assistance

**Usage Examples:**

```tsx
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';

function CampusMap() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        center={{ lat: 10.762622, lng: 106.660172 }}
        zoom={16}
        style={{ width: '100%', height: '400px' }}
      >
        {buildings.map((building) => (
          <Marker
            key={building.id}
            position={building.position}
            onClick={() => setSelectedBuilding(building)}
          />
        ))}

        {selectedBuilding && (
          <InfoWindow
            position={selectedBuilding.position}
            onCloseClick={() => setSelectedBuilding(null)}
          >
            <div>
              <h3>{selectedBuilding.name}</h3>
              <p>{selectedBuilding.description}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
```

---

## Charts & Data Visualization

### Recharts `^3.6.0`

**Purpose:** Composable charting library built on React components.

**Use Cases:**

- XP progress charts
- Attendance statistics
- Leaderboard visualizations
- Weekly/monthly reports
- Performance analytics

**Usage Examples:**

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

// XP Progress Chart
function XPProgressChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="date" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
          }}
        />
        <Area type="monotone" dataKey="xp" stroke="#10b981" fill="url(#xpGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Quest Completion Pie Chart
function QuestStatsChart({ completed, inProgress, locked }) {
  const data = [
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'In Progress', value: inProgress, color: '#6366f1' },
    { name: 'Locked', value: locked, color: '#64748b' },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

---

## Date Utilities

### date-fns `^4.1.0`

**Purpose:** Modern JavaScript date utility library.

**Use Cases:**

- Date formatting
- Relative time ("2 hours ago")
- Date calculations
- Timezone handling
- Schedule management

**Usage Examples:**

```typescript
import {
  format,
  formatDistanceToNow,
  isToday,
  isTomorrow,
  addDays,
  startOfWeek,
  endOfWeek,
  differenceInMinutes,
  parseISO,
} from 'date-fns';

// Format date for display
format(new Date(), 'MMM d, yyyy'); // "Jan 15, 2025"
format(new Date(), 'EEEE, MMMM do'); // "Wednesday, January 15th"
format(new Date(), 'h:mm a'); // "2:30 PM"

// Relative time
formatDistanceToNow(new Date('2025-01-14'), { addSuffix: true });
// "1 day ago"

// Time until class starts
function getTimeUntilClass(startTime: string) {
  const start = parseISO(startTime);
  const mins = differenceInMinutes(start, new Date());

  if (mins < 0) return 'Started';
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

// Check if date is today/tomorrow
function formatScheduleDate(date: Date) {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEEE');
}

// Get week range
function getWeekRange(date: Date) {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return {
    start: format(start, 'MMM d'),
    end: format(end, 'MMM d'),
  };
}
```

---

## Development Tools

### TypeScript `~5.9.3`

**Purpose:** Static type checking for JavaScript.

**Use Cases:**

- Type safety
- Better IDE support
- Self-documenting code
- Catch errors at compile time

**Configuration Files:**

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - App-specific settings
- `tsconfig.node.json` - Node.js settings (for Vite config)

---

### ESLint `^9.39.1`

**Purpose:** Static code analysis for identifying problematic patterns.

**Configured Plugins:**

- `@eslint/js` - Core ESLint rules
- `typescript-eslint` - TypeScript-specific rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-react-refresh` - Fast Refresh compatibility

**Usage:**

```bash
bun run lint
```

---

## Best Practices Summary

### State Management Decision Tree

```
Is the data from a server?
├── YES → Use React Query
│   ├── Need to cache? → queryKey + staleTime
│   ├── Need real-time? → Socket.IO + invalidate
│   └── Need optimistic UI? → useMutation with onMutate
│
└── NO → Is it global UI state?
    ├── YES → Use Zustand
    │   ├── Persist needed? → persist middleware
    │   └── Debug needed? → devtools middleware
    │
    └── NO → Use React useState/useReducer
```

### Import Organization

```typescript
// 1. React & external libraries
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

// 2. Internal aliases (absolute imports)
import { Button } from '@shared/components/ui';
import { cn } from '@shared/utils';
import { useDashboardStore } from '@features/dashboard/stores';

// 3. Relative imports
import { UserStatsHeader } from '../components/UserStatsHeader';
import type { DashboardUser } from '../types';

// 4. Styles (if any CSS modules)
import styles from './Component.module.css';
```

### Performance Checklist

- [ ] Use React Query for server state (automatic caching)
- [ ] Use Zustand selectors to prevent re-renders
- [ ] Lazy load routes with `React.lazy()`
- [ ] Use `React.memo()` sparingly (React Compiler handles most cases)
- [ ] Virtualize long lists with `@tanstack/react-virtual`
- [ ] Optimize images with proper sizing and formats
- [ ] Use `Suspense` boundaries for loading states

---

_This documentation should be updated as new libraries are added or existing ones are updated._