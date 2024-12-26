import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface UserMenuProps {
  onSignInClick: () => void;
}

export function UserMenu({ onSignInClick }: UserMenuProps) {
  const { user, signOut } = useAuthStore();

  if (!user) {
    return (
      <button
        onClick={onSignInClick}
        className="flex items-center text-white hover:bg-indigo-800 rounded-md px-3 py-2"
      >
        <User className="h-6 w-6" />
        <span className="ml-2 hidden sm:block">Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center text-white hover:bg-indigo-800 rounded-md px-3 py-2">
        <User className="h-6 w-6" />
        <span className="ml-2 hidden sm:block">{user.name}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
        <button
          onClick={signOut}
          className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}