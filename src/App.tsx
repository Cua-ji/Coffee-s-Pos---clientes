import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AuthPage } from './pages/AuthPage';
import { MenuPage } from './pages/MenuPage';

const RootRedirect: React.FC = () => {
  const { currentUser, isGuest } = useAuth();
  if (currentUser || isGuest) {
    return <Navigate to="/menu" replace />;
  }
  return <Navigate to="/iniciar-sesion" replace />;
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/iniciar-sesion" element={<AuthPage />} />
              <Route path="/registro" element={<Navigate to="/iniciar-sesion" replace />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="*" element={<Navigate to="/menu" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
