import React, { useState } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { UserMenu } from './UserMenu';
import { SignInModal } from './auth/SignInModal';
import { SignUpModal } from './auth/SignUpModal';

interface NavbarProps {
  onCartClick: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
  const items = useCartStore(state => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignInClick = () => setShowSignIn(true);
  const handleSignUpClick = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };
  const handleSignInSwitch = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-900 to-indigo-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button className="p-2 rounded-md lg:hidden text-white hover:bg-purple-800/50">
                <Menu className="h-6 w-6" />
              </button>
              <div className="text-xl font-bold text-white ml-2">ShopStyle</div>
            </div>
            
            <div className="hidden lg:flex flex-1 justify-center px-2">
              <div className="max-w-lg w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-purple-700 rounded-md leading-5 bg-purple-800/30 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Search products..."
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <UserMenu onSignInClick={handleSignInClick} />
              <button 
                className="p-2 rounded-md relative text-white hover:bg-purple-800/50"
                onClick={onCartClick}
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={handleSignUpClick}
      />
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={handleSignInSwitch}
      />
    </>
  );
}