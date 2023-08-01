import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContext } from './components/context/authContext';
import { AuthContextProvider } from './components/context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthContextProvider >
     <App />
    </AuthContextProvider>
    
  </React.StrictMode>
);


