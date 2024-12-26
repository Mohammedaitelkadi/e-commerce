import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Modal } from '../ui/Modal';
import { FormField } from './AuthForm';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

export function SignUpModal({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signUp = useAuthStore(state => state.signUp);

  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const nameError = validateName(name);
    setErrors({ email: emailError, password: passwordError, name: nameError });
    return !emailError && !passwordError && !nameError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await signUp(email, password, name);
      onClose();
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to create account. Please try again.'
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
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
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToSignIn}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </Modal>
  );
}