
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { initGA } from '@/lib/analytics';

// Initialize Google Analytics with the specific ID
initGA('G-RLK0GRSJEN');

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
