import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import OAuthCallback from './pages/auth/OAuthCallback';
import Dashboard from './pages/dashboard/Dashboard';
import Customers from './pages/customers/Customers';
import Products from './pages/products/Products';
import Sales from './pages/sales/Sales';
import EmailAI from './pages/email/EmailAI';
import KnowledgeBase from './pages/knowledge/KnowledgeBase';
import AIChat from './pages/ai-chat/AIChat';
import Analytics from './pages/analytics/Analytics';
import Documents from './pages/documents/Documents';
import Meetings from './pages/meetings/Meetings';
import Tasks from './pages/tasks/Tasks';
import Competitors from './pages/competitors/Competitors';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Standalone auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/oauth-callback" element={<OAuthCallback />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute><AuthLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/emails" element={<EmailAI />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
