// ============================================
// App Providers
// Centralized provider setup for the application
// ============================================

import { type ReactNode, StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ============================================
// TanStack Query Client Configuration
// ============================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: How long data is considered fresh
      staleTime: 1000 * 60 * 5, // 5 minutes
      
      // Cache time: How long inactive data stays in cache
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      
      // Retry configuration
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch behavior
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      
      // Network mode
      networkMode: 'online',
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      
      // Network mode
      networkMode: 'online',
    },
  },
});

// ============================================
// Provider Props Interface
// ============================================

interface AppProvidersProps {
  children: ReactNode;
}

// ============================================
// App Providers Component
// Wraps the application with all necessary providers
// ============================================

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StrictMode>
  );
}

export default AppProviders;