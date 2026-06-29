import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, Brain, Sun, Moon } from 'lucide-react';
import { authApi } from '../../api/auth';
import { useTheme } from '../../contexts/ThemeContext';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(50).optional().or(z.literal('')),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    setIsLoading(true);
    try {
      await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username || undefined,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Registration Successful!</h2>
          <p className="text-surface-400 mb-8">
            We've sent a verification email to your inbox. Please verify your email to continue.
          </p>
          <p className="text-surface-500 text-sm">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Left - Brand side */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-3xl" />
        <div className="relative text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Join Shodhan AI</h1>
          <p className="text-surface-400 text-lg leading-relaxed">
            Transform your business with AI-powered insights, smart automation, and intelligent agents.
          </p>
        </div>
      </div>

      {/* Right - Form side */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <button onClick={toggle} className="absolute top-4 right-4 btn-ghost p-2" title="Toggle theme">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 hidden lg:block">Create Account</h2>
          <p className="text-surface-400 mb-8 hidden lg:block">Start your free trial today.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input type="text" {...register('name')} placeholder="John Doe" className="input-field pl-10" />
              </div>
              {errors.name && <p className="mt-1.5 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input type="email" {...register('email')} placeholder="you@company.com" className="input-field pl-10" />
              </div>
              {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Username (optional)</label>
              <input type="text" {...register('username')} placeholder="johndoe" className="input-field" />
              {errors.username && <p className="mt-1.5 text-sm text-red-400">{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="Min. 8 characters" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-sm text-red-400">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} placeholder="Repeat your password" className="input-field pl-10" />
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-sm text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 mt-6">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
