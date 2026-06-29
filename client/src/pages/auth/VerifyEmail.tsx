import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Brain } from 'lucide-react';
import { authApi } from '../../api/auth';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    const verify = async () => {
      try {
        await authApi.verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully!');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Verification failed.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>

        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Verifying Email...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Email Verified!</h2>
            <p className="text-surface-400 mb-8">{message}</p>
            <Link to="/login" className="btn-primary inline-flex items-center gap-2">
              Sign In
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Verification Failed</h2>
            <p className="text-surface-400 mb-8">{message}</p>
            <Link to="/login" className="btn-primary inline-flex items-center gap-2">
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
