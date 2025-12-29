// ============================================
// App Router Configuration
// React Router v6 setup with route definitions
// ============================================

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { BottomNavigation, SideRailNavigation } from '@shared/components/layout/BottomNavigation';

// ============================================
// Lazy-loaded Pages
// ============================================

const DashboardPage = lazy(() => 
  import('@features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage }))
);

// Placeholder pages for other routes (to be implemented)
const TimetablePage = lazy(() => 
  Promise.resolve({ 
    default: () => <PlaceholderPage title="Timetable" description="Your class schedule" /> 
  })
);

const QuestsPage = lazy(() => 
  Promise.resolve({ 
    default: () => <PlaceholderPage title="Quest Log" description="View all your quests" /> 
  })
);

const AttendanceScanPage = lazy(() => 
  Promise.resolve({ 
    default: () => <PlaceholderPage title="Check In" description="Scan QR code for attendance" /> 
  })
);

const ProfilePage = lazy(() => 
  Promise.resolve({ 
    default: () => <PlaceholderPage title="Profile" description="Your profile and settings" /> 
  })
);

const ShopPage = lazy(() => 
  Promise.resolve({ 
    default: () => <PlaceholderPage title="Shop" description="Spend your coins on rewards" /> 
  })
);

const InventoryPage = lazy(() => 
  Promise.resolve({ 
    default: () => <PlaceholderPage title="Inventory" description="Your items and badges" /> 
  })
);

const LeaderboardPage = lazy(() => 
  Promise.resolve({ 
    default: () => <PlaceholderPage title="Leaderboard" description="Global rankings" /> 
  })
);

// ============================================
// Loading Spinner Component
// ============================================

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 rounded-full border-2 border-dark-700" />
        {/* Spinning ring */}
        <div 
          className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-primary-500 animate-spin"
        />
        {/* Inner glow */}
        <div className="absolute inset-2 w-8 h-8 rounded-full bg-primary-500/20 blur-sm" />
      </div>
    </div>
  );
}

// ============================================
// Placeholder Page Component
// ============================================

interface PlaceholderPageProps {
  title: string;
  description: string;
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="container-app py-6 pb-24 md:pb-6 md:pl-24">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-2xl bg-dark-800/50 flex items-center justify-center mb-4">
          <span className="text-3xl">🚧</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <p className="text-dark-400 max-w-sm">{description}</p>
        <p className="text-sm text-dark-500 mt-4">Coming soon...</p>
      </div>
    </div>
  );
}

// ============================================
// Root Layout Component
// ============================================

function RootLayout() {
  return (
    <div className="min-h-screen">
      {/* Side Rail Navigation (Desktop) */}
      <SideRailNavigation />
      
      {/* Main Content */}
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      
      {/* Bottom Navigation (Mobile) */}
      <BottomNavigation />
    </div>
  );
}

// ============================================
// Router Configuration
// ============================================

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
        path: 'timetable',
        element: <TimetablePage />,
      },
      {
        path: 'quests',
        element: <QuestsPage />,
      },
      {
        path: 'attendance',
        children: [
          {
            path: 'scan',
            element: <AttendanceScanPage />,
          },
        ],
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'inventory',
        element: <InventoryPage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
      {
        // 404 catch-all
        path: '*',
        element: <PlaceholderPage title="404" description="Page not found" />,
      },
    ],
  },
]);

// ============================================
// Router Provider Component
// ============================================

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;