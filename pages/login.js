'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Code, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-customPrimary-bg flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Code className="h-10 w-10 text-customPrimary-accent" />
            <span className="text-2xl font-bold text-text-primary">StackIt</span>
          </Link>
          <p className="text-text-secondary mt-2">Join the developer community</p>
        </div>

        {/* Login Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Log in to your account
          </h2>
          
          <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4 mb-6">
            <p className="text-blue-400 text-sm">
              <strong>Demo credentials:</strong><br />
              Email: demo@example.com<br />
              Password: password
            </p>
          </div>

          {error && (
            <div className="bg-customPrimary-danger bg-opacity-10 border border-customPrimary-danger border-opacity-30 rounded-lg p-3 mb-6">
              <p className="text-customPrimary-danger text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-customPrimary-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-text-primary font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-customPrimary-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted">
              Don't have an account?{' '}
              <Link href="/signup" className="text-customPrimary-accent hover:text-opacity-80 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-text-muted hover:text-text-primary text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}