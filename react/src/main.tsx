// ============================================
// Application Entry Point
// Gamified University Platform - EvoMate
// ============================================

import { createRoot } from 'react-dom/client';
import App from './App';

// Import global styles (includes Tailwind)
import './index.css';

// ============================================
// Root Element
// ============================================

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Failed to find root element. Make sure there is a <div id="root"></div> in your index.html'
  );
}

// ============================================
// Render Application
// ============================================

const root = createRoot(rootElement);

root.render(<App />);