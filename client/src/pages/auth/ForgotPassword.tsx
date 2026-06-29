import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, Send, Brain } from 'lucide-react';
import { authApi } from '../../api/auth';

const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotForm) => {
    setError('');
    setIsLoading(true);
    try {
      await authApi.forgotPassword(data.email);
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-6">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {sent ? 'Check Your Email' : 'Reset Password'}
          </h2>
          <p className="text-surface-400">
            {sent
              ? "We've sent a reset link to your email address."
              : 'Enter your email and we\'ll send you a reset link.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        {sent ? (
          <div className="card text-center">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-green-500" />
            </div>
            <p className="text-surface-300 text-sm mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Link to="/login" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input type="email" {...register('email')} placeholder="you@company.com" className="input-field pl-10" />
              </div>
              {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-surface-500 hover:text-surface-300 flex items-center justify-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
