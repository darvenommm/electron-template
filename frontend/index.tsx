import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './src/App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Not found root element in index.html');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
