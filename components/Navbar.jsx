'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, Menu, X, User, Code, LogOut, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-700 transition-all duration-300 ${
      isScrolled 
        ? 'bg-customPrimary-card/80 backdrop-blur-md shadow-lg' 
        : 'bg-customPrimary-card'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Code className="h-8 w-8 text-customPrimary-accent" />
            <span className="text-xl font-bold text-text-primary">StackIt</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-customPrimary-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/ask" className="btn-primary">
              Ask Question
            </Link>
            
            {user ? (
              <>
                <NotificationDropdown />
                <div className="flex items-center space-x-3">
                  <span className="text-text-primary font-medium">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="btn-ghost flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="btn-ghost flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link href="/signup" className="btn-outline">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-4 w-4" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-customPrimary-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-customPrimary-accent focus:border-transparent"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-customPrimary-card/95 backdrop-blur-md border-t border-gray-700">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/ask" 
              className="block w-full text-center btn-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Ask Question
            </Link>
            
            {user ? (
              <>
                <div className="flex items-center justify-center space-x-2 py-2">
                  <User className="h-5 w-5 text-text-secondary" />
                  <span className="text-text-primary font-medium">{user.username}</span>
                </div>
                <Link 
                  href="/notifications" 
                  className="flex items-center justify-center w-full py-2 text-text-secondary hover:text-text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full py-2 text-text-secondary hover:text-text-primary"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="block w-full text-center btn-ghost"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block w-full text-center btn-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;