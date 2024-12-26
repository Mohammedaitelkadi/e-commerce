import React from 'react';
import { Car } from 'lucide-react';
import { LocationDisplay } from './LocationDisplay';
import { UserMenu } from './UserMenu';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

export function Header({ onAuthClick }: HeaderProps) {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-blue-300" />
            <div>
              <h1 className="text-2xl font-bold text-white">E-car</h1>
              <LocationDisplay />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-blue-100 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors">Cars</a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors">About</a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors">Contact</a>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}