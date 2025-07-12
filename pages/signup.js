'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Code, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.username);
      router.push('/');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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

        {/* Sign Up Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Create your account
          </h2>

          {errors.submit && (
            <div className="bg-customPrimary-danger bg-opacity-10 border border-customPrimary-danger border-opacity-30 rounded-lg p-3 mb-6">
              <p className="text-customPrimary-danger text-sm">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-text-primary font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-customPrimary-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent ${
                    errors.username ? 'border-customPrimary-danger' : 'border-gray-600'
                  }`}
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && (
                <p className="text-customPrimary-danger text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-text-primary font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-customPrimary-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent ${
                    errors.email ? 'border-customPrimary-danger' : 'border-gray-600'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-customPrimary-danger text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-text-primary font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-customPrimary-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent ${
                    errors.password ? 'border-customPrimary-danger' : 'border-gray-600'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-customPrimary-danger text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-text-primary font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-customPrimary-bg border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent ${
                    errors.confirmPassword ? 'border-customPrimary-danger' : 'border-gray-600'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-customPrimary-danger text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted">
              Already have an account?{' '}
              <Link href="/login" className="text-customPrimary-accent hover:text-opacity-80 font-medium">
                Log in
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