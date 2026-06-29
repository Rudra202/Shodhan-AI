import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, XCircle, Brain } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [error, setError] = useState('');

  useEffect(() => {
    const data = searchParams.get('data');
    if (!data) {
      setError('Invalid OAuth response.');
      return;
    }

    try {
      const decoded = JSON.parse(atob(data));
      const { accessToken, refreshToken, user } = decoded;
      login(user, accessToken, refreshToken);
      navigate('/dashboard', { replace: true });
    } catch {
      setError('Failed to process OAuth login.');
    }
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Authentication Failed</h2>
          <p className="text-surface-400 mb-8">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Completing Sign In...</h2>
        <p className="text-surface-400">Redirecting to your dashboard.</p>
      </div>
    </div>
  );
}
