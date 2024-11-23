import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import { RBACProvider } from './context/RBACContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RBACProvider>
      <App />
    </RBACProvider>
  </React.StrictMode>
);
