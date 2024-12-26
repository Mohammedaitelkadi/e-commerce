import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Modal } from '../ui/Modal';
import { FormField } from './AuthForm';
import { validateEmail, validatePassword } from '../../utils/validation';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signIn = useAuthStore(state => state.signIn);

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await signIn(email, password);
      onClose();
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Invalid email or password'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <FormField
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          {errors.submit && (
            <p className="text-sm text-red-600 mt-2">{errors.submit}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignUp}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </Modal>
  );
}