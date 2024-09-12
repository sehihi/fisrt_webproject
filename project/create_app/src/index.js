import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18부터는 'react-dom/client'를 사용
import './index.css';
import App from './App.js';

// createRoot를 사용하여 루트 엘리먼트를 생성하고 렌더링합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);