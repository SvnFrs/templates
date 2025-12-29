// ============================================
// App Root Component
// Entry point for the Gamified University Platform
// ============================================

import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/router';

/**
 * Main App Component
 * Wraps the application with necessary providers and router
 */
export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;